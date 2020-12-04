import React from 'react';

// Import styles
import '../../../../App.scss';

const UpdateContent = () =>{
    return(
        <>
            <p>
                Update is used to fetch your Steam account's latest achievement data into the Arch database. Update functionalities are found on the homepage
                and on every game card when viewing your achievement collection, and they work differently.
            </p>
            <br/>
            <p className='subtitle'>Update on the homepage</p>
            <p>
                Update functionality on the homepage is used to update every game in your achievement collection. It also executes the first time setup for new Arch users automatically
                on the first time a new SteamID is entered. After using Update on the homepage for the first time, you're able to view your Steam achievements as a collection by using View.
                Arch doesn't automatically update your achievement data, it is up to the user to manually use Update to get the latest data once new achievements are gained.
                If you have gained new achievements only in a single game, it is recommended to update only that game by using Update on the game card once viewing the collection.
            </p>
            <p>After using Update on the homepage, the app will then automatically open the collection view once updates are ready.</p>
            <br/>
            <p className='subtitle'>Update on game cards</p>
            <p>
                Update on the individual game cards can be used to update specific game's achievement data, once you're viewing your achievement collection.
            </p>
            <br/>
        </>
    )
}

export default UpdateContent;