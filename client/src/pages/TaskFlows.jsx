import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios'; 
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

export default function TaskFlows () {
    const [flows, setFlows] = useState(null); 
    if (!flows) {
        return (
            <>
                <h2>You don't have any TaskFlows</h2>
                <Navlink endpoint = "/create-new" label = "Create a new TaskFlow here"/>
            </>
        ); 
    } else {
        return (
            <div>
                <h2>Your TaskFlows:</h2>
                <ul>
                    {flows.map(function(flow) {
                        return (
                            <li key = {flow.id}>
                                <p>{flow.name}</p>
                                <p>{flow.creator}</p>
                            </li>
                        )
                    })};
                </ul>
            </div>            
        )
    };
};