import { dataProvider, getAuthHeader } from './DataProvider';

describe('data provider function', () => {
    const httpClient = {
        get: jest.fn(() =>  Promise.resolve(null)),
        post: jest.fn(() => Promise.resolve(null)),
        patch: jest.fn(() => Promise.resolve(null)),
        delete: jest.fn(() => Promise.resolve(null))
    };

    const setLocalStorage = (id, data) => {
        window.localStorage.setItem(id, JSON.stringify(data));
    };

    beforeEach(() => {
        window.localStorage.clear();
        jest.clearAllMocks();
    });

    it('should call getOne function with correct arguments', () => {
        const apiUrl = "http://example.com"
        const apiKey = "api-key";
        const storageKey = "storage-key";
        const resource = "user";
        const resourceId = "my-id";
        const params = {
            custom_param: 'custom-param'
        };
        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        api.getOne(resource, resourceId, params);

        const expectedParams = {
            custom_param: 'custom-param',
            api_key: apiKey
        }

        const queryString = new URLSearchParams(expectedParams).toString();
		const url = `${apiUrl}/${resource}/${resourceId}?${queryString}`;

        expect(httpClient.get).toHaveBeenCalledWith(url);
        expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should call getOneWithToken function with correct arguments', () => {
        const accessToken = "access-token";
        const storageKey = "storage-key";
        const mockJson = { access_token: accessToken };
        setLocalStorage(storageKey, mockJson);

        const apiUrl = "http://example.com/getWithToken"
        const apiKey = "api-key";
        const resource = "user";
        const resourceId = "my-id";
        const params = {
            custom_param: 'custom-param'
        };

        const config = {
			headers: { "authorization": "Bearer " + accessToken }
		};

        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        api.getOneWithToken(resource, resourceId, params);

        const queryString = new URLSearchParams(params).toString();
		const url = `${apiUrl}/${resource}/${resourceId}?${queryString}`;

        expect(httpClient.get).toHaveBeenCalledWith(url, config);
        expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should call getList function with default params and api key', () => {
        const apiUrl = "http://example.com/list"
        const apiKey = "api-key";
        const storageKey = "storage-key";
        const resource = "user";
        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        api.getList(resource, {page: 1,
            per_page: 10,
            sort: "-created_at",
            api_key: apiKey
        });

        const expectedParams = {
            page: 1,
            per_page: 10,
            sort: "-created_at",
            api_key: apiKey
        }

        const queryString = new URLSearchParams(expectedParams).toString();
		const url = `${apiUrl}/${resource}?${queryString}`;

        expect(httpClient.get).toHaveBeenCalledWith(url);
        expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should call getList function with custom params and api key', () => {
        const apiUrl = "http://example.com/list"
        const apiKey = "api-key";
        const storageKey = "storage-key";
        const resource = "user";
        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        const page = 2;
        const perPage = 20;
        const sort = "-updated_at"
        const query = "my-query";
        const outset = 4;
        const countless = true;

        const params = {
            page: page,
            per_page: perPage,
            sort: sort,
            query: query,
            countless: countless,
            outset: outset,
            myFilter: "ok"
        }

        api.getList(resource, params);

        const expectedParams = {
            page: page,
            per_page: perPage,
            sort: sort,
            query: query,
            countless: countless,
            outset: outset,
            myFilter: "ok",
            api_key: apiKey
        }

        const queryString = new URLSearchParams(expectedParams).toString();
		const url = `${apiUrl}/${resource}?${queryString}`;

        expect(httpClient.get).toHaveBeenCalledWith(url);
        expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should call getListWithToken function with default params', () => {
        const accessToken = "access-token";
        const storageKey = "storage-key";
        const mockJson = { access_token: accessToken };
        setLocalStorage(storageKey, mockJson);
    
        const apiUrl = "http://example.com/listWithToken"
        const apiKey = "api-key";
        const resource = "user";
        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        const config = {
			headers: { "authorization": "Bearer " + accessToken }
		};

        api.getListWithToken(resource, { page: 1, per_page: 10, sort: "-created_at" });

        const expectedParams = {
            page: 1,
            per_page: 10,
            sort: "-created_at"
        }

        const queryString = new URLSearchParams(expectedParams).toString();
		const url = `${apiUrl}/${resource}?${queryString}`;

        expect(httpClient.get).toHaveBeenCalledWith(url, config);
        expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should call getListWithToken function with custom params', () => {
        const accessToken = "access-token";
        const storageKey = "storage-key";
        const mockJson = { access_token: accessToken };
        setLocalStorage(storageKey, mockJson);

        const apiUrl = "http://example.com/list"
        const apiKey = "api-key";
        const resource = "user";
        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        const page = 2;
        const perPage = 20;
        const sort = "-updated_at"
        const query = "my-query";
        const outset = 4;
        const countless = true;

        const params = {
            page: page,
            per_page: perPage,
            sort: sort,
            query: query,
            countless: countless,
            outset: outset,
            myFilter: "ok"
        }

        const config = {
			headers: { "authorization": "Bearer " + accessToken }
		};

        api.getListWithToken(resource, params);

        const expectedParams = {
            page: page,
            per_page: perPage,
            sort: sort,
            query: query,
            countless: countless,
            outset: outset,
            myFilter: "ok"
        }

        const queryString = new URLSearchParams(expectedParams).toString();
		const url = `${apiUrl}/${resource}?${queryString}`;

        expect(httpClient.get).toHaveBeenCalledWith(url, config);
        expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    it('should call getSettings function with correct arguments', () => {
        const apiUrl = "http://example.com"
        const apiKey = "api-key";
        const storageKey = "storage-key";
        const shortname = "shortname";
        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        api.getSettings(shortname);

        const expectedParams = {
            shortname: shortname
        }
        const queryString = new URLSearchParams(expectedParams).toString();
		const url = `${apiUrl}/settings?${queryString}`;

        expect(httpClient.post).toHaveBeenCalledWith(url);
        expect(httpClient.post).toHaveBeenCalledTimes(1);
    });

    it('should call create function with correct arguments', () => {
        const accessToken = "access-token";
        const storageKey = "storage-key";
        const mockJson = { access_token: accessToken };
        setLocalStorage(storageKey, mockJson);

        const apiUrl = "http://example.com/create"
        const apiKey = "api-key";
        const resource = "user";
        const data = {
            custom_data: 'custom-data'
        };
        const config = {
			headers: { "authorization": "Bearer " + accessToken }
		};
        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        api.create(resource, data);

		const url = `${apiUrl}/${resource}`;

        expect(httpClient.post).toHaveBeenCalledWith(url, data, config);
        expect(httpClient.post).toHaveBeenCalledTimes(1);
    });

    it('should call update function with correct arguments', () => {
        const accessToken = "access-token";
        const storageKey = "storage-key";
        const mockJson = { access_token: accessToken };
        setLocalStorage(storageKey, mockJson);
    
        const apiUrl = "http://example.com/update"
        const apiKey = "api-key";
        const resource = "user";
        const resourceId = "my-id";
        const data = {
            custom_data: 'custom-data'
        };
        const config = {
			headers: { "authorization": "Bearer " + accessToken }
		};
        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        api.update(resource, resourceId, data);

		const url = `${apiUrl}/${resource}/${resourceId}`;

        expect(httpClient.patch).toHaveBeenCalledWith(url, data, config);
        expect(httpClient.patch).toHaveBeenCalledTimes(1);
    });

    it('should call delete function with correct arguments', () => {
        const accessToken = "access-token";
        const storageKey = "storage-key";
        const mockJson = { access_token: accessToken };
        setLocalStorage(storageKey, mockJson);

        const apiUrl = "http://example.com/delete"
        const apiKey = "api-key";
        const resource = "user";
        const resourceId = "my-id";
        const config = {
			headers: { "authorization": "Bearer " + accessToken }
		};
        const api = dataProvider(httpClient, apiUrl, apiKey, storageKey);

        api.delete(resource, resourceId);

		const url = `${apiUrl}/${resource}/${resourceId}`;

        expect(httpClient.delete).toHaveBeenCalledWith(url, config);
        expect(httpClient.delete).toHaveBeenCalledTimes(1);
    });
});

describe('getAuthHeader function', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    const setLocalStorage = (id, data) => {
        window.localStorage.setItem(id, JSON.stringify(data));
    };

    it('should return the token if stored', () => {
        const accessToken = "access-token";
        const storageKey = "storage-key";
        const mockJson = { access_token: accessToken };
        setLocalStorage(storageKey, mockJson);
    
        const authHeader = getAuthHeader(storageKey);
        expect(authHeader["authorization"]).toEqual("Bearer " + accessToken);
    });

    it('should return nothing if no access token', () => {
        const storageKey = "my-storage-key";
        const mockJson = {};
        setLocalStorage(storageKey, mockJson);
        
        const authHeader = getAuthHeader(storageKey);
        expect(authHeader).toEqual({});
    });

    it('should return nothing if wrong storage key', () => {
        const accessToken = "access-token";
        const storageKey = "random-key";
        const mockJson = { access_token: accessToken };
        setLocalStorage(storageKey, mockJson);
        
        const authHeader = getAuthHeader("other storage key");
        expect(authHeader).toEqual({});
    });

    it('should return nothing if JSON parse error', () => {
        const storageKey = "random-key";
        const mockJson = "test";
        setLocalStorage(storageKey, mockJson);
        
        const authHeader = getAuthHeader(storageKey);
        expect(authHeader).toEqual({});
    });
});