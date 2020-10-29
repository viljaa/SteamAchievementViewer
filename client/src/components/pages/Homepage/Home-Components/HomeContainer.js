import React from 'react';
import {Link} from 'react-router-dom';
//import socket from '../../../../socket/Socket.js';

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
                            <p className='title is-3'>How it works:</p>
                            <p className='defaultText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam. Suspendisse varius ligula in molestie lacinia. Maecenas varius eget ligula a sagittis. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Aenean vitae gravida diam, finibus dignissim turpis. Sed eget varius ligula, at volutpat tortor.</p>
                        </div>
                        <div className='tile is-child is-1' />
                        <div className='tile is-child is-5'>
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default HomeContainer;