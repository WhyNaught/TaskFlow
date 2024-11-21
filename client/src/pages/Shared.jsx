import {useEffect, useState} from 'react'; 
import axios from 'axios'; 
import { Navigate, Link } from 'react-router-dom';

export default function Shared ({endpoint, authenticated, username}) {
    const [sharedFlows, setSharedFlows] = useState([]); 
    if (authenticated) {
        useEffect(() => {
            axios.get(endpoint, {withCredentials: true, params: {
                username: username
            }})
            .then(response => {
                setSharedFlows(response.data.sharedFlows);
            })
            .catch(error => {
                console.error('Error getting shared taskflows', error); 
                setSharedFlows([]); 
            })
        }, [authenticated]);
    } else {
        return (
            <Navigate to="/"/>
        );
    }; 

    if (sharedFlows.length === 0) {
        return (
            <div>
                <h2>No taskflows shared yet...</h2>
            </div>
        ); 
    } else if (sharedFlows.length > 0) {
        return (
            <div>
                <h2>Shared with me</h2> 
                <ul>
                    {sharedFlows.map(flow => {
                        return (
                            <li key={flow.id}>
                                <Link to = {`/${flow.author}/taskflows/${flow.id}`}>
                                    <button>{flow.name}</button>
                                    <p>By: {flow.author}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }; 
};