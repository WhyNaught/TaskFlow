import React, { useEffect, useState } from 'react';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
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
                | <Link to="/login">Login</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register endpoint="http://localhost:3000/api/register" />} />
                <Route path="/about" element={<About />} />
                <Route path='/login' element = {<Login endpoint="http://localhost:3000/api/login"/>}/>
            </Routes>
        </Router>
    );
}

export default App;