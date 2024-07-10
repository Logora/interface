import { Location } from './Location';

describe('Location', () => {
    it('should instantiate object and return path', () => {
        const path = "mypath";
        const location = new Location(path, {}, {});
        expect(location.path).toEqual(path);
        expect(location.toUrl()).toEqual(path);
    });

    it('should compile path params and return correct URL', () => {
        const path = "mypath/:p1";
        const location = new Location(path, { p1: "" }, { });
        expect(location.path).toEqual(path);
        expect(location.toUrl({ p1: "test" })).toEqual('mypath/test');
    });

    it('should compile path and query params and return correct URL', () => {
        const path = "mypath/:p1";
        const location = new Location(path, { p1: "" }, { q1: "" });
        expect(location.path).toEqual(path);
        expect(location.toUrl({ p1: "test", q1: "query" })).toEqual('mypath/test?q1=query');
    });
});