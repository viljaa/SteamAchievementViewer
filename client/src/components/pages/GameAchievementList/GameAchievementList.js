import React, {useState, useEffect} from 'react';
import socket from '../../../socket/Socket';

/* Import styles */
import '../../../App.scss';
import './GameAchievementList.css'

/* Import components */
import Navbar from '../../elements/universal/Navbar';
import Loader from '../../elements/universal/Loader';
import PieChart from '../../elements/charts/PieChart';
import GameLineChart from './components/GameLineChart';
import RarityDataLevel from './components/RarityDataLevel';
import AchievementCard from '../../elements/cards/AchievementCard';

const GameAchievementList = () =>{

    /* States */
    const [gameName,setGameName] = useState('');
    const [achievementArray, setAchievementArray] = useState([]);
    const [progressData, setProgressData] = useState(null)

    // Visibility states
    const [loaderVisibility, setLoaderVisibility] = useState('');
    const [contentVisibility, setContentVisibility] = useState('is-hidden');

    // useEffect hook that ensures achievement data will be available every time page is re-rendered
    useEffect(()=>{
        const url = new URL(window.location.href);
        const steamId = url.searchParams.get('steamId');
        const appId = url.searchParams.get('appId');

        socket.emit('getGameAchievements', {
            steamId:steamId,
            appId:appId
        });
    },[])

    /* Socket events */
    socket.on('gameAchievementData',(data)=>{
        // Achievement array extracted for mapping
        setAchievementArray(data.achievementdata.playerstats.achievements);

        setGameName(data.achievementdata.playerstats.gameName);
        setProgressData(data.progress);

        // Hide loader when results are ready and show result container
        setLoaderVisibility('is-hidden');
        setContentVisibility('');

    })

    return(
        <div className='container is-max-widescreen'>
            <Navbar />
            <Loader visibility={loaderVisibility}/>
            <div className={contentVisibility}>
                <div className='block' />
                <div className='tile is-parent'>
                    <div className='tile is-child is-1'/>
                    <div className='tile is-child'>
                        <h3 className='title is-3'>{gameName}</h3>
                        <div className='block' />
                    </div>
                </div>
                {contentVisibility === '' &&
                    <div>
                        <div className='tile is-parent'>
                            <div className='tile is-vertical is-5'>
                                <div className='tile is-child'>
                                    <PieChart data={progressData}/>
                                </div>
                                <div className='tile is-child'>
                                <RarityDataLevel data={achievementArray}/>
                                </div>
                            </div>
                            <div className='tile is-child is-7'>
                                <GameLineChart data={achievementArray} />
                            </div>
                        </div>
                        <div className='block' />
                        <div class="progress-wrapper">
                            <progress className='progress is-large mt-1 mb-1' value={progressData.percentage} max='100'></progress>
                            {progressData.percentage >= 50 &&
                                <p class="progress-value has-text-white">{progressData.percentage}%</p>
                            }
                            {progressData.percentage < 50 &&
                                <p class="progress-value">{progressData.percentage}%</p>
                            }
                        </div>
                    </div>
                }
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
                            icongray: achievement.schemaData.icongray,
                            rarity: achievement.rarity
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