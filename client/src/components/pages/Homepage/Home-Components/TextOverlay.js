import React, {useState} from 'react';

//Import styles
import '../../../../App.scss';

const TextOverlay = (props) =>{
    return (
        <div className={props.class}>
            <div className='tile is-child is-8'>
                <h2 className='title is-2 imgOverlay_text'>View your Steam achievements as a single collection.</h2>
                <p className='imgOverlay_text'>Arch Steam Achievement Viewer fetches your Steam achievement data and compiles it as a viewable collection. See your achievements in one place, wihtout hassle.</p>
            </div>
        </div>
    )
}

export default TextOverlay;