import {Navigate} from 'react-router-dom'; 
import {useState, useEffect} from 'react'; 
import axios from 'axios'; 

export default function Create({endpoint, username, authenticated}) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState(''); 
    const [created, setCreated] = useState(false); 
    const [error, setError] = useState(null); 

    async function handleSubmit (e) {
        e.preventDefault();
        try {
            await axios.post(endpoint, {
                name: name,
                description: desc, 
                username: username 
            });
            setCreated(true); 
        } catch (err) {
            setError(err.message); 
            console.log(err); 
        }; 
    };

    if (!authenticated) {
        <Navigate to="/"/>
    }
    if (!created) {
        return (
            <div>
                <form onSubmit = {handleSubmit}>
                    <input type = 'text' required value = {name} placeholder='Task Name' onChange = {(e) => setName(e.target.value)}></input>
                    <input type = 'text' value = {desc} placeholder='Task Description' onChange = {(e) => setDesc(e.target.value)}></input>
                    <button type = 'submit' >Create new task!</button>
                </form>
            </div>
        );
    } else {
        return (
            <Navigate to = {`/${username}/taskflows`} />
        );
    };
};