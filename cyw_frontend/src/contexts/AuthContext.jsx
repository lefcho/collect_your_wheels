// src/contexts/AuthContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { checkAuth } from '../utils/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
