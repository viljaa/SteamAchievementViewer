import React, {useState,useEffect} from 'react';
import Chart from 'chart.js';

const DoughnutChart = (props) =>{
    // States
    const [chart,setChart] = useState(null);
    // Variables
    const dataSet = makeDataset(props.data);
    const labels = ['1-20%','21-40%','41-60%','61-80%','81-100%'];
    const ctx = 'doughnutchart';

    useEffect(()=>{
        setChart(new Chart(ctx,{
            type:'doughnut',
            data:{
                labels:labels,
                datasets:[{
                    data:dataSet,
                    backgroundColor:['#E0E0E0', '#BFBFBF','#8D8D8D','#6B6B6B','#4A4A4A'],
                    hoverBackgroundColor:['#d4d4d4','#b3b3b3','#808080','#5c5c5c','#363636']
                }]
            },
            options: {
                responsive:true,
                animation:{
                    animateRotate:true
                },
                legend:{
                    position:'right'
                }
            }
    
        }))
    },[])

    function makeDataset(progressArray){
        // Array that stores amounts of games in each percentage group. Group tresholds:[0-20%,21-40%,41-60%,61-80%,81-100%]
        let percentageGroups = [0,0,0,0,0]
        progressArray.forEach((progress)=>{
            // Define in which group game falls into
            switch(true){
                case (progress <=20):
                    percentageGroups[0]+=1;
                    break;
                case (progress <=40):
                    percentageGroups[1]+=1;
                    break;
                case (progress <=60):
                    percentageGroups[2]+=1;
                    break;
                case (progress <=80):
                    percentageGroups[3]+=1;
                    break;
                case (progress <=100):
                    percentageGroups[4]+=1;
                    break;
            }
        })
        return percentageGroups;
    }
    
    return(
        <div>
            <canvas id='doughnutchart' />
        </div>    
    )
}

export default DoughnutChart;