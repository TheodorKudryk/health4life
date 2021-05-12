import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Profile.module.css';
import {
    addWeight,
    addAge,
    addSex,
    addHeight,
    addActivityLevel,
    addGoal,
    selectAge
  } from './profileSlice';
  import { selectUserName, selectUserId } from '../login/loginSlice';
  import firebase from 'firebase';

const Profile = () => {
    const [weightInputText, setWeightInputText] = useState('');
    console.log("test");
    const [ageInputText, setAgeInputText] = useState('');
    const [sexInputText, setSexInputText] = useState('');
    const [activityLevelInputText, setActivityLevelInputText] = useState('')
    const [heightInputText, setHeightInputText] = useState('')
    const [goalInputText, setGoalInputText] = useState('')
    const dispatch = useDispatch();
    const age = useSelector(selectAge);

    const submitAge = e => {
      e.preventDefault();

      dispatch(addAge(ageInputText));
    }

    return(

        <div class={styles.profile}>
        <div class={styles.profileTitle}>
            Profile
            <p/>
        </div>

        <div class={styles.profileforms}>
          <form onSubmit={()=>dispatch(addWeight(weightInputText))}>
               <br/><input onChange={e =>setWeightInputText(e.target.value)} 
               value={weightInputText}/>
               <button type ="submit">Update</button><br/>
           </form>
           </div>

        <div class={styles.profileforms}>
        Your age: <form onSubmit={submitAge}>
        <input onChange={e =>setAgeInputText(e.target.value)} 
        value={ageInputText}/>
        <button type ="submit">Update</button> 
        </form>
       </div>

       <div class={styles.profileforms}>
        Your height: <form onSubmit={()=>dispatch(addHeight(heightInputText))}>
        <input onChange={e =>setHeightInputText(e.target.value)} 
        value={heightInputText}/>
        <button type ="submit">Update</button> 
        </form>
       </div>

       <div class={styles.profileforms}>
        Your sex: <form onSubmit={()=>dispatch(addSex(sexInputText))}>
        <input onChange={e =>setSexInputText(e.target.value)} 
        value={sexInputText}/>
        <button type ="submit">Update</button> 
        </form>
        </div>

        <div class={styles.profileforms}>
               Set your activity level: <form onSubmit={()=>dispatch(addActivityLevel(activityLevelInputText))}>
              <select onChange={e=>setActivityLevelInputText(e.target.value)}>
                <option value="1">A little</option>
                <option value="2">Medium</option>
                <option value="3">A lot</option>
                </select>
                <button type="submit">Update</button>
                </form>
                </div>
          
                <div class={styles.profileforms}>
                    Set your goal:
                    <form onSubmit={()=>dispatch(addGoal(goalInputText))}>
              <select onChange={e=>setGoalInputText(e.target.value)}>
                <option value="1">Lose weight</option>
                <option value="2">Stay at the same weight</option>
                <option value="3">Gain weight</option>
                </select>
                <button type="submit">Update</button>
                </form>
                </div>

    </div>
    )
};

export default Profile;