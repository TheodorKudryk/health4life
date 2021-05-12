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
  import { selectUserName, selectUserId } from '../login/userSlice';
  import firebase from 'firebase';

const Profile = () => {
    const [weightInputText, setWeightInputText] = useState('');
    const [ageInputText, setAgeInputText] = useState('');
    const [sexInputText, setSexInputText] = useState('');
    const [activityLevelInputText, setActivityLevelInputText] = useState('')
    const [heightInputText, setHeightInputText] = useState('')
    const [goalInputText, setGoalInputText] = useState('')
    const dispatch = useDispatch();
    const age = useSelector(selectAge);
    const uid = useSelector(selectUserId);

    const datum = new Date().toLocaleDateString('zh-Hans-CN');

    const submitAge = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/age").set(ageInputText);
      dispatch(addAge(ageInputText));
    }

    const submitHeight = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/height").set(heightInputText);
      dispatch(addHeight(heightInputText));
    }

    const submitSex = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/sex").set(sexInputText);
      dispatch(addSex(sexInputText));
    }

    const submitActivityLevel = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/activityLevel").set(activityLevelInputText);
      dispatch(addActivityLevel(activityLevelInputText));
    }

    const submitGoal = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/goal").set(goalInputText);
      dispatch(addGoal(goalInputText));
    }

    const submitWeight = e => {
      e.preventDefault();

      dispatch(addWeight(weightInputText));
    }

    return(

        <div class={styles.profile}>
        <div class={styles.profileTitle}>
            Profile
            <p/>
        </div>

        <div class={styles.profileforms}>
          Your weight: <form onSubmit={()=>dispatch(addWeight(weightInputText))}>
               <input onChange={e =>setWeightInputText(e.target.value)} 
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
        Your height: <form onSubmit={submitHeight}>
        <input onChange={e =>setHeightInputText(e.target.value)} 
        value={heightInputText}/>
        <button type ="submit">Update</button> 
        </form>
       </div>

       <div class={styles.profileforms}>
        Your sex: <form onSubmit={submitSex}>
        <input onChange={e =>setSexInputText(e.target.value)} 
        value={sexInputText}/>
        <button type ="submit">Update</button> 
        </form>
        </div>

        <div class={styles.profileforms}>
               Set your activity level: <form onSubmit={submitActivityLevel}>
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
                    <form onSubmit={submitGoal}>
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