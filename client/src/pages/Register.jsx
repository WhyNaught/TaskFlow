import {useState, useEffect} from 'react';

function handleSubmit () {

}

// JSX markup for the registration page 
export default function Registration({ endpoint }) {
    const [data, setData] = useState(null);
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const [email, setEmail ] = useState('');

    return (
        <div>
            <h2>Register for TaskFlow</h2>
            <form className='register-form'>
                <input type = 'text' value = {username}></input>
                <input type = 'text' value = {password}></input>
                <input type = 'text' value = {email}></input>
                <button type = "submit">Register Now!</button>
            </form>
        </div>
    );
}