import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';


const AUTRHORISATION_URL = "/api/token/";

const Login = () => {

    const { setAuth, stayLoggedIn, setStayLoggedIn } = useAuth();

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
                    const errorObj = error.response
                    console.log(JSON.stringify(errorObj.data.detail))
                    setErrMsg (errorObj.status === 401 
                        ? JSON.stringify(errorObj.data.detail)
                        : ("Server error"))
                }  
                errRef.current.focus();
            }        
    } 

    const toggleStayLoggedIn = () => {
        setStayLoggedIn(prev => !prev)
    }

    useEffect (() => {
        localStorage.setItem("stayLoggedIn", stayLoggedIn )
    },[stayLoggedIn])

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="form-input">Email:</label>
                <input 
                    className="form-input"
                    type="text"
                    id="email"
                    ref={inputEmailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password" className="form-input">Password:</label>
                <input 
                    className="form-input"
                    type="password"
                    id="password"
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                {}
                <button className="form-input">Sign In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="stayLoggedIn"
                        onChange={toggleStayLoggedIn}
                        checked={stayLoggedIn}
                    />
                    <label htmlFor="stayLoggedIn" className="form-input">Stay logged in</label>
                </div>
            </form>
            <p className='text-white'>
                Not yet with us? 
                <span className="line">
                    <Link to="/register">Join!</Link>
                </span>
            </p>
        </section>
    )
}

export default Login