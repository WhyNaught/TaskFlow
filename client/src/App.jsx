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
    return (
      <div>
        <h2>About Page</h2>
        <p>TaskFlow is a collaborative full-stack task management app developed using React + Vite for the frontend, express for server routing, node.js for the runtime environment, and mongoDB for data storage.</p>
      </div>
    );
};

// renders the navbar and all the browser routes
function App() {
    const [authenticated, setAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [userData, setUserData] = useState(() => {
      const data = localStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    });
    const [taskFlows, setTaskFlows] = useState([]); 
    const [loading, setLoading] = useState(true); 
      useEffect(() => {
          const fetchData = async () => {
            try {
              const user = await axios.get('http://localhost:3000/api/user', {withCredentials: true}); 
              setUserData(user.data);
              setAuthenticated(true); 
              localStorage.setItem('isAuthenticated', 'true'); 
              localStorage.setItem('userData', JSON.stringify(user.data)); 
            } catch (err) {
              console.error('Error fetching user data', err); 
              setAuthenticated(false); 
              localStorage.removeItem('isAuthenticated'); 
              localStorage.removeItem('userData'); 
            } finally {
              setLoading(false); 
            }
          }
          if (authenticated && !userData) {
            fetchData(); 
          } else {
            setLoading(false); 
          }; 
      }, [authenticated, userData]);
      
      useEffect(() => {
        if (authenticated && userData) {
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
      }, [authenticated, userData]);
    if (loading) {
      return (<div>Loading...</div>); 
    } else {
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
}

// exports our app to our main.jsx file
export default App;