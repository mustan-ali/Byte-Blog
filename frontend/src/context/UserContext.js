import { useState, useEffect, createContext } from 'react';
const URL = process.env.REACT_APP_BACKEND_URL;


export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const res = await fetch(`${URL}/api/auth/verifyUser`, {
                method: "GET",
                credentials: "include"
            });
            const data = await res.json();

            if (res.status === 500) {
                return setUser(null);
            }

            setUser(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider >
    )
}