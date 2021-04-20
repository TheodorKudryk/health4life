import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Main.module.css';

const Main = () => {

    return(
        <div className={styles.body}>
            <div className={styles.row}>
            <span className={styles.value}>This is main</span>
            </div>
            <div>
            <button 
            className={styles.steps}
            > Steps</button>
            <button 
            className={styles.pulse}
            >Pulse</button>
            <button 
            className={styles.calories}
            > Calories</button>
            </div>
        </div>
    )
};

export default Main;
