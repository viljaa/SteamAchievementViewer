import React, {useState} from 'react';
import {Link} from 'react-router-dom';

//Styles
import '../../../App.scss';
import './SteamIdSearch.css';

const SteamIdSearchBar = (props) =>{

    const [steamId, setSteamId] = useState('');

    return(
        <div className='box radius-large' id={props.id}>
            <div className='tile is-parent'>
                <h4 className='title is-5' id={props.title}>Get your achievements:</h4>
            </div>
            <div className='tile is-parent'>
                <div className='tile is-child is-9'>
                    <input className="input" type="text" placeholder="SteamID" onChange={
                        (event) => setSteamId(event.target.value)
                    }/>
                </div>
                <div className='tile is-child is-1'></div>
                <div className='tile is-child is-2'>
                    <p className='buttons'>
                        <Link className='button is-dark' to={`/userAchievements?steamId=${steamId}`}>Update</Link>
                        <Link className='button is-dark' to={`/userAchievements?steamId=${steamId}`}>View</Link>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default SteamIdSearchBar;