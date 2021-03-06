import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import socket from '../../../socket/Socket.js';

/* Import styles */
import '../../../App.scss';

const GameInfoCard = (props) =>{

    /* Variables */
    const cardImg_url = `https://steamcdn-a.akamaihd.net/steam/apps/${props.data.appId}/capsule_184x69.jpg`
    const totalAchievements = props.data.achievements.total;
    const achievements = props.data.achievements.achieved;
    const progress = props.data.progress;

    // Get steamId from url
    const url = new URL(window.location.href);
    const steamId = url.searchParams.get('steamId');

    /* States */
    const [buttonClass, setButtonClass] = useState('button is-dark');

    /* Functions */
    function updateOneGame(appId, steamId){
        setButtonClass('button is-dark is-loading');
        socket.emit('updateOneGame',{
            steamId: steamId,
            appId: [appId]
        })
    }
    function getGameAchievemets(appId, steamId){
        socket.emit('getGameAchievements',{appId,steamId});
    }

    /* Socket events */
    socket.off('oneGameUpdated').on('oneGameUpdated',()=>{
        setTimeout(()=>{
            setButtonClass('button is-dark');
            socket.emit('refreshUserAchievements',{steamId:steamId});
        },1000)
    })

    return(
        <div className='box' box-radius='large'>
            <div className='tile is-parent'>
                <div className='tile is-child is-2'>
                    <div className='tile is-vertical is-parent'>
                        <div className='tile is-child'>
                            <img src={cardImg_url} alt='game_image'></img>
                        </div>
                    </div>
                </div>
                <div className='tile is-child is-1'/>
                <div className='tile is-child is-4'>
                    <div className='tile is-vertical is-parent'>
                        <div className='tile is-child'>
                            <h3 className='title is-5'>{props.data.gameName}</h3>
                        </div>
                        <div className='tile is-child'>
                            <Link className='button is-dark' to={`/gameAchievements?appId=${props.data.appId}&steamId=${steamId}`} onClick={()=>getGameAchievemets(props.data.appId, steamId)}>
                                View achievements
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='tile is-child is-1'/>
                <div className='tile is-child is-3'>
                    <div className='tile is-vertical is-parent'>
                        <div className='tile is-child'>
                            <progress className='progress' value={progress} max='100'>{progress}%</progress>
                        </div>
                        <div className='tile is-child'>
                            <p>Achievements: {achievements}/{totalAchievements}
                            {progress === 100 &&
                                <i className='fas fa-award ml-1'></i>
                            }
                            </p>
                        </div>
                    </div>
                </div>
                <div className='tile is-child is-1'>
                    <div className='tile is-vertical is-parent'>
                        <div className='tile is-child'>
                            <button className={buttonClass} onClick={()=>updateOneGame(props.data.appId, steamId)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameInfoCard;