import { makeStorage } from "./AuthStorage";

const localStorageMock = (function() {
    let store = {}
  
    return {
        name: "localStorage",
        getItem: function(key) {
            return store[key] || null
        },
        setItem: function(key, value) {
            store[key] = value.toString()
        },
        removeItem: function(key) {
            delete store[key]
        },
        clear: function() {
            store = {}
        }
    }
})()

const sessionStorageMock = (function() {
    let store = {}
  
    return {
        name: "sessionStorage",
        getItem: function(key) {
            return store[key] || null
        },
        setItem: function(key, value) {
            store[key] = value.toString()
        },
        removeItem: function(key) {
            delete store[key]
        },
        clear: function() {
            store = {}
        }
    }
})()

describe('AuthStorage', () => {
    describe('when window is undefined', () => {
        const { window } = global;

        beforeAll(() => {
            delete global.window;
        });

        afterAll(() => {
            global.window = window;
        });
        
        it('should run without error', () => {
            expect(typeof global.window).toBe('undefined');

            const storage = makeStorage('token-key');
            expect(storage).toBeTruthy();
        });
    });

    describe('setToken', () => {
        beforeEach(() => {
            delete window.localStorage;
            delete window.sessionStorage;
        });

        it('should store token in localStorage', () => {
            Object.defineProperty(window, 'localStorage', {
                configurable: true,
                value: localStorageMock
            })

            const tokenKey = "token-key";
            const { setToken } = makeStorage(tokenKey);
    
            const token = { access_token: "my-token"};
            setToken(token);
            expect(localStorage.getItem(tokenKey)).toBe(JSON.stringify(token));
        });

        it('should store token in sessionStorage', () => {
            Object.defineProperty(window, 'sessionStorage', {
                configurable: true,
                value: sessionStorageMock
            })

            const tokenKey = "token-key";
            const { setToken } = makeStorage(tokenKey);
    
            const token = { access_token: "another-token"};
            setToken(token);
            expect(sessionStorage.getItem(tokenKey)).toBe(JSON.stringify(token));
        });

        it('should store nothing if no storage defined', () => {
            const tokenKey = "token-key";
            const { getToken, setToken } = makeStorage(tokenKey);
    
            const token = { access_token: "random-token"};
            setToken(token);
            expect(getToken()).toBe(false);
        });
    });

    describe('getToken', () => {
        beforeEach(() => {
            delete window.localStorage;
            delete window.sessionStorage;
        });

        it('should get correct token', () => {
            Object.defineProperty(window, 'localStorage', {
                configurable: true,
                value: localStorageMock
            })

            const tokenKey = "token-key";
            const { getToken, setToken, removeToken } = makeStorage(tokenKey);
    
            const token = { access_token: "a-super-token"};
            setToken(token);
            expect(getToken()).toStrictEqual(token);

            removeToken();
        });

        it('should get null if no token set', () => {
            Object.defineProperty(window, 'localStorage', {
                configurable: true,
                value: localStorageMock
            })

            const tokenKey = "token-key";
            const { getToken } = makeStorage(tokenKey);
    
            expect(getToken()).toBeNull();
        });
    });

    describe('removeToken', () => {
        beforeEach(() => {
            delete window.localStorage;
            delete window.sessionStorage;
        });

        it('should remove token', () => {
            Object.defineProperty(window, 'localStorage', {
                configurable: true,
                value: localStorageMock
            })

            const tokenKey = "token-key";
            const { getToken, setToken, removeToken } = makeStorage(tokenKey);
    
            const token = { access_token: "great-token"};
            setToken(token);
            expect(getToken()).toStrictEqual(token);

            removeToken();
            expect(getToken()).toBeNull();
        });
    });
})