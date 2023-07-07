import { useState, useEffect } from "react"
import axios from '../api/axios'
import useRefreshJWTToken from "../hooks/useRefreshJWTToken"
import useBlackListJWTCookies from "../hooks/useBlackListJWTCookies"
import { useLocation, useNavigate, useMap } from "react-router-dom"
import MapShowOrders from "./MapShowOrders"
import useGeolocation from "../hooks/useGeoLocation"



const PickUpOrders = () => {
    const [ users, setUsers ] = useState();
    const refresh = useRefreshJWTToken();
    const blacklist = useBlackListJWTCookies();
    const navigate = useNavigate()

    const { latitude, longitude, error } = useGeolocation(31, 34, '');

    const onClick = () => {
        const getUsers = async () => {
            try {
                const response = await axios.get('/api/addresses/', {
                    headers: { 
                        'Content-Type': 'application/json' 
                    },
                    withCredentials: true,
                }
                );
                setUsers(response.data)
                console.log(users)
            } catch (err) {
                console.error(err);
            }
        }
        getUsers()
    }


    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <section>
            <h1> Confirm location </h1>
            <article>
            Latitude: {latitude}<br />
            Longitude: {longitude}
            
            <MapShowOrders  />
            </article>
            
            {/* <h2>users list</h2>
            <button onClick={onClick}>Get users</button>
            {users?.length
            ? (
                <ul>
                    {users.map((users, i) => <li key = {i}>{users?.street}</li>)}
                </ul>
            ) : <p>no users to display</p>} */}
            <button onClick={() => refresh()}>Refresh</button>
            <br />
            <button onClick={() => blacklist()}>Sign Out</button>
            <br />
            
            
            <button onClick={() => navigate(-1)}>Go Back</button>


        </section>
  )
}

export default PickUpOrders