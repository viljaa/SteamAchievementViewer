import React from 'react';

//Styles
import '../../../../App.scss'

const RarityDataLevel =  (props) =>{

    const rarity = getRarityAmounts(props.data);

    function defineRarityClass(rarity){
        let rarityClass;
        switch(true){
            case (rarity <= 5):
                rarityClass='ultrarare'
                break;
            case (rarity <=10):
                rarityClass='veryrare'
                break;
            case (rarity <=20):
                rarityClass='rare'
                break;
            case (rarity <=50):
                rarityClass='uncommon'
                break;
            case (rarity <=100):
                rarityClass='common'
                break;
        }
        return rarityClass;
    }

    function getRarityAmounts(array){
        let rarityArray = []
        array.forEach((achievement) => {
            if(achievement.achieved===1){
                rarityArray.push(defineRarityClass(achievement.rarity));
            }
        });
        // Count amounts for each rarity class
        let count = {};
        rarityArray.forEach((i)=>{count[i] = (count[i]||0)+1;})
        // Create arrays for rarity classes and rarity amounts
        const keys = Object.keys(count);
        const rarityAmounts = keys.map((rarity)=>{
            let countPerRarity = count[rarity];
            return countPerRarity;
        });
        // Merge the two to create object containing each rarity class and amount
        const resultObject = {}
        keys.forEach((key, index)=>{
            resultObject[key] = rarityAmounts[index];
        })
        return resultObject;
    }

    function validateValue(value){
        if(value === undefined){
            return 0;
        } else{
            return value;
        }
    }

    return(
        <div className='tile is-parent'>
            <div className='tile is-child is-1'/>
            <div className='tile is-child is-10'>
                <div className='level mt-1 mb-1'>
                    <div className='level-item has-text-centered'>
                        <div>
                            <p className='heading'>Common</p>
                            <p className='subtitle'>{validateValue(rarity.common)}</p>
                        </div>
                    </div>
                    <div className='level-item has-text-centered'>
                        <div>
                            <p className='heading'>Uncommon</p>
                            <p className='subtitle'>{validateValue(rarity.uncommon)}</p>
                        </div>
                    </div>
                    <div className='level-item has-text-centered'>
                        <div>
                            <p className='heading'>Rare</p>
                            <p className='subtitle'>{validateValue(rarity.rare)}</p>
                        </div>
                    </div>
                    <div className='level-item has-text-centered'>
                        <div>
                            <p className='heading'>Very Rare</p>
                            <p className='subtitle'>{validateValue(rarity.veryrare)}</p>
                        </div>
                    </div>
                    <div className='level-item has-text-centered'>
                        <div>
                            <p className='heading'>Ultra Rare</p>
                            <p className='subtitle'>{validateValue(rarity.ultrarare)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='tile is-child is-1'/>
        </div>
    )
}

export default RarityDataLevel;