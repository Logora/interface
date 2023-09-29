export function getAuthHeader(storageKey) {
	try {
		const token = JSON.parse(localStorage.getItem(storageKey));
		if (token && token.access_token) {
			return { Authorization: 'Bearer ' + token.access_token };
		} else {
			return {};
		}
	} catch {
		return {};
	}
}

export const dataProvider = (
    httpClient,
    apiUrl,
	apiKey = "",
	storageKey = ""
) => ({
    getOne: (resource, id, params) => {
		params.api_key = apiKey;
        const queryString = new URLSearchParams(params).toString();
        const url = `${apiUrl}/${resource}/${id}?${queryString}`;
		return new Promise((resolve, reject) => {
			httpClient.get(url)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject(err);
				});
		});
    },

    getOneWithToken: (resource, id, params) => {
        const queryString = new URLSearchParams(params).toString();
        const url = `${apiUrl}/${resource}/${id}?${queryString}`;
		const config = {
			headers: getAuthHeader(storageKey),
		};
		return new Promise((resolve, reject) => {
			httpClient.get(url, config)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject(err);
				});
		});
    },

	getList: (resource, params) => {
		let data = {
			...params,
			api_key: apiKey
		};

		const queryString = new URLSearchParams(data).toString();
		const url = `${apiUrl}/${resource}?${queryString}`;
		return new Promise((resolve, reject) => {
			httpClient.get(url)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject(err);
				});
		});
    },

	getListWithToken: (resource, params) => {
		const config = {
			headers: getAuthHeader(storageKey),
		};

		const queryString = new URLSearchParams(params).toString();
		const url = `${apiUrl}/${resource}?${queryString}`;
		return new Promise((resolve, reject) => {
			httpClient.get(url, config)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},

    update: (resource, id, data) => {
        const url = `${apiUrl}/${resource}/${id}`;
        const config = {
			headers: getAuthHeader(storageKey),
		};
        return new Promise((resolve, reject) => {
			httpClient.patch(url, data, config)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject(err);
				});
		});
    },

    create: (resource, data) => {
        const url = `${apiUrl}/${resource}`;
        const config = {
			headers: getAuthHeader(storageKey),
		};
        return new Promise((resolve, reject) => {
			httpClient.post(url, data, config)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject(err);
				});
		});
    },

    delete: (resource, id) => {
        const url = `${apiUrl}/${resource}/${id}`;
        const config = {
			headers: getAuthHeader(storageKey),
		};
        return new Promise((resolve, reject) => {
			httpClient.delete(url, config)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject(err);
				});
		});
    },

    getSettings: (shortname) => {
        const params = {
            shortname: shortname
        };
        const queryString = new URLSearchParams(params).toString();
        const url = `${apiUrl}/settings?${queryString}`;
        return new Promise((resolve, reject) => {
			httpClient
				.post(url)
				.then((response) => {
					resolve(response);
				})
				.catch((err) => {
					reject(err);
				});
		});
    },
});
