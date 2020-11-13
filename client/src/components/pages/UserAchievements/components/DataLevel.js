import React from 'react';

//Styles
import '../../../../App.scss'

const DataLevel = (props) =>{

    // Variables
    const array = props.data.array;

    /* Functions */

    //Function for counting total achievements
    function countTotal(array){
        let sum  = 0;
        array.forEach((app)=>{
            sum += app.progress.achievedCount;
        })

        return sum.toString();
    }
    //Function for counting total amount of completed games
    function countCompleted(array){
        let sum = 0;
        array.forEach((app)=>{
            if(app.progress.isCompleted == true){
                sum++;
            }
        })
        return sum.toString();
    }
    //Function for counting average game completion
    function countAvgCompletion(array){
        let sum = 0;
        array.forEach((app)=>{
            sum += app.progress.percentage;
        })

        return Math.round(sum/array.length);
        
    }

    return(
        <div className='level'>
            <div className='level-item has-text-centered'>
                <div>
                    <p className='heading'>Games</p>
                    <p className='title'>{array.length}</p>
                </div>
            </div>
            <div className='level-item has-text-centered'>
                <div>
                    <p className='heading'>Achievements</p>
                    <p className='title'>{countTotal(array)}</p>
                </div>
            </div>
            <div className='level-item has-text-centered'>
                <div>
                    <p className='heading'>Average game completion</p>
                    <p className='title'>{countAvgCompletion(array)}%</p>
                </div>
            </div>
            <div className='level-item has-text-centered'>
                <div>
                    <p className='heading'>Completed games</p>
                    <p className='title'>{countCompleted(array)}</p>
                </div>
            </div>
        </div>
    )
}

export default DataLevel;