import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import socket from '../../../socket/Socket.js';

/* Import styles */
import '../../../App.scss';

const GameInfoCard = (props) =>{

    /* Variables */
    const cardImg_url = `https://steamcdn-a.akamaihd.net/steam/apps/${props.data.appId}/capsule_184x69.jpg`
    const totalAchievements = props.data.achievements.total;

    const [progress, setProgress] = useState(props.data.progress);
    const [achievements, setAchievements] = useState(props.data.achievements.achieved);

    /* Functions */
    function updateOneGame(appId){
        // Get steamId from url
        let url = new URL(window.location.href);
        let steamId = url.searchParams.get('steamId');

        console.log(steamId + '---' + appId);

        socket.emit('updateOneGame',{
            steamId: steamId,
            appId: appId
        })
    }

    return(
        <div className='box' box-radius='large'>
            <div className='tile is-parent'>
                <div className='tile is-child is-2'>
                    <img src={cardImg_url} alt='game_image'></img>
                </div>
                <div className='tile is-child is-1'/>
                <div className='tile is-child is-4'>
                    <h3 className='title is-5'>{props.data.gameName}</h3>
                </div>
                <div className='tile is-child is-1'/>
                <div className='tile is-child is-3'>
                    <div className='tile is-vertical is-parent'>
                        <div className='tile is-child'>
                            <progress className='progress' value={progress} max='100'>{progress}%</progress>
                        </div>
                        <div className='tile is-child'>
                            <p>Achievements: {achievements}/{totalAchievements}</p>
                        </div>
                    </div>
                </div>
                <div className='tile is-child is-1'>
                    <button className='button is-dark' onClick={()=>updateOneGame(props.data.appId)}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default GameInfoCard;