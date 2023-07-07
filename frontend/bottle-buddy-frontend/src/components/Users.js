import { useState, useEffect } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate'

import useRefreshJWTToken from "../hooks/useRefreshJWTToken"
import useBlackListJWTCookies from "../hooks/useBlackListJWTCookies"
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [ users, setUsers ] = useState();
    const axiosPrivate = useAxiosPrivate()


    const refresh = useRefreshJWTToken();
    const blacklistJWTToken = useBlackListJWTCookies();
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/api/users/', {
                    signal: controller.signal
                });
                isMounted && setUsers(response.data)
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }
        
        getUsers()

        return () => {
            isMounted = false;
            controller.abort();
        }        
    },[]);
    
    const onClick = () => {
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/api/users/', {
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    withCredentials: true,
                }
                );
                setUsers(response.data)

            } catch (err) {
                console.error(`Refresh token expired \n ${err}`);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getUsers()
    }



    return (
        <article>
            <h2>users list</h2>
            <button onClick={onClick}>Get users</button>
            {users?.length
            ? (
                <ul>
                    {users.map((users, i) => <li key = {i}>{users?.email}</li>)}
                </ul>
            ) : <p>no users to display</p>}
            <button onClick={() => refresh()}>Refresh</button>
            <br />
            <div className="flexGrow">
                <button onClick={() => blacklistJWTToken()}>Sign Out</button>
            </div>
            <br />
            
            
            <button onClick={() => navigate(-1)}>Go Back</button>


        </article>
  )
}

export default Users