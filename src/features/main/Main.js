import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Main.module.css';
import {
    increment,
    selectValue,
  } from './mainSlice';
  import { selectUserName} from '../login/userSlice';
  import { selectUserId} from '../login/userSlice'; 
  import firebase from 'firebase';
var myVar;
var newValue;
const Main = () => {
    clearTimeout(myVar);
    console.log(selectValue);
    const uName = useSelector(selectUserName);
    const uid = useSelector(selectUserId);
    const count = useSelector(selectValue);
    const dispatch = useDispatch();
   const split = uName.split(" ");
   const name = split[0]; 
    var current = new Date().toLocaleDateString('zh-Hans-CN');
    firebase.database().ref().child("users/" + uid + "/" + current).once('value',function(snap){
        if (snap){
          newValue= snap.val();
        }
      }).then(()=> {myVar = setTimeout(() => {dispatch(increment(newValue))}, 1000)});
    
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
