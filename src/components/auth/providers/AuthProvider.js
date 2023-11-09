export class AuthProvider {
    constructor() {
        if(this.constructor == AuthProvider) {
            throw new Error("Object of Abstract Class cannot be created");
        }
    }

    getAuthorizationParams() {
        throw new Error("Abstract Method has no implementation");
    }

    shouldInitAuth() {
        throw new Error("Abstract Method has no implementation");
    }

    isSameUser() {
        throw new Error("Abstract Method has no implementation");
    }

    getSessionId() {
        throw new Error("Abstract Method has no implementation");
    }
}