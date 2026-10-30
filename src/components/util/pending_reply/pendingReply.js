const STORAGE_KEY = "Logora:pendingReply";
export const PENDING_REPLY_MAX_AGE = 30 * 60 * 1000;

export const storePendingReply = ({ groupId, parentId, ancestorIds = [] }) => {
	try {
		sessionStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				groupId,
				parentId,
				ancestorIds,
				createdAt: Date.now(),
			}),
		);
	} catch (e) {}
};

export const clearPendingReply = () => {
	try {
		sessionStorage.removeItem(STORAGE_KEY);
	} catch (e) {}
};

export const readPendingReply = () => {
	try {
		const pending = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
		if (!pending || typeof pending !== "object" || !pending.parentId) {
			return null;
		}
		if (Date.now() - (pending.createdAt || 0) > PENDING_REPLY_MAX_AGE) {
			clearPendingReply();
			return null;
		}
		return pending;
	} catch (e) {
		return null;
	}
};
