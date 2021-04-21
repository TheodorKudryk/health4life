import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    create, edit, toggleComplete, remove
} from './friendsSlice';

const Friends = () => {
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();
    const friends = useSelector(state => state.friends);

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
        <div>
           <form onSubmit={handleSubmit}>
            <input onChange={e=>{setInputText(e.target.value)}} value={inputText} />
            <button type='submit'>Create new</button>
           </form>
           {friends.map(friend => (
               <div key={friend.id}>
                   {friend.description}
                   {friend.isComplete ? 'DONE' : ''}
                   <button onClick={handleRemove(friend.id)}>Remove</button>
                   <button onClick={handleToggle(friend.id)}>Toggle</button>
               </div>
           ))}
        </div>
    )
};

export default Friends;