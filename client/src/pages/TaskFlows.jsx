import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react'; 
import axios from 'axios'; 

function Navlink({endpoint, label}) {
    return (
        <li>
            <Link to = {endpoint}>
                <button>{label}</button>
            </Link>
        </li>
    );
};

export default function TaskFlows ({userData}) { 
    const [taskflows, setTaskFlows] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [username, setUsername] = useState(userData.username); 
    useEffect(() => {
        const fetchFlows = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/taskflows', 
                    { 
                        withCredentials: true, 
                        params: {
                            username: userData.username, 
                            email: userData.email
                        } 
                    }
                ); 
                setTaskFlows(response.data.taskflows); 
                setUsername(userData.username); 
            } catch (err) {
                console.error('Something went wrong', err); 
            } finally {
                setLoading(false); 
            }; 
        }; 
        fetchFlows(); 
    }, []);

    if (loading) {
        return (
            <h2>Loading...</h2>
        ); 
    } else if (taskflows.length === 0) {
        return (
            <>
                <h2>You don't have any TaskFlows</h2>
                <Navlink endpoint = {`/${username}/taskflows/create`} label = "Create a new TaskFlow here"/>
            </>
        ); 
    } else {
        return (
            <>
                <h2>{username}'s taskflows</h2>
                <ul>
                    {taskflows.map((taskflow) => (
                        <li key={taskflow.id}>
                            <Link to = {`/${username}/taskflows/${taskflow.id}`}>
                                <button>{taskflow.name}</button>
                            </Link>
                            <button>⚙️</button>
                        </li>
                    ))}
                </ul>
            </>
        ); 
    }; 
     
};