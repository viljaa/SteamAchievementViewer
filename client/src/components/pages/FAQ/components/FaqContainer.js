import React from 'react'

// Import styles
import '../../../../App.scss';

const FaqContainer = () =>{
    return(
        <div>
            <div className='box'>
                <h4 className='title is-4 mb-2'>Q: Do I need to login to Arch with Steam account to start using Arch?</h4>
                <p>
                    <strong>A:</strong> No, and you never will. Arch was designed to be available to users without requiring them to login. Arch is meant to be a low threshold service, which is why you only need to know your public 64-bit SteamID to start using Arch.
                </p>
            </div>
            <div className='box'>
                <h4 className='title is-4 mb-2'>Q: What data does Arch save to its database?</h4>
                <p>
                    <strong>A:</strong> Arch saves only public data from the Steam Web API which contains game schemas, public SteamIDs and user achievement data. Arch doesn’t have access to any private user information and cannot/will not store any private user data or other information that isn’t truly relevant for the service.
                </p>
            </div>
            <div className='box'>
                <h4 className='title is-4 mb-2'>Q: Where does Arch get its achievement data from?</h4>
                <p>
                    <strong>A:</strong> Arch uses the official Steam Web API as its only source for users’ achievement data.
                </p>
            </div>
            <div className='box'>
                <h4 className='title is-4 mb-2'>Q: Why doesn’t my SteamID work when I’m trying to view my achievement collection?</h4>
                <p>
                    <strong>A:</strong> If you’re using Arch for the first time, you first need to use the Update feature before you can start using View. Update sets up your account to Arch’s database and allows it to compile a viewable collection for you. If you have already updated your achievement data successfully for the first time and face the issue, please report the issue
                    <a href='https://github.com/viljaa/SteamAchievementViewer/issues'> here</a>.
                </p>
            </div>
            <div className='box'>
                <h4 className='title is-4 mb-2'>Q: I found an issue while using Arch. How can I report the issue?</h4>
                <p>
                    <strong>A:</strong> You can report all found issues <a href='https://github.com/viljaa/SteamAchievementViewer/issues'>here</a> in the project’s GitHub repository.
                </p>
            </div>
            <div className='box'>
                <h4 className='title is-4 mb-2'>Q: I have a great development idea for Arch. Is there a way to submit my idea?</h4>
                <p>
                    <strong>A:</strong> Arch is an open source project and great ideas are appreciated! You can contribute to the project by creating a pull request on the project’s 
                    <a href='https://github.com/viljaa/SteamAchievementViewer/pulls'> GitHub repository</a>. All pull requests are reviewed and considered to be added into the final project if they are found fitting for Arch.
                </p>
            </div>
            <div className='box'>
                <h4 className='title is-4 mb-2'>Q: My achievement total in the Arch collection doesn’t match the total in my Steam profile’s achievement showcase. How does Arch calculate total achievements for the user?</h4>
                <p>
                    <strong>A:</strong> Arch compiles the achievement collection based on the data provided by the Steam Web API, which means it’s only able to get the data that Steam provides. If a game has been deleted from the Steam store, for some reason Steam API doesn’t return that title in the owned games for the user, and Arch isn’t able to calculate those games into the achievement total. Some mods which are based on other games and provide achievements, such as Enderal: Forgotten Stories, also fall under the same problem. We are currently searching for a work around for the issue.
                </p>
            </div>
        </div>
    )
}

export default FaqContainer;