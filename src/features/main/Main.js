import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Main.module.css';
import {
    selectPulse,
    selectValue,
  } from './mainSlice';
  import { selectUserName} from '../login/userSlice';
  import { selectUserId} from '../login/userSlice'; 
  import firebase from 'firebase';
var myVar;
var newValue;
const Main = () => {
    clearTimeout(myVar);
    const count = useSelector(selectValue);
    console.log(selectValue);
    const uName = useSelector(selectUserName);
    const pulse = useSelector(selectPulse);
    const dispatch = useDispatch();
   const split = uName.split(" ");
   const name = split[0]; 
          //()=> {myVar = setTimeout(() => {dispatch(increment(newValue))}, 5000)}
    
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
            <div>
              <p>
                <span className={styles.pulseValue}>{pulse}</span>
                <span className={styles.calorieValue}> 2300</span>
              </p>
            </div>
             <div>
             <button 
            className={styles.pulse}
            >Pulse</button>
            <button 
            className={styles.calories}
            > Calories</button>
             </div>
            </div>
            <div>

            </div>
        </div>
    )
};

export default Main;
