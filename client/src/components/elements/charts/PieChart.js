import React, {useState,useEffect} from 'react';
import Chart from 'chart.js';

const PieChart = (props) =>{

    // States
    const [chart,setChart] = useState(null);

    const lockedAchievements = props.data.totalCount - props.data.achievedCount;
    const dataSet = [props.data.achievedCount,lockedAchievements];
    const labels = ['Achieved','Locked'];

    // Variables
    const ctx = 'piechart';

    useEffect(()=>{
        setChart(new Chart(ctx,{
            type:'pie',
            data:{
                labels:labels,
                datasets:[{
                    data:dataSet,
                    backgroundColor:['#4a4a4a', '#e0e0e0'],
                    hoverBackgroundColor:['#363636', '#cfcfcf']
                }]
            },
            options: {
                responsive:true,
                animation:{
                    animateRotate:true
                }
            }
    
        }))
    },[])
    

    return(
        <div>
            <canvas id='piechart' />
        </div>
    )
}

export default PieChart