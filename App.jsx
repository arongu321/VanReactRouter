import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About';
import Vans from './pages/Vans/Vans';
import Home from './pages/Home';
import VanDetails from './pages/Vans/VanDetails';
import Layout from './components/Layout';
import './server';

import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/vans" element={<Vans />} />
                    <Route path="/vans/:vanId" element={<VanDetails />} />
                    <Route path="/host" element={<Dashboard />} />
                    <Route path="/host/income" element={<Income />} />
                    <Route path="/host/reviews" element={<Reviews />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
