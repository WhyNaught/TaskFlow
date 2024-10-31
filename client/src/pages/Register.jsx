import {useState} from 'react';
import axios from 'axios';

// JSX markup for the registration page 
export default function Registration({ endpoint }) {
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [email, setEmail ] = useState('');
    const [error, setError] = useState(null);
    const [registered, setRegistered] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(endpoint, {
                username,
                password,
                email
            }, {withCredentials: true}); 
            setRegistered(true); 
        } catch (err) {
            setError(err.message);
            console.log(error); 
        }
    };

    if (registered) {
        return (
            <div>
                <h2>Registered Successfully!</h2>
                <h2>Welcome to TaskFlow {username}!</h2>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Register for TaskFlow</h2>
                <form className='register-form' onSubmit={handleSubmit}>
                    <input type = 'text' placeholder='Username' value = {username} onChange={(e) => {setUsername(e.target.value)}}></input>
                    <input type = 'password' placeholder='Password' value = {password} onChange={(e) => {setPassword(e.target.value)}}></input>
                    <input type = 'text' placeholder='Email' value = {email} onChange={(e) => {setEmail(e.target.value)}}></input>
                    <button type = "submit">Register Now!</button>
                </form>
    
            </div>
        );
    }
};