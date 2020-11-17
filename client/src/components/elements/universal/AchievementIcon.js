import React from 'react';

const AchievementIcon = (props)=>{
    return(
        <div className="image is-64x64">
            {props.data.achieved === 1 &&
                <img src={props.data.icon}/>
            }
            {props.data.achieved === 0 &&
                <img src={props.data.icongray}/>
            }
        </div>
    )
}

export default AchievementIcon;