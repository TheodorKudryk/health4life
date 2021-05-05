import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    create, toggleComplete, remove
} from './friendsSlice';
import "./friends.css"
import { setUserLogOutState } from '../login/userSlice';

const Friends = () => {
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends);
    const user = useSelector(state => state.user);

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(create(inputText));

        setInputText('');
    };

    const handleRemove = (id) => () => {
        dispatch(remove(id));
    };

    const handleToggle = (id) => () => {
        dispatch(toggleComplete(id));
    };

    return (
        <div className="friends">
           <form onSubmit={handleSubmit}>
            <input onChange={e=>{setInputText(e.target.value)}} value={inputText} />
            <button type='submit'>Search</button>
           </form>
           {friends.map(friend => (
               <div key={friend.id}>
                   {friend.description}
                   {friend.isComplete ? '  ACTIVE  ' : ''}
                   <button onClick={handleRemove(friend.id)}>Remove</button>
                   <button onClick={handleToggle(friend.id)}>Toggle</button>
               </div>
           ))}
            <div key={user.userId}>
                {user.userName}<br/>
                {user.userEmail}<br/>
                {user.userId}
            </div>
        </div>
    )
};

export default Friends;