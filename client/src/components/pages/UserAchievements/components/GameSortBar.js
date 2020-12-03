import React, {useState} from 'react';

// Import styles
import '../../../../App.scss';

const SortBar = (props) =>{

    const [titleAscending, setTitleAscending] = useState(false);
    const [progressAscending, setProgressAscending] = useState(false);
    const [amountAscending, setAmountAscending] = useState(false);
    const [achievedAscending, setAchievedAscending] = useState(false);

   /* Functions */
    function resetSorts(skip){  // Skip determines which sort is in use so that the state can be skipped and toggled
        if(skip!=1 && titleAscending){
            setTitleAscending(false);
        }
        if(skip!=2 && progressAscending){
            setProgressAscending(false);
        }
        if(skip!=3 && amountAscending){
            setAmountAscending(false);
        }
        if(skip!=4 && achievedAscending){
            setAchievedAscending(false);
        }
    }
    function sortTitle(array, setter){
        // Reset previous sorts
        resetSorts(1);
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
        // Begin new sort
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
    function sortAmount(array, setter){
        // Reset previous sorts
        resetSorts(3);
        // Begin new sort
        setAmountAscending(!amountAscending);
        if(amountAscending){
            const sorted = array.sort((a,b)=>a.achievementdata.playerstats.achievements.length - b.achievementdata.playerstats.achievements.length);
            setter([...sorted]);
        }
        if(amountAscending === false){
            const sorted = array.sort((a,b)=>b.achievementdata.playerstats.achievements.length - a.achievementdata.playerstats.achievements.length);
            setter([...sorted]);
        }
        setTitleAscending(true) // Set state true to get an ascending view when swithing from progress sort to title sort
    }
    function sortAchievedAmount(array, setter){
        // Reset previous sorts
        resetSorts(4);
        //Begin new sort
        setAchievedAscending(!achievedAscending);
        if(achievedAscending){
            const sorted = array.sort((a,b)=>a.progress.achievedCount - b.progress.achievedCount);
            setter([...sorted]);
        }
        if(achievedAscending===false){
            const sorted = array.sort((a,b)=>b.progress.achievedCount - a.progress.achievedCount);
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
            <div className='column is-7'>
                <button className='button is-ghost mr-1' onClick={()=>sortTitle(props.data,props.setter)}>Title<i className='fas fa-sort ml-1'/></button>
                <button className='button is-ghost mr-1'onClick={()=>sortProgress(props.data,props.setter)}>Progress %<i className='fas fa-sort ml-1'/></button>
                <button className='button is-ghost mr-1' onClick={()=>sortAmount(props.data,props.setter)}>Total Amount<i className='fas fa-sort ml-1'/></button>
                <button className='button is-ghost mr-1' onClick={()=>sortAchievedAmount(props.data,props.setter)}>Achieved Amount<i className='fas fa-sort ml-1'/></button>
            </div>
        </div>
    )
}

export default SortBar;