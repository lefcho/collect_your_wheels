
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import React, { useState, useEffect } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';


function ProtectedRoute({ children }) {
    const [isAuthorised, setisAuthorised] = useState(null);

    useEffect(() => {
        auth().catch(()  => setisAuthorised(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const response = await api.post("api/token/refresh/", {
                refresh: refreshToken
            });

            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN,  response.data.access);
                setisAuthorised(true);
            } else {
                isAuthorised(false);
            }
        } catch(err) {
            console.log(err);
            setisAuthorised(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setisAuthorised(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if  (tokenExpiration < now) {
            await refreshToken();
        } else {
            setisAuthorised(true);
        }
    }

    if (isAuthorised === null) {
        return (
            <div>Loading...</div>
        )
    }

    return isAuthorised ? children : <Navigate to='/login'/>
}

export default ProtectedRoute;
