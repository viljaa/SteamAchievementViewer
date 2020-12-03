import React, {useState} from 'react';
import {Link} from 'react-router-dom';

//Styles
import '../../../App.scss';
import './Navbar.css';

import logo from './Arch_navbar.png';

const Navbar = () =>{

    const [isOpen,setIsOpen] = useState(false);

    const toggle = () =>{
        setIsOpen(!isOpen);
    }

    return(
        <div className='navbar'>
            <div className='navbar-brand'>
                <a className='navbar-item'>
                    <img src={logo} id='navbarBanner'/>
                </a>
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic" onClick={toggle}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasic" className={isOpen ? 'navbar-menu is-active':'navbar-menu'}>
                <div className="navbar-start">
                    <Link className='navbar-item' to={'/'}><i class="fas fa-home mr-1"/>Home</Link>
                    <Link className='navbar-item' to={'/features'}>Features</Link>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">More</a>
                        <div className="navbar-dropdown">
                            <a className="navbar-item">FAQ</a>
                            <hr className="navbar-divider"/>
                            <a className="navbar-item" href='https://github.com/viljaa/SteamAchievementViewer'>Project</a>
                            <a className="navbar-item" href='https://github.com/viljaa/SteamAchievementViewer/issues'>Report an issue</a>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
    )
};

export default Navbar;