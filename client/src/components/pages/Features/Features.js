import React,{useEffect} from 'react';

// Import styles
import '../../../App.scss';

// Import components
import Navbar from '../../elements/universal/Navbar';
import ContentContainer from './components/ContentContainer';

const Features = () =>{

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return(
        <div className='container is-max-widescreen'>
            <Navbar />
            <div className='box mb-large'>
                <div className='m-1'>
                    <h2 className='title is-3 mb-2'>Features</h2>
                    <p className='subtitle'>Get to know Arch's basic functionalities and how to use them</p>
                </div>
                <hr className='hr'/>
                <ContentContainer/>
            </div>
        </div>
    )
};

export default Features;