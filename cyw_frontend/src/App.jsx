
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
import { AuthProvider } from './contexts/AuthContext.jsx'
import CarSeries from './pages/CarSeries/CarSeries.jsx';


function RegisterAndLogout() {
    localStorage.clear();
    return <Register />
}

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<RegisterAndLogout />} />
                        <Route path='/results' element={<Search />} />
                        <Route path='/series' element={<CarSeries />}/>
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
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;
