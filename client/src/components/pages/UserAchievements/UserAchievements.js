import React, { useState, useEffect } from 'react';

/* Import styles */
import '../../../App.scss';

/* Import components */
import Navbar from '../../elements/universal/Navbar';
import GameInfoCard from '../../elements/cards/GameInfoCard';
import socket from '../../../socket/Socket';

const UserAchievements = () =>{

    // State stores an array, every index cointains object which contains achievement data for one appId
    const [resultArray, setResultArray] = useState([]);

    // useEffect hook that ensures achievement data will be available every time component is re-rendered
    useEffect(()=>{
        let url = new URL(window.location.href);
        let id = url.searchParams.get('steamId');

        socket.emit('searchbarAction', {
            steamId:id,
            doesUpdate:0  // Always triggers view event to prevent spamming update queries to API
        });
    },[])

    // Test object, example of a single game in the resultObject, will be deleted
    let testObject = {
        appId:'35140',
        gameName: 'Batman Arkham Asylum',
        progress: 60,
        achievements:{
            total:10,
            achieved:6
        },
        completed: 1
        
    }

    /* Socket events */
    socket.on('gamelistData',(data)=>{
        setResultArray(data);
    })

    return(
        <div className='container is-max-widescreen'>
            <Navbar />
            <div>
                {/* Visualization graphs implemented here */}
            </div>
            <div className='box' box-radius='large'>
                {resultArray.map((app)=>{
                    const propsObj = {
                        appId:app.appID,
                        gameName:app.achievementdata.playerstats.gameName,
                        progress: app.progress.percentage,
                        achievements:{
                            total:app.achievementdata.playerstats.achievements.length,
                            achieved:app.progress.achievedCount
                        },
                        completed: 1
                    };

                    return(
                    <GameInfoCard data={propsObj}/>
                    )
                })}
            </div>
        </div>
    )
};

export default UserAchievements;