import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios'; 
import {useState, useEffect} from 'react'; 
import {Navigate} from 'react-router-dom'; 

function Navlink({endpoint, label}) {
    return (
        <li>
            <Link to = {endpoint}>
                <button>{label}</button>
            </Link>
        </li>
    );
};

export default function TaskFlows ({authenticated, flows}) {
    if (!authenticated) {
        return <Navigate to="/"/>
    }; 
    if (flows.length === 0) {
        return (
            <>
                <h2>You don't have any TaskFlows</h2>
                <Navlink endpoint = "/create" label = "Create a new TaskFlow here"/>
            </>
        )
    } else {
        return (
            <ul>
                {flows.map((flow) => (
                    <li key={flow.id}>
                        <p>{flow.name}</p>
                        <p>{flow.author}</p>
                    </li>
                ))}
            </ul>
        ); 
    }
     
};