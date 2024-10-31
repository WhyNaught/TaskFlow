import React from 'react';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home'; 
import {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// will make dedicated file for this later 
function About() {
    return <h2>About Page</h2>;
}

// renders the navbar and all the browser routes
function App() {
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
      axios.get('http://localhost:3000/api/user', {withCredentials: true})
        .then(response => {
          if (response.status === 200) {
            setAuthenticated(true);
          }
        }).catch(error => {setAuthenticated(false);});
    }, []);
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/about">About</Link> | <Link to="/login">Login</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home endpoint = "http://localhost:3000/api/user"/>} />
                <Route path="/register" element={<Register endpoint="http://localhost:3000/api/register" />} />
                <Route path="/about" element={<About />} />
                <Route path='/login' element = {<Login endpoint="http://localhost:3000/api/login"/>}/>
            </Routes>
        </Router>
    );
}

// exports our app to our main.jsx file
export default App;