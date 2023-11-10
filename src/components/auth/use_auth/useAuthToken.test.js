import { useAuthToken } from "./useAuthToken";
import { makeStorage } from './AuthStorage';

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

const httpClient = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn()
};

beforeEach(() => {
    httpClient.get.mockClear();
    httpClient.post.mockClear();
    httpClient.patch.mockClear();
});

describe('useAuthToken', () => {
    describe('getToken', () => {
        beforeEach(() => {
            delete window.localStorage;
        });

        it('should get null if no token set', () => {
            Object.defineProperty(window, 'localStorage', {
                configurable: true,
                value: localStorageMock
            })

            const tokenKey = "token-key";
            const { getToken } = useAuthToken(httpClient, 'https://example.com/auth', tokenKey);
    
            expect(getToken()).toBeNull();
        });

        it('should get correct token', () => {
            Object.defineProperty(window, 'localStorage', {
                configurable: true,
                value: localStorageMock
            })

            const tokenKey = "token-key";
            const { setToken } = makeStorage(tokenKey);
            const { getToken } = useAuthToken(httpClient, 'https://example.com/auth', tokenKey);
    
            const token = { access_token: "a-super-token"};
            setToken(token);
            expect(getToken()).toStrictEqual(token);
        });
    });

    describe('removeToken', () => {
        beforeEach(() => {
            delete window.localStorage;
        });

        it('should remove token', () => {
            Object.defineProperty(window, 'localStorage', {
                configurable: true,
                value: localStorageMock
            })

            const tokenKey = "token-key";
            const { setToken } = makeStorage(tokenKey);
            const { getToken, removeToken } = useAuthToken(httpClient, 'https://example.com/auth', tokenKey);
    
            const token = { access_token: "great-token"};
            setToken(token);
            expect(getToken()).toStrictEqual(token);

            removeToken();
            expect(getToken()).toBeNull();
        });
    });

    /*
    describe('fetchToken', () => {
        beforeEach(() => {
            delete window.localStorage;
        });

        it('should fetch token and store it', () => {
            httpClient.post.mockResolvedValue({ status: 200, data: {
                    success: true,
                    data: { access_token: "random-token", expires_at: 123456789 }
                }
            });

            const authParams = { session_id: "session_id" }
            const tokenKey = "token-key";
            const { fetchToken, getToken } = useAuthToken(httpClient, 'https://example.com/auth', tokenKey);

            fetchToken(authParams).then(response => {
                console.log(response);
            });
        })
    });
    */
})