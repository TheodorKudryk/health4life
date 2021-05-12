import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    create, toggleComplete, remove
} from './friendsSlice';
import "./friends.css";
import firebase from 'firebase';
import {selectUserId} from '../login/loginSlice';

const Friends = () => {
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends);
    const uid = useSelector(selectUserId);
    const [searchResult, setSearchResult] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(create(inputText));

        setInputText('');
    };

    const handleRemove = (mail) => () => {
        dispatch(remove(mail));
        var id;
        firebase.database().ref().child('users/' + uid + "/friends").once('value',(snap)=>{
            if (snap){
              snap.forEach(obj => {
                  if (obj.val() == mail) {
                    id = obj.key;
                    return;
                  }
              });
            }
        }).then(()=>firebase.database().ref('users/' + uid + "/friends/" + id).remove());
        
    };

    const handleToggle = (id) => () => {
        dispatch(toggleComplete(id));
    };

    const handleSearch = e => {
        e.preventDefault();
        firebase.database().ref().child("users").once('value',(snap)=>{
            if (snap){
              snap.forEach(user => {
                  if (user.val().email == inputText) {
                    setSearchResult(user.val().email);
                    setInputText('');
                    return;
                  }
              });
            }
        });

        setSearchResult('');
    };

    const handleAdd = () => {
        dispatch(create(searchResult));
        firebase.database().ref('users/' + uid + "/friends").push(searchResult);
        setInputText('');
    };

    return (
        <div className="friends">
           <form onSubmit={handleSearch}>
            <input onChange={e=>{setInputText(e.target.value)}} value={inputText} />
            <button type='submit'>Search</button>
           </form>
           <br/>
           {searchResult}
           {searchResult == '' ? "No user with that email found" : <button onClick={handleAdd}>Add</button>}
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           Friends:
           {friends.map(friend => (
               <div key={friend.id}>
                   {friend.description}
                   {friend.isComplete ? '  ACTIVE  ' : ''}
                   
                   <button onClick={handleRemove(friend.description)}>Remove</button>
                   <button onClick={handleToggle(friend.description)}>Toggle</button>
               </div>
           ))}
        </div>
    )
};

export default Friends;