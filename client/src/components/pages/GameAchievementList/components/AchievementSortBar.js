import React, {useState} from 'react';

// Import styles
import '../../../../App.scss';

const AchievementSortBar = (props) =>{

    const [rarityAscending, setRarityAscending] = useState(false);
    const [unlockAscending, setUnlockAscending] = useState(false);

    /* Functions */
    function sortRarity(array, setter){
        setRarityAscending(!rarityAscending);
        if(rarityAscending){
            const sorted = array.sort((a,b)=>b.rarity - a.rarity);
            setter([...sorted])
        }
        else{
            const sorted = array.sort((a,b)=>a.rarity - b.rarity);
            setter([...sorted])
        }
        // Reset other sorts
        if(unlockAscending){
            setUnlockAscending(false);
        }
    }
    function sortUnlock(array, setter){
        setUnlockAscending(!unlockAscending)
        if(unlockAscending){
            const sorted = array.sort((a,b)=>a.unlocktime - b.unlocktime);
            setter([...sorted])
        }
        else{
            const sorted = array.sort((a,b)=>b.unlocktime - a.unlocktime);
            setter([...sorted])
        }
        // Reset other sorts
        if(rarityAscending){
            setRarityAscending(false);
        }
    }

    return(
        <div className='columns is-mobile is-vcentered mb-1'>
            <div className='column is-1'/>
            <div className='column'>
                <h4 className='subtitle is-5'>Sort:</h4>
            </div>
            <div className='column is-4'>
                <button className='button is-ghost mr-1' onClick={()=> sortRarity(props.data, props.setter)}>Rarity<i className='fas fa-sort ml-1'/></button>
                <button className='button is-ghost mr-1' onClick={()=> sortUnlock(props.data, props.setter)}>Unlock time<i className='fas fa-sort ml-1'/></button>
            </div>
        </div>
    )
}

export default AchievementSortBar;