import React, {useState} from 'react';
import { useSelector} from 'react-redux';
import './Main.css';
import {
    selectPulse,
    selectValue, 
    excerciseCalories,
    eatenCalories, 
    selectEaten, 
    selectExercise, 
    selectEventlist
  } from './mainSlice';
  import { selectUserId, setActiveUser} from '../login/loginSlice';
  import {selectName, addName } from '../profile/profileSlice';
  import './Popup.css'
  import {useDispatch} from 'react-redux'
  import {create, updateRequests} from '../friends/friendsSlice';
  import firebase from 'firebase'
  
  const navToLogs = ()=> window.location.hash="logs";

  let count;
  let eatenCals;
  let exerciseCals;
  let pulse;
  let name;
  let uid;
  let eventlist;
  let testBool = false;

const Main = () => {
    const dispatch = useDispatch();
    count = useSelector(selectValue)
    eatenCals = useSelector(selectEaten);
    exerciseCals = useSelector(selectExercise);
    name = useSelector(selectName);
    console.log("first check:" + name)
    pulse = useSelector(selectPulse);
    uid = useSelector(selectUserId);
    eventlist = useSelector(selectEventlist);
    const datum = new Date().toLocaleDateString('zh-Hans-CN');
    firebase.database().ref().child("users/" + uid + "/calories/" + datum + "/burnedSteps").set(count);

   const [calsInputText,setCalsInputText] = useState('');
   const [eatenCalsInputText,setEatenCalsInputText] = useState('');
   console.log(eventlist);
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
        <div class= "body"> 
            <div class= "overLay">
                <div class="value">   
                    Welcome back, {name}! 
                </div>
            <div class="stepText">Today's steps</div>
            <div>
                <div class="stepValue">{count}</div>
                <div>
                    <button 
                        class="stepBtn"
                        aria-label="Increment value" onClick={() => navToLogs()}
                        >Steps
                    </button></div>  
            <div>
              <p>
                <span class="pulseValue">{pulse}</span>
                
                <span class="calorieValue">{eatenCals - (exerciseCals + ((count)*0.04)) > 0 ?
                    (eatenCals - (exerciseCals + ((count)*0.04))).toFixed(0)
                    :
                    ((eatenCals - (exerciseCals + ((count)*0.04)))*-1).toFixed(0)
                }</span>
              </p>
            </div>
            <div>
                {eatenCals - (exerciseCals + ((count)*0.04)) > 0 ?  
                <p
                    >
                    <button 
                    class="pulseBtn"
                    >Pulse
                    </button>
                    <button class="calBtn">
                        To burn
                    </button>
                </p>
                :
                <p
                >
                    <button 
                    class="pulseBtn"
                    >Pulse
                    </button>
                    <button class="calBtn">
                        To eat
                    </button>
                </p>

                 }
                
               
                
            </div>

            <div>  
            <form class= "calorieValue" onSubmit={addCalories}>
            <input  id= "calbtn" class="calories"
            placeholder="Enter calories burned" 
            onChange={e =>{setCalsInputText(e.target.value)}}
            value={calsInputText}
            ></input>
            </form>
            </div>

            <div>  
            <form class="calorieValue" onSubmit={addEatenCalories}>
            <input class="calories"
            placeholder="Enter calories eaten" 
            onChange={e =>{setEatenCalsInputText(e.target.value)}}
            value={eatenCalsInputText}
            ></input>
            </form>
            </div>
            <div class= "positionEvents">
                <h4 class="eventTxt">Events</h4>
                {
                    eventlist.map(event =>
                        <div>
                            <h4 class="mainTxt">
                                <h4 class="eventTxt"> {event[0]} </h4>
                            
                            <li>Location: {event[1]}</li>
                            <li>Date and time: {event[2]}</li>
                            </h4>
                        
                        </div>
                        )
                }
            </div>


            </div>
            </div>
       </div>

    )
};


export default Main;
