import React from 'react';

const Rules = ({close,display}) => {



    return (
        <div style={{display : display}} className='rules'>
            <img onClick={close} src="./Dice-Game-Website/Close.png" alt="" />
            <h1>Game rules</h1>
            <p>A face number will be chosen randomly, your goal is to get that face number in the dice with the least number of attempts</p>
        </div>
    );
}

export default Rules;
