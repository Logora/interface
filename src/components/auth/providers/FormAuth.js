import { AuthProvider } from './AuthProvider';

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
  }

  isSameUser(currentSessionId) {
    return true;
  }

  getAssertion() {
    let objJsonStr = JSON.stringify(this.userData);
    return btoa(objJsonStr);
  }

  getAuthorizationParams() {
    return { 
      grant_type: 'assertion', 
      assertion: this.getAssertion(), 
      assertion_type: 'form', 
      provider: this.providerName, 
      session_id: this.getSessionId() 
    };
  }
}