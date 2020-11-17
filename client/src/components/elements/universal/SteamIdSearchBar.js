import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import socket from '../../../socket/Socket.js'

//Styles
import '../../../App.scss';
import './SteamIdSearch.css';

const SteamIdSearchBar = (props) =>{

    const [steamId, setSteamId] = useState('');
    const [isValid,setIsValid] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [updateBtnClass, setUpdateBtnClass] = useState('button is-dark');
    const [updateFailed, setUpdateFailed] = useState(false);

    /* Functions */

    //Function for validating input, modifier parameter: 1=update 0=view
    function validateInput(event,modifier){
        
        setUpdateFailed(false);
        setIsValid(true);

        if(steamId.length < 1){
            event.preventDefault();
            setIsValid(false);
        }
        else if(steamId.length > 1 && modifier===1){
            // Note: searchbarAction event emitted at this state only if user updates data, since view event is always triggered on UserAchievements page load/refresh.
            searchbarAction(steamId,modifier);
            setUpdateBtnClass('button is-dark is-loading');
            
            // Redirect to UserAchievements page after updates are finished and client gets confirmation from server
            socket.on('updateDone',()=>{
                console.log('Redirect triggered')
                setRedirect(true);
            })
        }
    }

    /* Socket events */
    socket.on('unableToUpdate', ()=>{
        setUpdateBtnClass('button is-dark');
        setUpdateFailed(true);
    })

    // Function that emits event that triggers either update or view action in the backend
    function searchbarAction(id,modifier){
        socket.emit('searchbarAction', {
            steamId:id,
            doesUpdate:modifier
        });
    }

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
                    {!isValid &&
                        <p className='white-text'>Invalid input!</p>
                    }
                    {updateFailed &&
                        <p className='white-text'>Unable to update. Check your SteamID and Steam-profile privacy settings!</p>
                    }
                </div>
                <div className='tile is-child is-1'></div>
                <div className='tile is-child is-2'>
                    <p className='buttons'>
                        <button className={updateBtnClass} onClick={(event)=>validateInput(event,1)}>Update</button>
                        <Link className='button is-dark' to={`/userAchievements?steamId=${steamId}&update=0`} onClick={(event)=>validateInput(event,0)}>View</Link>
                    </p>
                </div>
            </div>
            {redirect ? (<Redirect push to={`/userAchievements?steamId=${steamId}&update=1`} />):null}
        </div>
    )
};

export default SteamIdSearchBar;