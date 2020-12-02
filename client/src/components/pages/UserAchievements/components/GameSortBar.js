import React, {useState} from 'react';

// Import styles
import '../../../../App.scss';

const SortBar = (props) =>{

    const [titleAscending, setTitleAscending] = useState(false);
    const [progressAscending, setProgressAscending] = useState(false);

   /* Functions */
    function sortTitle(array, setter){
        // Reset progress sort
        if(progressAscending){
            setProgressAscending(false)
        }
        // Begin new sort
        setTitleAscending(!titleAscending);
        if(titleAscending){
            const sorted = array.sort((a,b) => a.achievementdata.playerstats.gameName.toLowerCase().localeCompare(b.achievementdata.playerstats.gameName.toLowerCase()));
            setter([...sorted]);
        }
        else{
            const sorted = array.sort((a,b) => b.achievementdata.playerstats.gameName.toLowerCase().localeCompare(a.achievementdata.playerstats.gameName.toLowerCase()));
            setter([...sorted]);
        }
    }
    function sortProgress(array, setter){
        //Reset previous title sorts to ensure alphabetical subsort when sorting with progress
        if(titleAscending){
            sortTitle(array,setter);
        }
        setProgressAscending(!progressAscending);
        if(progressAscending){
            const sorted = array.sort((a,b)=>a.progress.percentage - b.progress.percentage);
            setter([...sorted]);
        }
        else{
            const sorted = array.sort((a,b)=>b.progress.percentage - a.progress.percentage);
            setter([...sorted]);
        }
        setTitleAscending(true) // Set state true to get an ascending view when swithing from progress sort to title sort
    }

    return(
        <div className='columns is-mobile is-vcentered'>
            <div className='column is-1'/>
            <div className='column'>
                <h4 className='subtitle is-5'>Sort:</h4>
            </div>
            <div className='column is-3'>
                <button className='button is-ghost mr-1' onClick={()=>sortTitle(props.data,props.setter)}>Title<i className='fas fa-sort ml-1'/></button>
                <button className='button is-ghost mr-1'onClick={()=>sortProgress(props.data,props.setter)}>Progress<i className='fas fa-sort ml-1'/></button>
            </div>
            <div className='column is-1'/>
        </div>
    )
}

export default SortBar;