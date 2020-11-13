import React, { useState, useEffect } from 'react';

/* Import styles */
import '../../../App.scss';

/* Import components */
import Navbar from '../../elements/universal/Navbar';
import DataLevel from '../UserAchievements/components/DataLevel';
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
            <DataLevel data={{array:resultArray}} />
            <div className='box' box-radius='large'>
                {resultArray.map((app)=>{
                    /* Define if game is completed
                    let isCompleted = false;
                    if(app.progress.percentage==100){
                        isCompleted = true;
                    }*/
                    
                    // Define propsObj
                    const propsObj = {
                        appId:app.appID,
                        gameName:app.achievementdata.playerstats.gameName,
                        progress: app.progress.percentage,
                        achievements:{
                            total:app.achievementdata.playerstats.achievements.length,
                            achieved:app.progress.achievedCount
                        },
                        //completed:isCompleted
                    };
                    //Dynamically create a new GameInfoCard -component
                    return(
                    <GameInfoCard data={propsObj}/>
                    )
                })}
            </div>
        </div>
    )
};

export default UserAchievements;