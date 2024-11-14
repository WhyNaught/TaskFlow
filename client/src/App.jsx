import React from 'react';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import Home from '../src/pages/Home'; 
import TaskFlows from '../src/pages/TaskFlows';
import Create from '../src/pages/Create'; 
import {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskFlow from './pages/TaskFlow';

// will make dedicated file for this later 
function About() {
    return <h2>About Page</h2>;
}

// renders the navbar and all the browser routes
function App() {
    const [authenticated, setAuthenticated] = useState(false); // consider changing this to just checking the token each time
    const [userData, setUserData] = useState(null); 
    const [taskFlows, setTaskFlows] = useState([]); 
    useEffect(() => {
        axios.get('http://localhost:3000/api/user', { withCredentials: true })
          .then(response => {
            setUserData(response.data);
            setAuthenticated(true);  
          })
          .catch(error => {
            console.error('Error fetching user data', error);
            setAuthenticated(false);
          });
      }, []);
      
      useEffect(() => {
        if (authenticated) {
          axios.get('http://localhost:3000/api/user/taskflows', 
            { 
                withCredentials: true, 
                params: {
                    username: userData.username, 
                    email: userData.email
                }
            })
            .then(response => {
              setTaskFlows(response.data.taskflows); 
            })
            .catch(error => {
              console.error('Error fetching taskflows data', error);
            });
        }
      }, [authenticated]);
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/about">About</Link> | <Link to="/login">Login</Link> 
            </nav>
            <Routes>
                <Route path="/" element={<Home username = {userData ? userData.username : null} authenticated={authenticated} id = {userData ? userData.username : null}/>} />
                <Route path="/register" element={<Register endpoint="http://localhost:3000/api/register" />} />
                <Route path="/about" element={<About />} />
                <Route path='/login' element = {<Login endpoint="http://localhost:3000/api/login"/>}/>
                <Route path='/:username/taskflows' element = {<TaskFlows username = {userData? userData.username : null} authenticated = {authenticated} taskflows = {taskFlows}/>}/>
                <Route path='/:username/taskflows/create' element = {<Create username = {userData? userData.username : null} endpoint = "http://localhost:3000/api/user/create" authenticated={authenticated}/>}/>
                <Route path='/:username/taskflows/:taskflowId' element = {< TaskFlow taskflows = {taskFlows} authenticated = {authenticated}/>}/>
                {/* Make sure to add in the route for the shared-with-me page and its respective component */}
            </Routes>
        </Router>
    );
}

// exports our app to our main.jsx file
export default App;