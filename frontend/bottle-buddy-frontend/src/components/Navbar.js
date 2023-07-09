import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import Logout from './Logout';


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { auth } = useAuth();


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar p-0 pe-2 navbar-expand-lg navbar-dark bg-dark">
            <button
                className="navbar-toggler"
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                type="button"
                onClick={toggleMenu}
            >
                <span className="navbar-toggler-icon  bg-dark"></span>
            </button>
            <div
                className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}
            >
                <ul className="navbar-nav mr-auto p-0  m-1 pe-2 text-center">
                    <li className="nav-item pe-2">
                        <Link 
                        className="nav-link pe-2" 
                        to="/"
                        onClick={toggleMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item pe-2 text-center">
                        <Link 
                            className="nav-link pe-2 text-center" 
                            to="/register"
                            onClick={toggleMenu}
                            >
                            Register
                        </Link>
                    </li>
                    <li className="nav-item pe-2" >
                        <Link className="nav-link pe-2 " 
                        to="/linkpage"
                        onClick={toggleMenu}
                        >
                            Link Page
                        </Link>
                    </li>
                    <li className="nav-item pe-2">
                        <Link className="nav-link pe-2" 
                        to="/login"
                        onClick={toggleMenu}
                        >
                            <Logout />
                        </Link>
                    </li>
                </ul>

            </div>
            <span className="navbar-text ms-auto pe-4">{auth?.first_name} {auth?.last_name}</span>
        </nav>

    );
}

export default Navbar;
