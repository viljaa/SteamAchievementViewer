import React, {useEffect} from 'react'

// Import styles
import '../../../App.scss';

// Import components
import Navbar from '../../elements/universal/Navbar';
import FaqContainer from './components/FaqContainer';

const Faq = () =>{

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return(
        <div className='container is-max-widescreen'>
            <Navbar/>
            <div className='box mb-large'>
                <h3 className='title is-3 mb-2'>FAQ - Frequently asked questions</h3>
                <p className='subtitle'>Find answers to the most regular questions about Arch</p>
                <hr className='hr'/>
                <FaqContainer/>
            </div>
        </div>
    )
}

export default Faq;