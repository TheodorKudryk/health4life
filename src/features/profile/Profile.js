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
    addSuggestedCalories,
    selectBirthdate,
    selectHeight,
    selectSex,
    selectWeight,
    selectActivityLevel,
    selectGoal,
    selectEditing,
    selectName,
    selectSuggestedCalories,
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
    const suggestedCalories = useSelector(selectSuggestedCalories);
    const [weightInputText, setWeightInputText] = useState(weight);
    const [sexInputText, setSexInputText] = useState(sex);
    const [activityLevelInputText, setActivityLevelInputText] = useState(activityLevel)
    const [heightInputText, setHeightInputText] = useState(height)
    const [goalInputText, setGoalInputText] = useState(goal)
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
      const calories = calculate();
      console.log("Calories " + calories)
      dispatch(addSuggestedCalories(calories))
      firebase.database().ref('users/' + uid + "/suggestedCalories").set(calories);
    }

    const submitSex = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/sex").set(sexInputText);
      dispatch(addSex(sexInputText));
      copyeditbool[3] = false;
      dispatch(addEdit(copyeditbool));
      const calories = calculate();
      dispatch(addSuggestedCalories(calories))
      firebase.database().ref('users/' + uid + "/suggestedCalories").set(calories);
    }

    const submitActivityLevel = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/activityLevel").set(activityLevelInputText);
      dispatch(addActivityLevel(activityLevelInputText));
      copyeditbool[5] = false;
      dispatch(addEdit(copyeditbool));
      const calories = calculate();
      dispatch(addSuggestedCalories(calories))
      firebase.database().ref('users/' + uid + "/suggestedCalories").set(calories);
    }

    const submitGoal = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/goal").set(goalInputText);
      dispatch(addGoal(goalInputText));
      copyeditbool[6] = false;
      dispatch(addEdit(copyeditbool));
      const calories = calculate();
      dispatch(addSuggestedCalories(calories))
      firebase.database().ref('users/' + uid + "/suggestedCalories").set(calories);
    }

    const submitWeight = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/weight/" + date).set(weightInputText);
      dispatch(addWeight(weightInputText));
      copyeditbool[4] = false;
      dispatch(addEdit(copyeditbool));
      const calories = calculate();
      dispatch(addSuggestedCalories(calories))
      firebase.database().ref('users/' + uid + "/suggestedCalories").set(calories);
    }

    const submitBirthdate = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/birthdate").set(birthdateInputText);
      dispatch(addBirthdate(birthdateInputText));
      copyeditbool[1] = false;
      dispatch(addEdit(copyeditbool));
      const calories = calculate();
      dispatch(addSuggestedCalories(calories))
      firebase.database().ref('users/' + uid + "/suggestedCalories").set(calories);
    }

  const submitName = e => {
      e.preventDefault();
      firebase.database().ref('users/' + uid + "/name").set(nameInputText);
      dispatch(addName(nameInputText));
      copyeditbool[7] = false;
      dispatch(addEdit(copyeditbool));
    }
    
    //The reason for this function being here is because the change in useSelect(selectSuggestedCalories)
    //doesn't take hold until the submitSomething-function has finished executing, thus sending the 
    //non-updated value to the database instead of the updated one.
    const calculate = () => {
      let calculatedCalories = 0;
        if (birthdateInputText == "none" || heightInputText == "none" || sexInputText == "none" || activityLevelInputText == "none" || goalInputText == "none") {
          calculatedCalories = 0;
          console.log("none triggered")
        } else {
          const date = new Date();
          const month = date.getMonth();
          const year = date.getFullYear();
          const day = date.getDate();
          console.log("YEar is " + year)
          const split = birthdateInputText.split("-");
          const birthyear = split[0];
          const age = year - birthyear;
          console.log("Age is" + age)
          if (goalInputText == "lose weight") { 
            if (sexInputText == "female") {
              calculatedCalories = (10*weightInputText + 6.25*heightInputText -5*age - 161)*activityLevelInputText-500;
              console.log("triggered female 1")
            } else if (sexInputText == "male") {
              calculatedCalories = (10*weightInputText + 6.25*heightInputText -5*age + 5)*activityLevelInputText-500;
              console.log("triggered male 1")
            } else if (sexInputText == "other") {
              calculatedCalories = (10*weightInputText + 6.25*heightInputText -5*age - 78)*activityLevelInputText-500;
            }
          } else if (goalInputText == "maintain weight") {
            if (sexInputText == "female") {
              calculatedCalories = (10*weightInputText + 6.25*heightInputText -5*age - 161)*activityLevelInputText;
              console.log("triggered female 2")
            } else if (sex == "male") {
              calculatedCalories = (10*weightInputText + 6.25*heightInputText -5*age + 5)*activityLevelInputText;
              console.log("triggered male 2")
            } else if (sex == "other") {
              calculatedCalories = (10*weightInputText + 6.25*heightInputText -5*age - 78)*activityLevelInputText;
            }
          } else if (goalInputText == "gain weight") { 
            if (sexInputText == "female") {
              calculatedCalories = (10*weightInputText + 6.25*heightInputText -5*age - 161)*activityLevelInputText+500;
            } else if (sexInputText == "male") {
              calculatedCalories = (10*weightInputText + 6.25*heightInputText -5*age + 5)*activityLevelInputText+500;
            } else if (sex == "other") {
              calculatedCalories = (10*weightInputText + 6.25*heightInputText -5*age - 78)*activityLevelInputText+500;
            }
          }
          calculatedCalories.toFixed(0);
        }
      return calculatedCalories;
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

    return(

        <div class={styles.profile}>
        <div class={styles.profileTitle}>
            Profile
            <p/>
        </div>

        <div class={styles.profileforms}>
          Your name: {name}<button class={styles.editButton} id="nameBtn" onClick={e=>toggleEdit(7, e)}>Edit</button>
            {editbool[7] ? (<form onSubmit={submitName}>
               <input id="nameInput" onChange={e =>setNameInputText(e.target.value)} 
               value={nameInputText}/>
               <button type ="submit" id ="nameBtnSubmit">Update</button><br/></form>) : <></>}
            </div>

        <div class={styles.profileforms}>
          Your birthdate: {birthdate}<button class={styles.editButton} id="bdayBtn" onClick={e=>toggleEdit(1, e)}>Edit</button>
            {editbool[1] ? (<form onSubmit={submitBirthdate}>
               <input id ="bdayInput" onChange={e =>setBirthdateInputText(e.target.value)} 
               value={birthdateInputText} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" placeholder="YYYY-MM-DD"/>
               <button id ="bdayBtnSubmit" type ="submit">Update</button><br/></form>) : <></>}
            </div>

       <div class={styles.profileforms}>
          Your height: {height == "none" ? "none" : <>{height} cm</> }<button class={styles.editButton} id ="heightBtn" onClick={e=>toggleEdit(2, e)}>Edit</button>
            {editbool[2] ? (<form onSubmit={submitHeight}>
               <input id ="heightInput" onChange={e =>setHeightInputText(e.target.value)} 
               value={heightInputText} placeholder="   cm"/>
               <button id ="heightBtnSubmit" type ="submit">Update</button><br/></form>) : <></>}
            </div>

            <div class={styles.profileforms}>
          Your sex: {sex}<button class={styles.editButton} onClick={e=>toggleEdit(3, e)}>Edit</button>
            {editbool[3] ? ( <form onSubmit={submitSex}>
              <select onChange={e=>setSexInputText(e.target.value)}>
                <option value="none">--none selected--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
                <button type="submit">Update</button>
                </form>) : <></>}
            </div>

             <div class={styles.profileforms}>
            Your weight: {weight == "none" ? "none":<>{weight} kg</>}<button class={styles.editButton} id="weightBtn" onClick={e=>toggleEdit(4, e)}>Edit</button>
            {editbool[4] ? (<form onSubmit={submitWeight}>
               <input id="weightInput" onChange={e =>setWeightInputText(e.target.value)} 
               value={weightInputText} placeholder="   kg"/>
               <button id="weightBtnSubmit" type ="submit">Update</button><br/></form>) : <></>}
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
            {calculate().toFixed(0) == 0 ? ("To get your recommended daily caloric intake, please enter your data.") : (<>Your recommended daily caloric intake is {calculate().toFixed(0)} calories.</>)}   
            </div>
    </div>
    )
};


export default Profile;
