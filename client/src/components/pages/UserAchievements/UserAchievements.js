import React, { useState, useEffect } from 'react';

/* Import styles */
import '../../../App.scss';

/* Import components */
import Navbar from '../../elements/universal/Navbar';
import Loader from '../../elements/universal/Loader';
import DataLevel from '../UserAchievements/components/DataLevel';
import GameInfoCard from '../../elements/cards/GameInfoCard';
import socket from '../../../socket/Socket';

const UserAchievements = () =>{

    /* States */
    // State stores an array, every index cointains object which contains achievement data for one appId
    const [resultArray, setResultArray] = useState([]);
    
    const [loaderVisibility, setLoaderVisibility] = useState('');
    const [contentVisibility, setContentVisibility] = useState('is-hidden');

    // useEffect hook that ensures achievement data will be available every time component is re-rendered
    useEffect(()=>{
        let url = new URL(window.location.href);
        let id = url.searchParams.get('steamId');

        socket.emit('searchbarAction', {
            steamId:id,
            doesUpdate:0  // Always triggers view event to prevent spamming update queries to API
        });
    },[])

    /* Socket events */
    socket.on('gamelistData',(data)=>{
        setResultArray(data);
        // Hide loader when results arrive, render content visible
        setLoaderVisibility('is-hidden');
        setContentVisibility('');
    })

    return(
        <div className='container is-max-widescreen'>
            <Navbar />
            <div>
                {/* Visualization graphs implemented here */}
            </div>
            <Loader visibility={loaderVisibility}/>
            <div className={contentVisibility}>
                <DataLevel data={{array:resultArray}} />
                <div className='box' box-radius='large'>
                    {resultArray.map((app)=>{
                            // Define propsObj
                            const propsObj = {
                                appId:app.appID,
                                gameName:app.achievementdata.playerstats.gameName,
                                progress: app.progress.percentage,
                                achievements:{
                                    total:app.achievementdata.playerstats.achievements.length,
                                    achieved:app.progress.achievedCount
                                }
                            };
                            //Dynamically create a new GameInfoCard -component
                            return(
                            <GameInfoCard data={propsObj}/>
                            )
                        })}
                </div>
            </div>
        </div>
    )
};

export default UserAchievements;