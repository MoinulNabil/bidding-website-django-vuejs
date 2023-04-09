import jwt_decode from 'jwt-decode';


export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    let authenticated = token == null ? false : true;
    
    if(token) {
        const payload = jwt_decode(token);
        authenticated = Date.now() > payload.exp * 1000 ? false: true;
    }
  
    if(!authenticated && token) {
      localStorage.removeItem('token');
    }
  
    return authenticated;
  }

export default isAuthenticated;