import {useState} from 'react'; 
import axios from 'axios'; 
import Authentication from '../Authentication.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function Home({endpoint}) {
    const username = 'placeholder'; 
    if (Authentication(endpoint)) {
        return (
            <>
                <h2>Welcome Back to TaskFlow </h2>
                <h2>{username}'s TaskFlows</h2>
            </>
        )
    } else {
        return (
            <>
                <h2>Welcome to TaskFlow!</h2>
                <h2>Please log in to your account or register for a new one</h2>
                <Link to = "/login">
                    <button>Log in</button>
                </Link>
                <Link to = "/register">
                    <button>Register</button>
                </Link>
            </>
        )
    };
};