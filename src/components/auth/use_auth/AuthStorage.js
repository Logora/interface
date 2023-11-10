export function makeStorage(tokenKey) {
    const storageBackend = (typeof window !== 'undefined') && (window.localStorage || window.sessionStorage || null);

    const getToken = () => {
        try {
            return JSON.parse(storageBackend.getItem(tokenKey));
        } catch(e) {
            return false;
        }
    }

    const setToken = (token) => {
        try {
            storageBackend.setItem(tokenKey, JSON.stringify(token));
        } catch(e) {
            return false;
        }
    }

    const removeToken = () => {
        try {
            storageBackend.removeItem(tokenKey);
        } catch(e) {
            return false;
        }
    }

    return {
        getToken,
        setToken,
        removeToken
    }
}