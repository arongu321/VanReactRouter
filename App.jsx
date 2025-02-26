import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About';
import Vans from './pages/Vans';
import Home from './pages/Home';
import VanDetails from './pages/VanDetails';
import './server';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/vans" element={<Vans />} />
                <Route path="/vans/:vanId" element={<VanDetails />} />
            </Routes>
        </BrowserRouter>
    );
}
