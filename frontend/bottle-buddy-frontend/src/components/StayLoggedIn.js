import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshJWTToken from "../hooks/useRefreshJWTToken";
import useAuth from "../hooks/useAuth";

const StayLoggedIn = () => {
    const [isWaitingForLogin, setIsWaitingForLogin] = useState(true);
    const refresh = useRefreshJWTToken();
    const { auth, stayLoggedIn } = useAuth();


    useEffect(() => {
        const sendRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                console.log(`Look like refresh token expired \n ${err}`);
            }
            finally {
                setIsWaitingForLogin(false)
            }       
        }
        !auth?.email && stayLoggedIn ? sendRefreshToken() : setIsWaitingForLogin(false)
    }, [])

    return (
        <>
            {!stayLoggedIn
                ? <Outlet />
                : isWaitingForLogin 
                    ? <p>Login in progress...</p>
                    : <Outlet />}
        </>
    )
}

export default StayLoggedIn