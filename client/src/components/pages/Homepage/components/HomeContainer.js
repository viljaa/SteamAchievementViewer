import React from 'react';
import {Link} from 'react-router-dom';

// Styles
import '../../../../App.scss';
import './HomeContainer.css';

// Import components
import SteamIdSearchBar from '../../../elements/universal/SteamIdSearchBar.js'
import TextOverlay from './TextOverlay.js';

const HomeContainer = () =>{
    return(
        <div className='box' box-radius='large'>
            <div id='searchBoxSmallScreen'>
                <SteamIdSearchBar/>
            </div>

            <div className='card'>
                <div className='card-image'>
                    <img src='https://steamuserimages-a.akamaihd.net/ugc/960856720987058879/027108D90926F2FD3B2F2694CBD2EC5DCACEDC93/' className='is-16by9' id='searchBoxImg'/>
                </div>
                
                <div className='is-overlay toned_background'>
                    <div className='card-content is-overlay' id='textOverlaySmallScreen'>
                        <TextOverlay class={'tile is-parent'}/>
                    </div>
                    <div className='card-content is-overlay' id='textOverlay'>
                        <TextOverlay class={'tile is-parent mt-large'}/>
                    </div>
                </div>
                
                <div className='card-content is-overlay mt-larger' id='searchBoxOverlay'>
                    <SteamIdSearchBar id={'toned_box'} title={'toned_box_h4'}/>
                </div>
            </div>

            <div className='block' />

            <div className='tile is-parent'>
                <div className='tile is-child is-2'/>
                <div className='tile is-child is-8 has-text-centered'>
                    <h2 className='title is-2'>Arch - Steam Achievement Viewer</h2>
                    <h5 className='subtitle is-5'>Open source web app for Steam achievement viewing.</h5>
                </div>
                <div className='tile is-child is-2'/>
            </div>


            <section className='section'>
                <div className='tile is-ancestor'>
                    <div className='tile is-parent'>
                        <div className='tile is-child is-6'>
                            <div className='content'>
                                <p className='title is-3'>How to start using Arch:</p>
                                <p>Arch Steam Achievement Viewer utilizes Steam Web API to fetch your public achievement data into our own database.
                                To start tracking your personal Steam achievements with Arch, you need:</p>
                                <div className='ul has-text-weight-bold'>
                                    <li>SteamID64 (e.g. 76561198082257196)</li> 
                                    <li>Steam profile set as public</li>
                                </div>
                                <div className='block' />
                                <p>You can get your SteamId from the public URL of your Steam profile or by using <a href='https://steamidfinder.com/'target="_blank">SteamID Finder</a>.</p>
                                <p className='title is-5 mt-2'>Update or View?</p>
                                <p>Arch saves your personal achievement data and compiles it as a single viewable collection. Update option updates user's achievement data to the DB and
                                    shows the collection after the update is complete. View option just shows the last updated collection. First time users need to perform one Update before they're able
                                    to use View.
                                </p>
                            </div>
                            <Link className='button is-dark' to={'/features'}>Read more</Link>
                        </div>
                        <div className='tile is-child is-1' />
                        <div className='tile is-parent is-vertical is-5'>
                            <div className='section'>
                                <div className='tile is-child'>
                                    <p className='title is-3'>About the project</p>
                                    <div className='buttons'>
                                        <Link className='button is-dark' to={'/features'}>Features</Link>
                                        <a className='button is-dark' href='https://github.com/viljaa/SteamAchievementViewer'>
                                            <span className="icon is-medium">
                                                <i className="fab fa-github"></i>
                                            </span>
                                            <span>Project</span>
                                        </a>
                                    </div>
                                    <p className='subtitle'>Problems using Arch?</p>
                                    <div className='buttons'>
                                        <Link className='button is-dark' to={''}>FAQ</Link>
                                        <a className='button is-dark' href='https://github.com/viljaa/SteamAchievementViewer/issues'>
                                            <span className="icon is-medium">
                                                <i className="fas fa-bug"></i>
                                            </span>
                                            <span>Report issues</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default HomeContainer;