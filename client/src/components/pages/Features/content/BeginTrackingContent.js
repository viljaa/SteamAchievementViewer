import React from 'react';

// Import styles
import '../../../../App.scss';

const BeginTrackingContent = () =>{
    return(
        <>
            <p>
                Arch utilizes Steam Web API to compile your achievementdata into a single viewable collection. To make the service efficient, Arch uses its own database
                to cut down on redundant API requests and fetching multiple instances of the same data. This is why first time users have to be first setup into the database before
                they can start using Arch.
            </p>
            <br/>
            <p className='subtitle'>So how do you setup your Steam account to Arch?</p>
            <p>
                As a first time user you have to enter your SteamID to the input on the homepage and press "Update" to add your account to the database.
                Arch uses your account's 64-bit SteamID to identify and track your public achievement data. Arch was designed to work at as low treshold as possible without the user having to sign up 
                for the service. On the flip side it can only access your public data, which is why your Steam account's profile has to be set as public in order for Arch to work. 
            </p>
            <br/>
            <p className='subtitle'>How to get you SteamID</p>
            <p>There are two easy ways to get your SteamID. You can either:</p>
            <ul>
                <li>Use <a href='https://steamidfinder.com/'target="_blank">SteamID Finder</a> to search for your SteamID (recommended)</li>
                <li>Get your ID from your Steam profile's official URL (doesn't show ID if custom URL is enabled)</li>
            </ul>
            <br/>
        </>
    )
}

export default BeginTrackingContent;