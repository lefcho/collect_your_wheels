
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import CollectedCars from './pages/CollectedCars/CollectedCars';
import WishlistedCars from './pages/WishlistedCars/WishlistedCars';
import Search from './pages/Search/Search';
import Layout from './components/Layout';


function Logout() {
    localStorage.clear();
    return <Navigate to='/' />
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />
}

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/register' element={<RegisterAndLogout />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/collected' element={
                        <ProtectedRoute>
                            <CollectedCars />
                        </ProtectedRoute>
                    } />
                    <Route path='/wishlisted' element={
                        <ProtectedRoute>
                            <WishlistedCars />
                        </ProtectedRoute>
                    } />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
