import React from 'react';

//Styles
import '../../../../App.scss'

const ProfileData = (props) =>{

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
                    <h3 className='title is-3'>{props.data.personaname}'s achievements</h3>
                    <div className='block' />
                </div>
            </div>
            <div className='tile is-parent'>
                <div className='tile is-child is-1'/>
                <div className='tile is-child is-2'>
                    <div className='image is-128x128' src>
                        <img className='is-rounded' src={props.data.avatarfull}/>
                    </div>
                </div>
                <div className='tile is-child is-6'>
                    <div className='block' />
                    <p className='heading'><b>Steam ID: </b>{props.data.steamid}</p>
                    <p className='heading'><b>Profile URL: </b><a href={props.data.profileurl}>{props.data.profileurl}</a></p>
                    <p className='heading'><b>Joined Steam: </b>{formatDate(props.data.timecreated)}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileData;