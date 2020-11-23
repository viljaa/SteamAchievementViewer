import React, {useState,useEffect} from 'react';
import Chart from 'chart.js';

const GameLineChart = (props) =>{

    /* States */
    const [dataset,setDataset] = useState([]);
    const [labels,setLabels] = useState([]);

    /* Variables */
    const ctx = 'linechart';

    new Chart(ctx,{
        type:'line',
        data:{
            labels:labels,
            datasets:[{
                data:dataset,
                label:'Achievement Progress By Dates',
                fill:false,
                pointRadius: 5,
                pointHitRadius: 10,
            }]
        },
        options: {
            responsive:true,
        }

    })

    useEffect(()=>{
        const stampArray = getUnixStamps(props.data);
        createDatasets(stampArray);
    },[])

    /* Functions */
    // Function that makes array of achieved achievements unlock timestamps
    function getUnixStamps(array){
        let stamps=[];
        array.forEach((achievement)=>{
            const stamp = achievement.unlocktime;
            if(stamp>0){
                stamps.push(achievement.unlocktime)
            }
        })
        return stamps;
    }

    function createDatasets(unixArray){
        // Sort array to chronological order
        unixArray.sort((a,b)=>{
            return a-b;
        });
        // Convert unix stamps to date string array. Index example: YYYY-MM-DD
        const dateArray = unixArray.map((unix)=> {
            const date = new Date(unix*1000)
            const converted = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
            return converted;
        });
        // Count amounts for each date
        let count = {};
        dateArray.forEach((i)=>{count[i] = (count[i]||0)+1;})
        // Create array of date strings and array for containing amounts for each date-string
        const keys = Object.keys(count);
        const amountDataset = keys.map((date)=>{
            let countPerDay = count[date];
            return countPerDay;
        }); 
        // Create dataset array for total achievement count trend
        let sumOfIndexesSoFar = 0;
        const sumArray = amountDataset.map((i)=>{
            return sumOfIndexesSoFar+=i;
        });
        // Set states
        setDataset(sumArray);
        setLabels(keys);
    }

    return(
        <div>
            <canvas id='linechart' />
        </div>
    )

}

export default GameLineChart