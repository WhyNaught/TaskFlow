import axios from 'axios';
import {useState, useEffect} from 'react'; 
import { Navigate, Link } from 'react-router-dom';

export default function Shared ({authenticated, sharedFlows, username}) {
    if (!authenticated) {
        return (
            <Navigate to="/" />
        );
    };

    const [flows, setFlows] = useState([]); 

    useEffect(() => {
        sharedFlows.map((sharedFlow) => {
            axios.get(`http://localhost:3000/api/user/taskflow`, {params: {taskflowId: sharedFlow}})
                .then(response => {
                    setFlows([...flows, response.data])})
                .catch(err => {console.error(err)}); 
        }); 
    }, [sharedFlows]); 
    
    if (flows.length === 0) {
        return (
            <div>
                <h2>No taskflows shared yet...</h2>
            </div>
        ); 
    } else if (flows.length > 0) {
        return (
            <div>
                <h2>Shared with me</h2> 
                <ul>
                    {flows.map((flow) => {
                        return (
                            <li key={flow.taskflow.id}>
                                <Link to = {`/${username}/shared-with-me/${flow.taskflow.author}/${flow.taskflow.id}`}>
                                    <button>{flow.taskflow.name}</button>
                                    <p>By: {flow.taskflow.author}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }; 
};