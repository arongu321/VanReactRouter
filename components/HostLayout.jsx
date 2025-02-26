import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function HostLayout() {
    const activeStyle = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616',
    };

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    // The end prop is used to match the end of the URL
                    // This is useful when you want to match the exact URL
                    // and not any sub-routes.
                    // For example, if the URL is /host/income, the
                    // /host link would not be active unless you use the end prop.
                    // This is because the /host/income URL is a sub-route of /host.
                    // The end prop makes sure that the URL is an exact match.
                    // If you remove the end prop, the /host link would be active
                    // when the URL is /host/income.
                    end
                    to="."
                >
                    Dashboard
                </NavLink>
                {/* The to attributes in NavLink use URLs relative to the parent URL making these Relative Links*/}
                <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    to="income"
                >
                    Income
                </NavLink>
                <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    to="vans"
                >
                    Vans
                </NavLink>
                <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    to="reviews"
                >
                    Reviews
                </NavLink>
            </nav>
            <Outlet />
        </>
    );
}
