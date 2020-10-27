import React from 'react';
import {Link} from 'react-router-dom';

//Styles
import '../../../App.scss';

import logo from './Arch_navbar.png';

const Navbar = () =>{
    return(
        <div className='navbar'>
            <div className='navbar-brand'>
                <a className='navbar-item'>
                    <img src={logo} id='navbarBanner'/>
                </a>
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link className='navbar-item' to={'/'}>Home</Link>
                    <Link className='navbar-item' to={'/features'}>Features</Link>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">More</a>
                        <div className="navbar-dropdown">
                            <a className="navbar-item">About</a>
                            <a className="navbar-item">Project</a>
                            <a className="navbar-item">Contact</a>
                            <hr className="navbar-divider"/>
                            <a className="navbar-item">Report an issue</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;