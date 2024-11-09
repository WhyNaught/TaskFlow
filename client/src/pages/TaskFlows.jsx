import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react'; 

function Navlink({endpoint, label}) {
    return (
        <li>
            <Link to = {endpoint}>
                <button>{label}</button>
            </Link>
        </li>
    );
};

export default function TaskFlows ({authenticated, taskflows, username}) {
    const location = useLocation(); 
    if (!authenticated) {
        return <Navigate to="/"/>
    }; 
    if (taskflows.length === 0) {
        return (
            <>
                <h2>You don't have any TaskFlows</h2>
                <Navlink endpoint = {`/${username}/taskflows/create`} label = "Create a new TaskFlow here"/>
            </>
        )
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
                        </li>
                    ))}
                </ul>
            </>
        ); 
    }; 
     
};