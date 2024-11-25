import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Nav from '../pages/Nav';

export default function Home({userData}) {
    if (userData) {
        return (
            <>
                <h2>Welcome Back to TaskFlow {userData.username}!</h2>
                <Nav id = {userData.username}/>
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