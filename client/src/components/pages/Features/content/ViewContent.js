import React from 'react';

// Import styles
import '../../../../App.scss';

const ViewContent = () =>{
    return(
        <>
            <p>View is just as simple as it sounds, it let's you to view your Steam achievements as a single collection. View can be used after
                the first time a SteamID has been updated to the database.
            </p>
            <br/>
            <p className='subtitle'>Game collection</p>
            <p>
                View opens a view of the game collection belonging to the entered SteamID. The collection contains brief bio of the Steam profile that's viewed, some visualisation of general stats
                of the profile's achievement data and a list of game cards. One game card represents a single title in the users game library which has achievements. Game 
                cards can be sorted with the options found in the Sort-bar above the cards.
            </p>
            <br/>
            <p className='subtitle'>Achievement list</p>
            <p>Achievement list is a visual view of the achievements in a single game. It can be accessed through game cards in the game collection. Achievement list
                contains visualisation of the achievement data in the game and shows the user's achievement progress in the game. Achievements can be sorted differently
                with the options fount in the Sort-bar above the achievements.
            </p>
        </>
    )
}

export default ViewContent;