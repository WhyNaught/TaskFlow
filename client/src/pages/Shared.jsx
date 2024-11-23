import { Navigate, Link } from 'react-router-dom';

export default function Shared ({authenticated, sharedFlows, username}) {
    if (!authenticated) {
        return (
            <Navigate to="/" />
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
                                <Link to = {`/${username}/shared-with-me/${flow.author}/${flow.id}`}>
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