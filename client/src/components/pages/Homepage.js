import React from 'react';
import '../../App.scss';

// Import components
import Navbar from '../elements/universal/Navbar.js'
import HomeContainer from '../elements/HomeContainer.js'

const Homepage = () =>{
    return(
        <div className='container is-max-widescreen'>
            <Navbar />
            <HomeContainer />
        </div>
    )
};

export default Homepage;