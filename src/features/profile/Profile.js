import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Profile.module.css';
import {
    addWeight,
    addBirthdate,
    addSex,
    addHeight,
    addActivityLevel,
    addGoal,
    addEdit,
    addName,
    calculateBMR,
    selectBirthdate,
    selectHeight,
    selectSex,
    selectWeight,
    selectActivityLevel,
    selectGoal,
    selectEditing,
    selectName,
    selectBMR,
  } from './profileSlice';
  import { selectUserName, selectUserId } from '../login/loginSlice';
  import firebase from 'firebase';

const Profile = () => {
    const birthdate = useSelector(selectBirthdate);
    const height = useSelector(selectHeight);
    const sex = useSelector(selectSex);
    const weight = useSelector(selectWeight);
    const activityLevel = useSelector(selectActivityLevel);
    const goal = useSelector(selectGoal);
    const name = useSelector(selectName);
    const BMR = useSelector(selectBMR);
    const [weightInputText, setWeightInputText] = useState('');
    const [sexInputText, setSexInputText] = useState('');
    const [activityLevelInputText, setActivityLevelInputText] = useState('')
    const [heightInputText, setHeightInputText] = useState('')
    const [goalInputText, setGoalInputText] = useState('')
    const [birthdateInputText, setBirthdateInputText] = useState(birthdate)
    const [nameInputText, setNameInputText] = useState('')
    const dispatch = useDispatch();
    const uid = useSelector(selectUserId);
    const editbool = useSelector(selectEditing);
    const copyeditbool = editbool.slice();



    const date = new Date().toLocaleDateString('zh-Hans-CN');



    const submitHeight = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/height").set(heightInputText);
      dispatch(addHeight(heightInputText));
      copyeditbool[2] = false;
      dispatch(addEdit(copyeditbool));
      dispatch(calculateBMR())
      firebase.database().ref('users/' + uid + "/BMR").set(BMR);
    }

    const submitSex = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/sex").set(sexInputText);
      dispatch(addSex(sexInputText));
      copyeditbool[3] = false;
      dispatch(addEdit(copyeditbool));
      dispatch(calculateBMR())
      firebase.database().ref('users/' + uid + "/BMR").set(BMR);
    }

    const submitActivityLevel = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/activityLevel").set(activityLevelInputText);
      dispatch(addActivityLevel(activityLevelInputText));
      copyeditbool[5] = false;
      dispatch(addEdit(copyeditbool));
      dispatch(calculateBMR())
      firebase.database().ref('users/' + uid + "/BMR").set(BMR);
    }

    const submitGoal = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/goal").set(goalInputText);
      dispatch(addGoal(goalInputText));
      copyeditbool[6] = false;
      dispatch(addEdit(copyeditbool));
      dispatch(calculateBMR())
      firebase.database().ref('users/' + uid + "/BMR").set(BMR);
    }

    const submitWeight = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/weight/" + date).set(weightInputText);
      dispatch(addWeight(weightInputText));
      copyeditbool[4] = false;
      dispatch(addEdit(copyeditbool));
      dispatch(calculateBMR())
     // firebase.database().ref('users/' + uid + "/BMR").set(BMR);
     console.log("BMR weight " + BMR)
    }

    const submitBirthdate = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/birthdate").set(birthdateInputText);
      dispatch(addBirthdate(birthdateInputText));
      copyeditbool[1] = false;
      dispatch(addEdit(copyeditbool));
      dispatch(calculateBMR())
      firebase.database().ref('users/' + uid + "/BMR").set(BMR);
      test();
    }

  const submitName = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/name").set(nameInputText);
      dispatch(addName(nameInputText));
      copyeditbool[7] = false;
      dispatch(addEdit(copyeditbool));
    }

    var editingAge = false;
    const editingSex = 0;
    const editingHeight = 0;
    const editingWeight = 0;
    console.log(editingAge);

    const arr = [0, 0, 0, 0]

    const toggleEdit = (number, e) => {
      e.preventDefault();
      console.log("n is " + number)
      copyeditbool[number] = true;
      dispatch(addEdit(copyeditbool));
    }

    const test = () => {
      console.log("BMR IS " + BMR)
    }

    const calculatedBMR = BMR*activityLevel;
    const lose = calculatedBMR - 500;
    const gain = calculatedBMR + 500;

    return(

        <div class={styles.profile}>
        <div class={styles.profileTitle}>
            Profile
            <p/>
        </div>

        <div class={styles.profileforms}>
          Your name: {name}<button class={styles.editButton} onClick={e=>toggleEdit(7, e)}>Edit</button>
            {editbool[7] ? (<form onSubmit={submitName}>
               <input onChange={e =>setNameInputText(e.target.value)} 
               value={nameInputText}/>
               <button type ="submit">Update</button><br/></form>) : <></>}
            </div>

        <div class={styles.profileforms}>
          Your birthdate: {birthdate}<button class={styles.editButton} onClick={e=>toggleEdit(1, e)}>Edit</button>
            {editbool[1] ? (<form onSubmit={submitBirthdate}>
               <input onChange={e =>setBirthdateInputText(e.target.value)} 
               value={birthdateInputText} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="YYYY-MM-DD"/>
               <button type ="submit">Update</button><br/></form>) : <></>}
            </div>

       <div class={styles.profileforms}>
          Your height: {height == "none" ? "none" : <>{height} cm</> }<button class={styles.editButton}onClick={e=>toggleEdit(2, e)}>Edit</button>
            {editbool[2] ? (<form onSubmit={submitHeight}>
               <input onChange={e =>setHeightInputText(e.target.value)} 
               value={heightInputText} placeholder="   cm"/>
               <button type ="submit">Update</button><br/></form>) : <></>}
            </div>

            <div class={styles.profileforms}>
          Your sex: {sex}<button class={styles.editButton} onClick={e=>toggleEdit(3, e)}>Edit</button>
            {editbool[3] ? ( <form onSubmit={submitSex}>
              <select onChange={e=>setSexInputText(e.target.value)}>
                <option value="none">--none selected--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
                <button type="submit">Update</button>
                </form>) : <></>}
            </div>

            <div class={styles.profileforms}>
          Your weight: {weight}<button class={styles.editButton} onClick={e=>toggleEdit(4, e)}>Edit</button>
            {editbool[4] ? (<form onSubmit={submitWeight}>
               <input onChange={e =>setWeightInputText(e.target.value)} 
               value={weightInputText} placeholder="   kg"/>
               <button type ="submit">Update</button><br/></form>) : <></>}
            </div>

            <div class={styles.profileforms}>
          Your activity level: {activityLevel}<button class={styles.editButton} onClick={e=>toggleEdit(5, e)}>Edit</button>
            {editbool[5] ? ( <form onSubmit={submitActivityLevel}>
              <select onChange={e=>setActivityLevelInputText(e.target.value)}>
                <option value="none">--none selected--</option>
                <option value="1.2">Little exercise or sedentary</option>
                <option value="1.375">Exercise 1-3 times/week</option>
                <option value="1.55">Exercise 3-5 times/week</option>
                <option value="1.725">Exercise 6-7 times/week</option>
                <option value="1.9">Hard training or physical job</option>
                </select>
                <button type="submit">Update</button>
                </form>) : <></>}
            </div>

            <div class={styles.profileforms}>
          Your weight goal: {goal}<button class={styles.editButton} onClick={e=>toggleEdit(6, e)}>Edit</button>
            {editbool[6] ? ( <form onSubmit={submitGoal}>
              <select onChange={e=>setGoalInputText(e.target.value)}>
                <option value="none">--none selected--</option>
                <option value="lose weight">Lose weight</option>
                <option value="maintain weight">Maintain weight</option>
                <option value="gain weight">Gain weight</option>
                </select>
                <button type="submit">Update</button>
                </form>) : <></>}
            </div>  <p/><br/>
            <div class={styles.BMR}>
            Your BMR (basal metabolic rate): {BMR == "none" ? ("not enough profile info to calculate") : (<>{BMR}</>)}
            <p/>The BMR is calculated from the Mifflin St-Jeor formula.
            {activityLevel == "none" ? ("") : (<><p/>Based on your activity level, you burn {calculatedBMR} calories/day</>)}
            {goal == "none" ? ("") : ("")}
            {goal == "lose" ? (<>To lose 0.5 kg per week, your daily caloric total sould be {lose}</>) : ("")}
            
            </div>
    </div>
    )
};


export default Profile;