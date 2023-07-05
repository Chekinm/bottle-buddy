import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';


const AUTRHORISATION_URL = "/api/token/";

const Login = () => {

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const inputEmailRef = useRef(null);
    const errRef = useRef(null);

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect (() => {
        inputEmailRef.current.focus();
    },[]);

    useEffect (() => {  // this one remove error message when we starting to fix the problem with input
        setErrMsg('');
     }, [email,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, pwd);

        try {
            const response = await axios.post(AUTRHORISATION_URL, 
                    
                    JSON.stringify({"email":email,"password":pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log('response_data', JSON.stringify(response?.data));    
            setAuth (response?.data)
            setEmail('')
            setPwd('')
            navigate(from, {replace: true })
            } catch (error) {
                if (!error?.response) {
                    setErrMsg ("No Server Response")
                } else {
                    setErrMsg ("Server response with error")
                    console.log(JSON.stringify(error.response))
                }  
                errRef.current.focus();
            }        
    } 

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text"
                    id="email"
                    ref={inputEmailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type="text"
                    id="password"
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                {}
                <button>Sign In</button>
            </form>
            <p>
                Not yet regieter?
                <span className="line">
                    <Link to="/register">Register</Link>
                </span>
            </p>
        </section>
    )
}

export default Login