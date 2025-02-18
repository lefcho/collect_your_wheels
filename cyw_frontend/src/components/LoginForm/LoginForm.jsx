
import React, { useState, useContext } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../PasswordInput';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';


function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { setIsAuthenticated } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('api/token/', {
                username: formData.username,
                password: formData.password,
            });

            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            setIsAuthenticated(true);
            navigate('/collected');
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="form-container">
            <h2>Login</h2>
            <p>
                Don't have an account? <span><a href="/register">Register</a></span>
            </p>
            <div className="formData">
                <div className="form-field">
                    <input
                        type="text"
                        name="username"
                        className="form-input"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                </div>

                <PasswordInput 
                    name='password'
                    handleChange={handleChange}
                    formDataField={formData.password}
                    placeholder='Password'
                />

            </div>
            <button 
                className="form-button" 
                type="submit" 
                disabled={loading}
                onClick={handleLogin}
            >
                Log in
            </button>
        </form>
    );
}

export default LoginForm;
