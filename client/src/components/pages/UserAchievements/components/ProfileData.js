import React from 'react';

//Styles
import '../../../../App.scss';

//Components
import DoughnutChart from './DoughnutChart';

const ProfileData = (props) =>{
    
    /* Variables */
    const progressArray = props.progressArray;

    /* Functions */
    const formatDate = (unixStamp) =>{
        const date = new Date(unixStamp*1000)
        const formattedDate = (`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`);  //data.getMonth() returns value between 0-11, so plus 1 to get numeric date correctly
        return formattedDate;
    }

    return(
        <div className='mb-1'>
            <div className='tile is-parent'>
                <div className='tile is-child is-1'/>
                <div className='tile is-child'>
                    <h3 className='title is-3'>{props.profiledata.personaname}'s achievements</h3>
                    <div className='block' />
                </div>
            </div>
            <div className='tile is-parent'>
                <div className='tile is-child is-1'/>
                <div className='tile is-child is-6'>
                    <div className='image is-128x128' src>
                        <img className='is-rounded' src={props.profiledata.avatarfull}/>
                    </div>
                    <div className='block' />
                    <p className='heading'><b>Steam ID: </b>{props.profiledata.steamid}</p>
                    <p className='heading'><b>Profile URL: </b><a href={props.profiledata.profileurl}>{props.profiledata.profileurl}</a></p>
                    <p className='heading'><b>Joined Steam: </b>{formatDate(props.profiledata.timecreated)}</p>
                    <div className='block' />
                    <div className='block' />
                </div>
                <div className='tile is-child is-4 has-text-centered'>
                    <h4 className='title is-6'>Games by completion percentages</h4>
                    <div className='block' />
                    <DoughnutChart data={progressArray} />
                </div>
            </div>
        </div>
    )
}

export default ProfileData;