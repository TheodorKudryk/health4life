import React, {useState} from 'react';
import { useSelector} from 'react-redux';
import styles from './Main.module.css';
import {
    selectPulse,
    selectValue, 
    excerciseCalories,
    eatenCalories, 
    selectEaten, 
    selectExercise
  } from './mainSlice';
  import { selectUserName, selectUserId} from '../login/loginSlice';
  import './Popup.css'
  import {useDispatch} from 'react-redux'
  import firebase from 'firebase'
  
var myVar;



const Main = () => {
    clearTimeout(myVar);
    const count = useSelector(selectValue);
    const eatenCals = useSelector(selectEaten);
    const exerciseCals = useSelector(selectExercise);
    const uName = useSelector(selectUserName);
    const pulse = useSelector(selectPulse);
    const split = uName.split(" ");
    const name = split[0]; 
    const dispatch = useDispatch();
    const uid = useSelector(selectUserId);
    const datum = new Date().toLocaleDateString('zh-Hans-CN');
    let check = false;
    

   const [calsInputText,setCalsInputText] = useState('');
   const [eatenCalsInputText,setEatenCalsInputText] = useState('');

   firebase.database().ref().child("users/" + uid + "/calories/" + datum).once("value")
        .then(function(snapshot) {
          check = snapshot.hasChildren();
        }).then(
            ()=> {if(!check){
                
                firebase.database().ref().child("users/" + uid + "/calories/" + datum + "/burnedExercise").set(0);
                firebase.database().ref().child("users/" + uid + "/calories/" + datum + "/intake").set(0);
                firebase.database().ref().child("users/" + uid + "/calories/" + datum + "/burnedSteps").set(0);
                
                
              }
              else{
                firebase.database().ref().child("users/" + uid + "/calories/" + datum + "/intake").once("value")
                .then(function(snapshot) {
                    dispatch(eatenCalories(snapshot.val()))
                }).then(
                    firebase.database().ref().child("users/" + uid + "/calories/" + datum + "/burnedExercise").once("value")
                    .then(function(snapshot) {
                        dispatch(excerciseCalories(snapshot.val()));
                    })
                )
                
                firebase.database().ref().child("users/" + uid + "/calories/" + datum + "/burnedSteps").set(parseFloat(count)*0.04);
              }
            console.log(check);}
        );

   
   const addCalories = (e)=>{
        e.preventDefault();
        let temp = parseFloat(exerciseCals + parseFloat(calsInputText));
        dispatch(excerciseCalories(temp));
        firebase.database().ref().child("users/" + uid + "/calories/" + datum + "/burnedExercise").set(temp);
        setCalsInputText('');
    }

    const addEatenCalories = (e) => {
        e.preventDefault();
        let temp = parseFloat(eatenCals + parseFloat(eatenCalsInputText))
        dispatch(eatenCalories(temp));
        firebase.database().ref().child("users/" + uid + "/calories/" + datum + "/intake").set(temp);
        setEatenCalsInputText('');
    }

    

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
                
                <span className={styles.calorieValue}>{eatenCals - (exerciseCals + (parseFloat(count)*0.04)) > 0 ?
                    eatenCals - (exerciseCals + (parseFloat(count)*0.04))
                    :
                    (eatenCals - (exerciseCals + (parseFloat(count)*0.04)))*-1
                }</span>
              </p>
            </div>
            <div>
                {eatenCals - (exerciseCals + (parseFloat(count)*0.04)) > 0 ?  
                <p
                    >
                    <button 
                    className={styles.pulse}
                    >Pulse
                    </button>
                    <button className={styles.calories}>
                        To burn
                    </button>
                </p>
                :
                <p
                >
                    <button 
                    className={styles.pulse}
                    >Pulse
                    </button>
                    <button className={styles.calories}>
                        To eat
                    </button>
                </p>

                 }
                
               
                
            </div>

            <div>  
            <form className={styles.calorieValue} onSubmit={addCalories}>
            <input className={styles.calories} 
            placeholder="Enter calories burned" 
            onChange={e =>{setCalsInputText(e.target.value)}}
            value={calsInputText}
            ></input>
            </form>
            </div>

            <div>  
            <form className={styles.calorieValue} onSubmit={addEatenCalories}>
            <input className={styles.calories} 
            placeholder="Enter calories eaten" 
            onChange={e =>{setEatenCalsInputText(e.target.value)}}
            value={eatenCalsInputText}
            ></input>
            </form>
            </div>


            </div>
            </div>
       </div>

    )
};

export default Main;
