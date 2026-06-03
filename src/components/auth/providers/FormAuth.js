import { utf8ToBase64url } from "@logora/debate/auth/use_auth";
import { AuthProvider } from "./AuthProvider";

export class FormAuth extends AuthProvider {
	constructor(providerName, userData) {
		super();
		this.providerName = providerName;
		this.userData = userData;
	}

	shouldInitAuth() {
		return !!this.userData;
	}

	getSessionId = () => {
		return null;
	};

	isSameUser(currentSessionId) {
		return true;
	}

	getAssertion() {
		if (!this.userData || typeof this.userData !== "object") {
			return null;
		}
		const objJsonStr = JSON.stringify(this.userData);
		return utf8ToBase64url(objJsonStr);
	}

	getAuthorizationParams() {
		return {
			grant_type: "assertion",
			assertion: this.getAssertion(),
			assertion_type: "form",
			provider: this.providerName,
			session_id: this.getSessionId(),
		};
	}
}
