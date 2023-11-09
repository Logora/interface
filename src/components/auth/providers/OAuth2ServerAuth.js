import { AuthProvider } from './AuthProvider';

export class OAuth2ServerAuth extends AuthProvider {
  constructor(providerName, assertion, socialProviderName) {
    super();
    this.providerName = providerName;
    this.assertion = assertion || this.getAuthorizationCode();
    this.socialProviderName = socialProviderName;
  }

  shouldInitAuth() {
    return !!this.assertion;
  }

  getSocialProvider = () => {
    return this.socialProviderName;
  }

  isSameUser(currentSessionId) {
    return true;
  }

  getSessionId() {
    return null;
  }

  getAuthorizationCode() {
    if(typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if(code) {
        return code;
      }
    }
    return false;
  }

  getAuthorizationParams() {
    return { 
      grant_type: 'assertion', 
      assertion: this.assertion, 
      assertion_type: this.getSocialProvider(), 
      provider: this.providerName, 
      session_id: this.getSessionId() 
    };
  }
}