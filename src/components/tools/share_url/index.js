export const DEFAULT_SHARE_DOMAIN = "app.logora.fr";

const hostFrom = (value) => {
	if (typeof value !== "string" || value.trim() === "") {
		return null;
	}
	const trimmed = value.trim();

	try {
		const { host } = new URL(
			/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`,
		);
		return host || null;
	} catch {
		return null;
	}
};

export const shareDomain = (config) =>
	hostFrom(config?.provider?.shareDomain) ?? DEFAULT_SHARE_DOMAIN;

export const buildShareUrl = (config, resource, id) =>
	`https://${shareDomain(config)}/share/${resource}/${id}`;
