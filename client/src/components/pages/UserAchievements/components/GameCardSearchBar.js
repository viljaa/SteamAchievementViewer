import React from 'react';

// Styles
import '../../../../App.scss';

const GameCardSearchBar = (props) =>{
    /* Initialize variables */
    const gamedataArray = props.data;

    /* Functions */
    // Function for handling input aciton, sorts array to return results matching to search
    function inputAction(input,array){
        const sorted = array.filter(game => game.achievementdata.playerstats.gameName.toLowerCase().indexOf(input.toLowerCase()) !== -1);
        props.setter([...sorted]);
    }

    return(
        <div className='tile is-parent'>
            <div className='tile is-child is-1'/>
            <div className='tile is-child'>
                <input className='input mb-1' type='text' placeholder='Search for a game...' onChange={
                    (event) => inputAction(event.target.value, gamedataArray)
                }/>
            </div>
            <div className='tile is-child is-1'/>
        </div>
    )
}

export default GameCardSearchBar;