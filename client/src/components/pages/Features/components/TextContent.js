import React from 'react';

// Import styles
import '../../../../App.scss';

const TextContent = () =>{
    return(
        <div className='content'>
            <div className='tile is-parent'>
                <div className='tile is-child is-vertical'>
                    <div className='tile is-child'>
                        <h4 className='title is-4 mb-2'><i class="fas fa-code-branch mr-1"/>Begin tracking</h4>
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
                    </div>
                    <div className='tile is-child'>
                        <h4 className='title is-4 mb-2'><i className="fas fa-cloud-download-alt mr-1"/>Update</h4>
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
                        <p>Update on the individual game cards can be used to update specific game's achievement data, once you're viewing your achievement collection.
                        </p>
                        <br/>
                    </div>
                    <div className='tile is-child'>
                        <h4 className='title is-4 mb-2'><i className="fas fa-eye mr-1"/>View</h4>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextContent;