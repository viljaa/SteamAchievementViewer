import React from 'react';
import {Link} from 'react-router-dom';

// Styles
import '../../../../App.scss';

const InfoContainer = ()=>{
    return(
        <div>
            <div className='content'>
                <p className='title is-3'>How to start using Arch:</p>
                <p>Arch Steam Achievement Viewer utilizes Steam Web API to fetch your public achievement data into our own database.
                To start tracking your personal Steam achievements with Arch, you need:</p>
                <ul>
                    <li><div className='subtitle'>SteamID64</div></li> 
                    <li><div className='subtitle'>Steam profile set as public</div></li>
                </ul>
                <div className='block' />
                <p>You can get your SteamId from the public URL of your Steam profile or by using <a href='https://steamidfinder.com/'target="_blank">SteamID Finder</a>.</p>
                <p className='title is-5 mt-2'>Update or View?</p>
                <p>
                    Arch saves your personal achievement data and compiles it as a single viewable collection. Update option updates user's achievement data to the DB and
                    shows the collection after the update is complete. View option shows the last updated collection. First time users need to perform one Update before they're able
                    to use View.
                </p>
            </div>
            <Link className='button is-dark' to={'/features'}>Read more</Link>
        </div>
    )

}

export default InfoContainer;