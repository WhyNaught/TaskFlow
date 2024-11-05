import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Navlink({endpoint, label}) {
    return (
        <li>
            <Link to = {endpoint}>
                <button>{label}</button>
            </Link>
        </li>
    );
};

export default function Nav () {
    return (
        <ul>
            <Navlink endpoint = "/taskflows" label = "My TaskFlows" />
            <Navlink endpoint = "/taskflows/create" label = "Create New TaskFlow" />
            <Navlink endpoint = "/settings" label = "Settings" />
        </ul>
    );
};