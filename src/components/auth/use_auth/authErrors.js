export const EMAIL_UNAVAILABLE_ERROR = "email_unavailable";

export const getAuthErrorCode = (error) =>
	error?.response?.data?.error_description ?? null;

export const isEmailUnavailableError = (error) =>
	getAuthErrorCode(error) === EMAIL_UNAVAILABLE_ERROR;
