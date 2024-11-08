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

export default function Nav ({id}) {
    return (
        <ul>
            <Navlink endpoint = {`/${id}/taskflows`} label = "My TaskFlows" />
            <Navlink endpoint = {`/${id}/taskflows/create`} label = "Create New TaskFlow" />
            <Navlink endpoint = {`/${id}/settings`} label = "Settings" />
        </ul>
    );
};