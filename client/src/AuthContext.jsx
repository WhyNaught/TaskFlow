import {useContext, createContext, useState, useEffect} from 'react'; 
import axios from 'axios'; 

const AuthContext = createContext(); 

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
    const [userData, setUserData] = useState(() => {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await axios.get('http://localhost:3000/api/user', { withCredentials: true });
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
        };
        
        if (authenticated && !userData) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [authenticated, userData]);

    return (
        <AuthContext.Provider value={{ authenticated, userData, loading, setAuthenticated, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
}; 

export function useAuth() {
    return useContext(AuthContext);
}; 