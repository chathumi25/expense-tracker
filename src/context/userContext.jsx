// userContext.jsx
import { createContext, useState, useEffect } from "react"; // Line 1: added useEffect

export const UserContext = createContext(); // Line 3

const UserProvider = ({ children }) => { // Line 5
    const [user, setUser] = useState(null);

    //  Line 8–13: Load user from localStorage when app starts
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Function to update user data
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); //  Line 17: persist user
    };

    // Function to clear user data (e.g., on logout)
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user"); //  Line 22: remove user when logging out
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}> 
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider; // Line 29
