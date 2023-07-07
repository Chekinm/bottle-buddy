import { useNavigate, Link } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

const StartPage = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    return (
        <section>
            <h1>Hello {auth.first_name} {auth.last_name}!</h1>
            <br />
            <p>Let's save the world together!</p>
            <br />
            <p>What is your mission today?</p>

            <br />
            <Link to="/createorder">Fill like want to save planet, but have no time!</Link>
            <br />
            <Link to="/pickuporders">Fills like I'll take care of your bootles!</Link>
            
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default StartPage