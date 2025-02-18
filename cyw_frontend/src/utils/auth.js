
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from '../constants.js';
import { REFRESH_TOKEN } from '../constants.js';

export function checkAuth() {  
    const token = localStorage.getItem(ACCESS_TOKEN);
    
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
}
