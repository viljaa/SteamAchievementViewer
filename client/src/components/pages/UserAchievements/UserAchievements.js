import React, { useState, useEffect } from 'react';
import socket from '../../../socket/Socket';

/* Import styles */
import '../../../App.scss';

/* Import components */
import Navbar from '../../elements/universal/Navbar';
import Loader from '../../elements/universal/Loader';
import ProfileData from './components/ProfileData';
import DataLevel from './components/DataLevel';
import GameCardSearchBar from './components/GameCardSearchBar';
import GameSortBar from './components/GameSortBar';
import GameInfoCard from '../../elements/cards/GameInfoCard';

const UserAchievements = () =>{
    /* States */

    // State stores an array, every index cointains object which contains achievement data for one appId.
    // Is used for reference as the original array when games are sorted by user search input.
    const [resultArray, setResultArray] = useState([]);
    // State for storing array that is used for mapping results for user to view. Is sorted out of result array by user input.
    const [viewArray,setViewArray]= useState([]);

    const [userProfileData, setUserProfileData] = useState([]);
    
    const [loaderVisibility, setLoaderVisibility] = useState('');
    const [contentVisibility, setContentVisibility] = useState('is-hidden');

    useEffect(()=>{
        const url = new URL(window.location.href);
        const id = url.searchParams.get('steamId');
        
        socket.emit('searchbarAction', {
            steamId:id,
            doesUpdate:0  // Always triggers view event to prevent spamming update queries to API
        });
        socket.emit('getUserProfile',{steamId:id});
    },[])

    /* Socket events */
    socket.on('gamelistData',(data)=>{
        setResultArray(data);
        setViewArray(data);
        // Hide loader when results arrive, render content visible
        setLoaderVisibility('is-hidden');
        setContentVisibility('');
        
    })
    socket.off('userProfileData').on('userProfileData', (data)=>{
        setUserProfileData(data);
    })
    socket.off('updateDataLevel').on('updateDataLevel',(data)=>{
        setResultArray([...data]);
    })

    /* Functions */
    function createProgressArray(resultArray){
        return resultArray.map((app)=>app.progress.percentage);
    }

    return(
        <div className='container is-max-widescreen'>
            <Navbar />
            <Loader visibility={loaderVisibility}/>
            <div className={contentVisibility}>
                {contentVisibility === '' &&
                    <ProfileData profiledata={userProfileData} progressArray={createProgressArray(resultArray)}/>
                }
                <DataLevel data={{array:resultArray}} />
                <hr className='hr'/>
                <GameSortBar setter={setViewArray} data={viewArray}/>
                <GameCardSearchBar setter={setViewArray} data={resultArray}/>
                <div className='box' box-radius='large'>
                    {viewArray.map((app)=>{
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