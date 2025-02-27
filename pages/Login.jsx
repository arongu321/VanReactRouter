import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../api';
import '../api';

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({
        email: '',
        password: '',
    });
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from || '../host';

    function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        loginUser(loginFormData)
            .then((data) => {
                setError(null);
                localStorage.setItem('loggedIn', true);

                // Replace the current entry in the history stack with a new one
                navigate(from, { replace: true });
            })
            .catch((err) => setError(err))
            .finally(() => setStatus('idle'));
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
            {location.state?.message && (
                <h3 className="login-error">{location.state.message}</h3>
            )}
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
