import React from 'react';

// Import styles
import '../../../../App.scss';

// Import components
import Paragraph from './Paragraph';

// Import paragraph content components
import BeginTrackingContent from '../content/BeginTrackingContent';
import UpdateContent from '../content/UpdateContent';
import ViewContent from '../content/ViewContent';

const ContentContainer = () =>{

    return(
        <div className='content'>
            <div className='tile is-parent'>
                <div className='tile is-child is-vertical'>
                    <div className='tile is-child'>
                        <Paragraph title='Begin tracking' icon="fas fa-code-branch mr-1" content={<BeginTrackingContent/>}/>
                    </div>
                    <div className='tile is-child'>
                        <Paragraph title='Update' icon="fas fa-cloud-download-alt mr-1" content={<UpdateContent/>}/>
                    </div>
                    <div className='tile is-child'>
                        <Paragraph title='View' icon="fas fa-eye mr-1" content={<ViewContent/>}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentContainer;