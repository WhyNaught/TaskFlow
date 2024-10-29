import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Register from '../src/pages/Register';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
    return <h2>Home Page</h2>;
}

function About() {
    return <h2>About Page</h2>;
}

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register endpoint="http://localhost:3000/register" />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;