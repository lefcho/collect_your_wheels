
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}
