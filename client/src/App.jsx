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
import Shared from './pages/Shared';
import SharedFlow from './pages/SharedFlow';

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
    const [userData, setUserData] = useState(null); 
    const [sharedFlows, setSharedFlows] = useState([]); 
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user', { withCredentials: true }); 
                setUserData(response.data); 
            } catch (err) {
                console.error('Error fetching user data', err); 
            }
        }; 
        fetchData(); 
      }, []);

    useEffect(() => {
      const fetchShared = async () => {
          if (userData) {
              try {
                  const response = await axios.get("http://localhost:3000/api/user/shared", {withCredentials: true, params: {
                    username: userData.username
                  }}); 
                  setSharedFlows(response.data.sharedFlows); 
              } catch (err) {
                  console.error('Error fetching shared flows', err); 
              } finally {
                  setLoading(false); 
              };  
          }; 
      }; 
      fetchShared(); 
    }, [userData]); 

    if (loading) {
        return (
            <h2>Loading...</h2>
        ); 
    }; 
    return (
        <Router>   
            <nav>
                <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/about">About</Link> | <Link to="/login">Login</Link> 
            </nav>
            <Routes>
                <Route path="/" element={<Home userData = {userData ? userData : null}/>} />
                <Route path="/register" element={<Register endpoint="http://localhost:3000/api/register" />} />
                <Route path="/about" element={<About />} />
                <Route path='/login' element = {<Login endpoint="http://localhost:3000/api/login"/>}/>
                <Route path='/:username/taskflows' element = {<TaskFlows userData = {userData? userData : null} />}/>
                <Route path='/:username/taskflows/create' element = {<Create userData = {userData? userData : null} endpoint = "http://localhost:3000/api/user/create" />}/>
                <Route path='/:username/taskflows/:taskflowId' element = {< TaskFlow />}/>
                <Route path='/:username/shared-with-me' element = {<Shared userData = {userData ? userData : null}/>}/>
                <Route path="/:username/shared-with-me/:author/:taskflowId" element = {< SharedFlow sharedFlows = {sharedFlows ? sharedFlows : []} userData = {userData ? userData : null}/>}/> 
            </Routes>
        </Router>
    );
}

export default App;