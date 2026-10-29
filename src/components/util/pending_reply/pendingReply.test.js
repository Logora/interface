import {
	PENDING_REPLY_MAX_AGE,
	clearPendingReply,
	readPendingReply,
	storePendingReply,
} from "./pendingReply";

describe("pendingReply", () => {
	beforeEach(() => {
		sessionStorage.clear();
	});

	it("should read back a stored intent", () => {
		storePendingReply({ groupId: 12, parentId: 34, ancestorIds: [34] });

		expect(readPendingReply()).toMatchObject({
			groupId: 12,
			parentId: 34,
			ancestorIds: [34],
		});
	});

	it("should ignore an expired intent", () => {
		storePendingReply({ groupId: 12, parentId: 34 });
		const stored = JSON.parse(sessionStorage.getItem("Logora:pendingReply"));
		sessionStorage.setItem(
			"Logora:pendingReply",
			JSON.stringify({ ...stored, createdAt: Date.now() - PENDING_REPLY_MAX_AGE - 1 }),
		);

		expect(readPendingReply()).toBeNull();
		expect(sessionStorage.getItem("Logora:pendingReply")).toBeNull();
	});

	it("should return null without stored intent", () => {
		expect(readPendingReply()).toBeNull();
		storePendingReply({ groupId: 12, parentId: 34 });
		clearPendingReply();
		expect(readPendingReply()).toBeNull();
	});
});
