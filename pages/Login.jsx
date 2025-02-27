import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../api';

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({
        email: '',
        password: '',
    });

    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    const location = useLocation();

    function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        loginUser(loginFormData)
            .then((data) => {
                console.log(data);
                setError(null);
            })
            .catch((err) => setError(err))
            .finally(setStatus('idle'));
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    return (
        <div className="login-container">
            {location.state?.message && <h3>{location.state.message}</h3>}
            <h1>Sign in to your account</h1>
            {error?.message && <h3 className="login-error">{error.message}</h3>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button disabled={status === 'submitting'} type="submit">
                    {status === 'submitting' ? 'Logging in...' : 'Log in'}
                </button>
            </form>
        </div>
    );
}
