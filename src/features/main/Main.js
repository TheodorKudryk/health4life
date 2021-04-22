import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Main.module.css';
import {
    increment,
    selectCount,
  } from './mainSlice';
  import { selectUserName} from '../login/userSlice';
  import { selectUserId} from '../login/userSlice'; 
  import firebase from 'firebase';
var myVar;

const Main = () => {
    clearTimeout(myVar);
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
     const uName = useSelector(selectUserName);
     const uid = useSelector(selectUserId);
    const split = uName.split(" ");
    const name = split[0]; 
    var current = new Date();
    firebase.database().ref('users/' + uid).push({steps:count, timestamp:current.toLocaleString()});
    myVar = setTimeout(() => {dispatch(increment())}, 1000)
    
    return(
        <div className={styles.body}>
             <div className={styles.value}>   
            Welcome back, {name.charAt(0).toUpperCase()}{name.slice(1)}! 
            </div>
            <div className={styles.stepText}>Today's steps</div>
            <div>
                <div className={styles.stepValue}>{count}</div>
                <div><button 
            className={styles.steps}
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
            > Steps</button></div>
            <button 
            className={styles.pulse}
            >Pulse</button>
            <button 
            className={styles.calories}
            > Calories</button>
            </div>
            <div>

            </div>
        </div>
    )
};

export default Main;
