import { compile } from 'path-to-regexp';

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

export class Location {
    constructor(path, paramDefs, queryStringParamDefs) {
        this._path = path;
        this._paramDefs = paramDefs;
        this._queryStringParamDefs = queryStringParamDefs;
    }

    get path() {
        return this._path;
    }

    get paramDefs() {
        return this._paramDefs;
    }

    toUrl(params) {
        const path = this.generatePath(this.path, Object.assign(this.paramDefs || {}, params));
        const queryString = this.generateQueryString(this._queryStringParamDefs, params);

        return queryString
            ? `${path}?${queryString}`
            : path;
    }

    compilePath(path) {
        if (cache[path]) return cache[path];

        const generator = compile(path);

        if (cacheCount < cacheLimit) {
            cache[path] = generator;
            cacheCount++;
        }

        return generator;
    }

    generatePath(path = "/", params = {}) {
        return path === "/"
            ? path
            : this.compilePath(path)(params, { pretty: true });
    }

    generateQueryString(paramDefs, params = {}) {
        if (!paramDefs || this.isEmptyObject(paramDefs)) {
            return null;
        }
        if (this.isEmptyObject(params)) {
            return null;
        }

        const queryStringParams = Object
            .keys(params)
            .filter(key => Object.keys(paramDefs).indexOf(key) > -1)
            .reduce((acc, key) => {
                const value = params[key] === 'undefined' ? undefined
                    : params[key] === 'null' ? null
                        : params[key];
                const paramDef = paramDefs[key];
                return paramDef === value
                    ? acc //avoid query string clutter: don't serialize values that are the same as the default
                    : {
                        [key]: params[key],
                        ...acc
                    }
            }, {});

        // If no params to serialize, return null
        if (!queryStringParams || Object.keys(queryStringParams).length === 0) {
            return null;
        }
        return new URLSearchParams(queryStringParams).toString();
    }

    isEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
}