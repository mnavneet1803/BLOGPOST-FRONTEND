export function setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }
  
  export function getAuthToken() {
    return localStorage.getItem('token');
  }
  
  export function removeAuthToken() {
    localStorage.removeItem('token');
  }
