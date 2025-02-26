
import React, { useState, useContext } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../PasswordInput/PasswordInput';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './LoginForm.module.scss';


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
        <form className={styles.form}>
            <h2 className={styles['form-title']}>Login</h2>
            <p>
                Don't have an account? <span><a href="/register">Register</a></span>
            </p>
            <div className={styles["form-data"]}>
                <div className={styles["form-field"]}>
                    <i className="fa-solid fa-user"></i>
                    <input
                        type="text"
                        name="username"
                        className={styles["form-input"]}
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                </div>

                <PasswordInput
                    name='password'
                    className={styles["pass-input"]}
                    handleChange={handleChange}
                    formDataField={formData.password}
                    placeholder='Password'
                />

            </div>
            <button
                className={styles["form-button"]}
                type="submit"
                disabled={loading}
                onClick={handleLogin}
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;
