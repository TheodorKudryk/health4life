import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Profile.module.css';
import {
    addWeight,
    selectWeights,
    addAge,
    selectAge
  } from './profileSlice';
  import { selectUserName, selectUserId } from '../login/loginSlice';
  import firebase from 'firebase';

const Profile = () => {
    const [weightInputText, setWeightInputText] = useState('');
    const [ageInputText, setAgeInputText] = useState('');
    const dispatch = useDispatch();

    
    return(

        <div class={styles.profile}>
        <div class={styles.profileTitle}>
            Profile
            <p/>
        </div>

        <div class={styles.profileforms}>
        Your age: <form onSubmit={()=>dispatch(addAge(ageInputText))}>
        <input onChange={e =>setAgeInputText(e.target.value)} 
        value={ageInputText}/>
        <button type ="submit">Update</button> 
        </form>
       </div>
    </div>
    )
};

export default Profile;