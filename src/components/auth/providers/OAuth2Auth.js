import { AuthProvider } from './AuthProvider';

export class OAuth2Auth extends AuthProvider {
    constructor(providerName, sessionId) {
        super();
        this.providerName = providerName;
        this.sessionId = sessionId;
    }

    shouldInitAuth() {
        return !!this.sessionId;
    }

    isSameUser(currentSessionId) {
        if(currentSessionId) {
            return currentSessionId === this.getSessionId();
        } else {
            return false;
        }
    }

    getSessionId() {
        return this.sessionId;
    }

    getAuthorizationParams() {
        return { 
            grant_type: 'assertion', 
            assertion: this.sessionId, 
            assertion_type: 'oauth2', 
            provider: this.providerName, 
            session_id: this.getSessionId() 
        };
    }
}