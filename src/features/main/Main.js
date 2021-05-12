import React from 'react';
import { useSelector} from 'react-redux';
import styles from './Main.module.css';
import {
    selectPulse,
    selectValue
  } from './mainSlice';
  import { selectUserName} from '../login/loginSlice';
  import './Popup.css'
var myVar;

const Main = () => {
    clearTimeout(myVar);
    const count = useSelector(selectValue);
    const uName = useSelector(selectUserName);
    const pulse = useSelector(selectPulse);
    const split = uName.split(" ");
    const name = split[0]; 

    return(
        <div className={styles.body}> 
            <div className={styles.overlay}>
                <div className={styles.value}>   
                    Welcome back, {name.charAt(0).toUpperCase()}{name.slice(1)}! 
                </div>
            <div className={styles.stepText}>Today's steps</div>
            <div>
                <div className={styles.stepValue}>{count}</div>
                <div>
                    <button 
                        className={styles.steps}
                        aria-label="Increment value"
                        >Steps
                    </button></div>  
            <div>
              <p>
                <span className={styles.pulseValue}>{pulse}</span>
                <span className={styles.calorieValue}> {parseFloat(count)*0.04}</span>
              </p>
            </div>
            <div>
                <button 
                    className={styles.pulse}
                    >Pulse
                </button>
                <button
                    className={styles.calories}
                    >Calories burned
                </button>
            </div>
            </div>
            </div>
       </div>

    )
};

export default Main;
