import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({
        email: '',
        password: '',
    });

    const location = useLocation();

    function handleSubmit(e) {
        e.preventDefault();
        console.log(loginFormData);
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
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}
