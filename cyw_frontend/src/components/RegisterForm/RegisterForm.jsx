
import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../PasswordInput';


function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatedPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.repeatedPassword) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            await api.post('api/user/register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            navigate('/login');
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    const devRegister = (e) => {
        e.preventDefault();

        if (formData.password !== formData.repeatedPassword) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }

        console.log(formData);
    }

    return (
        <form onSubmit={devRegister} className="form-container">
            <h2>Register</h2>
            <p>
                Already have an account? <span><a href="/login">Log in</a></span>
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
                <div className="form-field">
                    <input
                        type="text"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>
                <PasswordInput 
                    name='password'
                    handleChange={handleChange}
                    formDataField={formData.password}
                    placeholder='Password'
                />
                <PasswordInput 
                    name='repeatedPassword'
                    handleChange={handleChange}
                    formDataField={formData.repeatedPassword}
                    placeholder='Repeat Password'
                />
            </div>
            <button className="form-button" type="submit" disabled={loading}>
                Create Account
            </button>
        </form>
    );
}

export default RegisterForm;
