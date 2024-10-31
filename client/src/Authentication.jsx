import {useState, useEffect} from 'react'; 
import axios from 'axios';

// this function might be a major security risk, please revisit before pushing to production
export default function Authentication (endpoint) {
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
      axios.get(endpoint, {withCredentials: true})
        .then(response => {
          if (response.status === 200) {
            setAuthenticated(true);
          }
        }).catch(error => {setAuthenticated(false);});
    }, []);
    return authenticated; 
};