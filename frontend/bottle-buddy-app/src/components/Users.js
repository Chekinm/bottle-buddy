import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
import axios1 from '../api/axios'


const Users = () => {
    const [ users, setUsers ] = useState()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const login = async () => {
            try {
                const response = await axios1.post('/api/token/', 
                    
                    JSON.stringify({"email":"su@su.su","password":"su"}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log('cookies', response.headres)
            console.log(JSON.stringify(response?.data));    
            console.log(response);
            } catch (err) {
                console.error(err);
            }
        }
        
        
        
        const getUsers = async () => {
            try {
                const response = await axios1.get('/api/users/', {
                    signal: controller.signal
                });
                console.log(response.data)
                isMounted && setUsers(response.data)

            } catch (err) {
                console.error(err);
            }
        }



        login()
        // getUsers()

        return () => {
            isMounted = false;
            controller.abort();
        }        
    },[]);
    
    const onClick = () => {
        const getUsers = async () => {
            try {
                const response = await axios1.get('/api/users/', {
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    withCredentials: true,
                }
                );
                console.log('cookies2', Cookies.get())
                console.log(response.data)
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
            <button onClick={onClick}>GEt users</button>
            {users?.length
            ? (
                <ul>
                    {users.map((users, i) => <li key = {i}>{users?.email}</li>)}
                </ul>
            ) : <p>no users to display</p>}
        </article>
  )
}

export default Users