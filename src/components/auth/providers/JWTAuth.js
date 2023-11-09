import { AuthProvider } from './AuthProvider';

export class JWTAuth extends AuthProvider {
    constructor(providerName, jwtToken) {
        super();
        this.providerName = providerName;
        this.jwtToken = jwtToken;
    }
    
    shouldInitAuth() {
        return !!this.jwtToken;
    }

    isSameUser(currentSessionId) {
        return currentSessionId === this.getSessionId();
    }

    getSessionId() {
        if(!this.jwtToken) {
            return null;
        } else {
            return this.jwtToken.split('.')[2];
        }
    }
    
    getAuthorizationParams() {
        return { 
            grant_type: 'assertion', 
            assertion: this.jwtToken, 
            assertion_type: 'jwt', 
            provider: this.providerName, 
            session_id: this.getSessionId() 
        };
    }
}