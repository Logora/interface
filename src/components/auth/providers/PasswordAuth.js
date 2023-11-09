import { AuthProvider } from './AuthProvider';

export class PasswordAuth extends AuthProvider {
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
  }

  isSameUser(currentSessionId) {
    return true;
  }

  getAuthorizationParams() {
    return { 
      grant_type: 'password', 
      username: this.userData.email, 
      password: this.userData.password, 
      provider: this.providerName, 
      session_id: this.getSessionId() 
    };
  }
}