import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About';
import Vans from './pages/Vans/Vans';
import Home from './pages/Home';
import VanDetails from './pages/Vans/VanDetails';
import Layout from './components/Layout';
import Dashboard from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostLayout from './components/HostLayout';
import HostVans from './pages/Host/HostVans';
import HostVanDetails from './pages/Host/HostVanDetails';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanInfo from './pages/Host/HostVanInfo';
import NotFound from './components/NotFound';

import './server';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/vans" element={<Vans />} />
                    <Route path="/vans/:vanId" element={<VanDetails />} />
                    <Route path="host" element={<HostLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="income" element={<Income />} />
                        <Route path="vans" element={<HostVans />} />
                        <Route path="vans/:vanId" element={<HostVanDetails />}>
                            <Route index element={<HostVanInfo />} />
                            <Route
                                path="pricing"
                                element={<HostVanPricing />}
                            />
                            <Route path="photos" element={<HostVanPhotos />} />
                        </Route>
                        <Route path="reviews" element={<Reviews />} />
                        <Route path="reviews" element={<Reviews />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
