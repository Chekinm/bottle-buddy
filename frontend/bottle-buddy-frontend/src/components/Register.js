import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCheck, faTimes, faCircleInfo} from "@fortawesome/free-regular-svg-icons";
import { faCheck, faTimes, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "../api/axios";



// this regex set to any string dev purpose not to spend time to enter valid email
//   /.*/;   //

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,25}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,25}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,255}$/;
const CREATE_USER_URL = "/api/signup/"

const Register = () => {

    const inputFirstNameRef = useRef(null);
    const errRef = useRef(null);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confirmPwd, setConfirmPwd] = useState('');
    const [validConfirmPwd, setValidConfirmPwd] = useState(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        inputFirstNameRef.current.focus();
    }, []);

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName]);

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidConfirmPwd(pwd === confirmPwd);
    }, [pwd, confirmPwd]);

    useEffect(() => {
        //reset API error message when user starts fixing the problem
        setErrMsg('');
    }, [firstName, lastName, email, pwd, confirmPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // I read in internet that this check will work if 
        // somebody hack our form logic with regex
        if (!NAME_REGEX.test(firstName) ||
            !NAME_REGEX.test(lastName) ||
            !EMAIL_REGEX.test(email) ||
            !PWD_REGEX.test(pwd)) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(CREATE_USER_URL,
                JSON.stringify({
                    "first_name": firstName,
                    "last_name": lastName,
                    "email": email,
                    "password": pwd
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPwd('');
            setConfirmPwd('');
        } catch (error) {
            if (!error?.response) {

                setErrMsg("No Server Response")
            } else {
                setErrMsg("Server response with error")
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>User created!</h1>
                    <p>
                        <span className="line">
                                <Link to="/login">Login!</Link>
                        </span>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName" className="form-input">
                            First name:
                            <FontAwesomeIcon icon={faCheck}
                                className={validFirstName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes}
                                className={validFirstName || !firstName ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="firstName"
                            ref={inputFirstNameRef}
                            autoComplete="off"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                            aria-invalid={validFirstName ? "false" : "true"} // this is WAI-ARIA stuff 
                            aria-describedby="firstNamesNote"  // made site accessible to people with disabilities
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                        />
                        <p id="firstNamesNote" className={firstNameFocus &&
                            firstName &&
                            !validFirstName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            1 to 25 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="lastName" className="form-input">
                            Last name:
                            <FontAwesomeIcon icon={faCheck}
                                className={validLastName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes}
                                className={validLastName || !lastName ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="lastName"
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="lastNameNote"
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                        />
                        <p id="lastNamesNote" className={lastNameFocus && !validLastName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            1 to 25 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="email" className="form-input">
                            Email:
                            <FontAwesomeIcon icon={faCheck}
                                className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes}
                                className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="email"
                            autoComplete="off"  // check it later if it is usefull
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailNote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailNote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            Enter valid email address.<br />
                            Up to 255 characters.
                        </p>

                        <label htmlFor="password" className="form-input">
                            Password:
                            <FontAwesomeIcon icon={faCheck}
                                className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes}
                                className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdNote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdNote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span>
                            <span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span>
                            <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirmPassword" className="form-input">
                            Confirm password:
                            <FontAwesomeIcon icon={faCheck}
                                className={validConfirmPwd && confirmPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes}
                                className={validConfirmPwd || !confirmPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPwd(e.target.value)}
                            value={confirmPwd}
                            required
                            aria-invalid={validConfirmPwd ? "false" : "true"}
                            aria-describedby="confirmPwdNote"
                            onFocus={() => setConfirmPwdFocus(true)}
                            onBlur={() => setConfirmPwdFocus(false)}
                        />
                        <p id="confirmPwdNote" className={confirmPwdFocus && !validConfirmPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            Should be the same as first input.
                        </p>

                        <button disabled={!validFirstName ||
                            !validLastName ||
                            !validEmail ||
                            !validPwd ||
                            !validConfirmPwd ? true : false}
                            className="form-input">SIGN UP</button>
                    </form>
                    <p className='text-white'>
                        Already with us?
                        <span className="line">
                            <Link to="/login">Login!</Link>
                        </span>
                    </p>

                </section>
            )}
        </>
    )
}

export default Register

