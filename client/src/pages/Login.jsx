import {useState} from 'react';
import axios from 'axios';

export default function Login ({endpoint}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loggedin, setLoggedin] = useState(false);
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(endpoint, {
                password, 
                email
            });
            setLoggedin(true);
        } catch (err) {
            setError(err); 
            console.log(error);
        };
    };

    if (!loggedin) {
        return (
            <div>
                <h2>Log in to Your Account!</h2>
                <form onSubmit={handleSubmit}>
                    <input type = 'text' placeholder='Email' value = {email} onChange={(e) => {setEmail(e.target.value)}}></input>
                    <input type = 'password' placeholder='Password' value = {password} onChange={(e) => {setPassword(e.target.value)}}></input>
                    <button type = 'submit'>Log In</button>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Logged in successfully!</h2>
                <h2>Welcome back to TaskFlow</h2>
            </div>
        )
    };
}