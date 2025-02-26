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
import HostLayout from './components/HostLayout';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    {/* No nesting for vans because there's no shared UI that these routes use */}
                    <Route path="/vans" element={<Vans />} />
                    <Route path="/vans/:vanId" element={<VanDetails />} />
                    <Route path="host" element={<HostLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="income" element={<Income />} />
                        <Route path="reviews" element={<Reviews />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
