import { useState, useEffect } from "react"
import axios from '../api/axios'
import useRefreshJWTToken from "../hooks/useRefreshJWTToken"
import useBlackListJWTCookies from "../hooks/useBlackListJWTCookies"
import { useNavigate } from "react-router-dom"

const Users = () => {
    const [ users, setUsers ] = useState();
    const refresh = useRefreshJWTToken();
    const blacklist = useBlackListJWTCookies();
    const navigate = useNavigate()

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getUsers = async () => {
    //         try {
    //             const response = await axios1.get('/api/users/', {
    //                 signal: controller.signal
    //             });
    //             console.log(response.data)
    //             isMounted && setUsers(response.data)

    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
        
    //     getUsers()

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     }        
    // },[]);
    
    const onClick = () => {
        const getUsers = async () => {
            try {
                const response = await axios.get('/api/users/', {
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    withCredentials: true,
                }
                );
                setUsers(response.data)

            } catch (err) {
                console.error(err);
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
            <button onClick={() => blacklist()}>Sign Out</button>
            <br />
            
            
            <button onClick={() => navigate(-1)}>Go Back</button>


        </article>
  )
}

export default Users