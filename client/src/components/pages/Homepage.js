import React from 'react';
import '../../App.scss';

// Import components
import Navbar from '../navigation/Navbar.js'

const Homepage = () =>{
    return(
        <div className='container is-max-desktop'>
            <Navbar />
        </div>
    )
};

export default Homepage;