import React, {useState, useEffect} from 'react';
import socket from '../../socket/Socket';

/* Import styles */
import '../../App.scss';

/* Import components */
import Navbar from '../elements/universal/Navbar';
import Loader from '../elements/universal/Loader';
import AchievementCard from '../elements/cards/AchievementCard';

const GameAchievementList = () =>{

    /* States */
    // State stores an array, every index cointains object which contains achievement data for one appId
    const [achievementArray, setAchievementArray] = useState([]);

    const [loaderVisibility, setLoaderVisibility] = useState('');
    const [contentVisibility, setContentVisibility] = useState('is-hidden');

    // useEffect hook that ensures achievement data will be available every time page is re-rendered
    useEffect(()=>{
        const url = new URL(window.location.href);
        const steamId = url.searchParams.get('steamId');
        const appId = url.searchParams.get('appId');

        socket.emit('getGameAchievements', {
            steamId:steamId,
            appId:appId  // Always triggers view event to prevent spamming update queries to API
        });
    },[])

    /* Socket events */
    socket.on('gameAchievementData',(data)=>{
        setAchievementArray(data.achievementdata.playerstats.achievements);
        // Hide loader when results are ready and show result container
        setLoaderVisibility('is-hidden');
        setContentVisibility('');

    })

    return(
        <div className='container is-max-widescreen'>
            <Navbar />
            <Loader visibility={loaderVisibility}/>
            <div className={contentVisibility}>
                <div className='box' box-radius='large'>
                    {achievementArray.map((achievement)=>{
                        // Define props
                        const data = {
                            name:achievement.schemaData.displayName,
                            apiname:achievement.apiName,
                            description: achievement.schemaData.description,
                            achieved:achievement.achieved,
                            unlocktime:achievement.unlocktime,
                            icon:achievement.schemaData.icon,
                            icongray: achievement.schemaData.icongray
                        }

                        return(
                            <AchievementCard data={data}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

export default GameAchievementList;