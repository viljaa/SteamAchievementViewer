import React from 'react';

// Styles
import './AchievementCard.css';

// Import components
import AchievementIcon from '../universal/AchievementIcon';

const AchievementCard = (props) =>{

    /* Variables */
    const time = convertTime(props.data.unlocktime);

    // Function to convert unlocktime to date from unix timestamp
    function convertTime(unlocktime){
        const dateObj = new Date(unlocktime*1000);

        const formattedDate = {
            month:dateObj.toLocaleString('en-us',{month:'long'}),
            day: dateObj.toLocaleString('en-us',{day:'numeric'}),
            year: dateObj.toLocaleString('en-us',{year:'numeric'}),
            time: dateObj.toLocaleTimeString('en-us', {hour:'numeric',minute:'numeric'})
        }
        return formattedDate;

    }

    return(
        <div className='box'>
                <div className='tile is-parent'>
                    <div className='tile is-2 is-child'>
                        <div className='tile is-vertical is-parent'>
                            <div className='tile is-child'>
                                <div className='tile is-vertical is-parent'>
                                    <AchievementIcon data={{achieved:props.data.achieved,icon:props.data.icon,icongray:props.data.icongray}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tile is-5 is-child'>
                        <div className='tile is-vertical is-parent'>
                            <div className='tile is-child'>
                                <h4 className='title is-4'>{props.data.name}</h4>
                            </div>
                            <div className='tile is-child'>
                                <p className='achievementDescription'>{props.data.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='tile is-3 is-child'/>
                    <div className='tile is-2 is-child'>
                        <div className='tile is-vertical is-parent'>
                            <div className='tile is-child'>
                                {props.data.achieved===1 &&
                                    <div>
                                        <h4 className='title is-6'>{time.month} {time.day}. {time.year}</h4>
                                        <h4 className='title is-6'>{time.time}</h4>
                                    </div>
                                }
                                {props.data.achieved===0 &&
                                    <h4 className='title is-6'>-----</h4>
                                }
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
};

export default AchievementCard;