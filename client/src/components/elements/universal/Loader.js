import React from 'react';
import '../../../App.scss';

// Styles
import './Loader.css';

const Loader = (props)=>{
    return(
        <div className={props.visibility} id='loader-wrapper'>
            <div className='columns is-mobile is-centered mt-large'>
                <div className='column is-narrow is-centered'>
                    <div className='loader is-loading'/>
                </div>
            </div>
        </div>
    )
}

export default Loader;
