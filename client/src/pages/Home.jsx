import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function Home({username, email, authenticated}) {
    
    if (authenticated) {
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