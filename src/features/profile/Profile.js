import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    newWeight,
    edit,
    remove,
    toggleComplete,
} from './weightsSlice';
import {addHeight} from './heightSlice'
import {addAge} from './ageSlice'
import {addSex} from './sexSlice'
import {addName} from './nameSlice'
import {addActivityLevel} from './activityLevelSlice'
import {addGoal} from './goalSlice'
import styles from './Profile.module.css';



const Weight = () => {
    const [weightInputText, setWeightInputText] = useState('');
    const [heightInputText, setHeightInputText] = useState('');
    const [ageInputText, setAgeInputText] = useState('');
    const [editText, setEditText] = useState('');
    const [isEditing, setIsEditing] = useState(-1);
    const [nameInputText,setNameInputText] = useState('')
    const [sex,changeSex] = useState('')
    const [activityLevel, changeActivityLevel] = useState('')
    const [goal,changeGoal] = useState('')
    const dispatch = useDispatch();
    const weights = useSelector(state => state.weightsReducer);
    const height = useSelector(state => state.setHeightReducer)
    const age = useSelector(state => state.setAgeReducer)
    const showsex = useSelector(state => state.setSexReducer)
    const name = useSelector(state => state.setNameReducer)
    const activity = useSelector(state => state.setActivityLevelReducer)
    const showGoal = useSelector(state => state.setGoalReducer)
    

    const addNewWeight = e =>{
        e.preventDefault();

        dispatch(newWeight(weightInputText));
       
        setWeightInputText('');
    }

    const addNewHeight = e =>{
        e.preventDefault();

        dispatch(addHeight(heightInputText));
       
        setHeightInputText('');
    }

    const addNewAge = e =>{
        e.preventDefault();

        dispatch(addAge(ageInputText));
       
        setAgeInputText('');
    }

    const addNewName = e =>{
        e.preventDefault();

        dispatch(addName(nameInputText));
       
        setAgeInputText('');
    }

    const setSex = e =>{
        e.preventDefault();

     dispatch(addSex(sex));
    }

    const setActivityLevel = e =>{
        e.preventDefault();

        dispatch(addActivityLevel(activityLevel))
    }

    const setGoal = e =>{
        e.preventDefault();

        dispatch(addGoal(goal))
    }

    const handleDelete = id => () => {
        dispatch(remove(id));
    }

    const handleToggle = id => () => {
        dispatch(toggleComplete(id))
    };

    const handleEdit = (id,description) => () => {
        setIsEditing(id)
        setEditText(description)
    }

    const handleUpdate = e => {
        e.preventDefault();
        dispatch(edit({id:isEditing,description:editText}))

        setIsEditing(-1)
        setEditText('')
    }

    console.log(weights)
    console.log(height)
    console.log(showsex)
    console.log(sex)
    console.log(activity)
    console.log(showGoal)
    //console.log(weights[1].description)

    //Testa att köra
    //Med select type = submit istället för button type
    //<form onSubmit={setSex}>
    //<select onChange={e=>changeSex(e.target.value)}>
    //  <option value="male">Male</option>
    //  <option value="female">Female</option>
    //  </select>
    //  <button type="submit">Change</button>
    //  </form>
    


    return (
        <div class={styles.profile}>
            <div class={styles.profileTitle}>
                Profile
                <p/>
            </div>

            <div class={styles.profileforms}>
               Your age: {age.age === 0 ? '' : age.age} <form onSubmit={addNewAge}>
               <input onChange={e =>setAgeInputText(e.target.value)} 
               value={ageInputText}/>
               <button type ="submit">Update</button> 
               </form>
           </div>

           <div class={styles.profileforms}>
           <form onSubmit={addNewHeight}>
               Your height: {height.height === 0 ? "none entered yet" : height.height}
               <br/><input onChange={e =>setHeightInputText(e.target.value)} 
               value={heightInputText}/>
               <button type ="submit">Update</button><br/>
               </form>
           </div>

           <div class={styles.profileforms}>
            <form onSubmit={setSex}>
                Your sex:
              <br/><select onChange={e=>changeSex(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
                <button type="submit">Update</button>
                </form>
                </div>

            <div class={styles.profileforms}>
           <form onSubmit={addNewWeight}>
               Your current weight: {weights.length === 0 ? "none entered yet" : weights[weights.length-1].weight} 
               <br/><input onChange={e =>setWeightInputText(e.target.value)} 
               value={weightInputText}/>
               <button type ="submit">Update</button><br/>
           </form>
           </div>
           
           <div class={styles.profileName}>
           <form onSubmit={addNewName}>
               <input onChange={e =>setNameInputText(e.target.value)} 
               value={nameInputText}/>
               <button type ="submit">Enter your name</button>
                Name: {name.name}
               </form>
               </div>
           
               <div class={styles.profileforms}>
               Set your activity level: <form onSubmit={setActivityLevel}>
              <select onChange={e=>changeActivityLevel(e.target.value)}>
                <option value="1">A little</option>
                <option value="2">Medium</option>
                <option value="3">A lot</option>
                </select>
                <button type="submit">Update</button>
                </form>
                </div>
          
                <div class={styles.profileforms}>
                    Set your goal:
                <form onSubmit={setGoal}>
              <select onChange={e=>changeGoal(e.target.value)}>
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


export default Weight;
//  
