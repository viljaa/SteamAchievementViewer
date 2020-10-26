import React from 'react';

const AchievementBlock = (props) =>{
    return(
        <div className='achievementContainer'>
            <h3 className='achievementName'>{props.data.name}</h3>
            <p className='achievementDescription'>{props.data.description}</p>
            <img className='achievementBlockIcon' src={props.data.iconUrl} alt='Icon'/>
            <img className='achievementStatusIcon' src={props.data.statusIcon} alt='Status icon'/>
            <p className='achievementRarity'>{props.data.Rarity}</p>
        </div>
    )
};

export default AchievementBlock;