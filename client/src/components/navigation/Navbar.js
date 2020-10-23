import React from 'react';
import '../../App.scss';

const Navbar = () =>{
    return(
        <div className='navbar'>
                <div className='navbar-brand'>
                    <a className='navbar-item'>
                    <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28'/>
                    </a>
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                    <a className="navbar-item">
                        Home
                    </a>

                    <a className="navbar-item">
                        Features
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                        More
                        </a>

                        <div className="navbar-dropdown">
                        <a className="navbar-item">
                            About
                        </a>
                        <a className="navbar-item">
                            Project
                        </a>
                        <a className="navbar-item">
                            Contact
                        </a>
                        <hr className="navbar-divider"/>
                        <a className="navbar-item">
                            Report an issue
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    )
};

export default Navbar;