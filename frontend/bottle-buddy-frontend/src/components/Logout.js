import useBlackListJWTCookies from "../hooks/useBlackListJWTCookies"
import useAuth from "../hooks/useAuth";

function Logout() {
    const { auth } = useAuth();
    const blacklistJWTToken = useBlackListJWTCookies();

    return (
        <> {auth?.email 
            ? (<div>
                <span onClick={() => blacklistJWTToken()}>Logout</span>
            </div>
            ) : (<span >Login</span>)
        }
         </>
    )
}

export default Logout
