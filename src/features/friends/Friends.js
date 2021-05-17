import React, { useState} from 'react';
import { useSelector} from 'react-redux';
import {selectFriendList, selectFriendRequests} from './friendsSlice';
import "./friends.css";
import firebase from 'firebase';
import {selectUserId, selectUserEmail, selectUserName} from '../login/loginSlice';

const Friends = () => {
    const [inputText, setInputText] = useState('');
    const [message, setMessage] = useState('');
    const [editCreateEvent, setEditCreateEvent] = useState(false);
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventInvites, setEventInvites] = useState([]);
    const friends = useSelector(selectFriendList);
    const requests = useSelector(selectFriendRequests);
    const uid = useSelector(selectUserId);
    const myEmail = useSelector(selectUserEmail);
    const myName = useSelector(selectUserName);
    const [searchResult, setSearchResult] = useState([]);

    const handleRemove = (id) => {
        setMessage("");
        firebase.database().ref('users/' + uid + "/friends/friendList/" + id).remove()
    };

    const handleSearch = e => {
        e.preventDefault();
        
        firebase.database().ref().child("users").once('value',(snap)=>{
            if (snap){
              snap.forEach(user => {
                  if (user.val().email === inputText) {
                    setInputText('');
                    for(var friend of friends) {
                        if (friend.email === user.val().email) {
                            setMessage(user.val().name + " is already your friend");
                            return;
                        }
                    }
                    for(var request of requests) {
                        if (request.email === user.val().email) {
                            setMessage(user.val().name + " has already sent you a friend request");
                            return;
                        }
                    }
                    
                    if (user.val().friends.requestsReceived) {
                        for(var id of Object.entries(user.val().friends.requestsReceived)) {
                            console.log(id[0], id === uid)
                            if (id[0] === uid) {
                                setMessage("Friend request has already been sent to " + user.val().name);
                                return;
                            }
                        };
                    };
                    
                    setSearchResult([user.val().email,user.val().name,user.key]);
                    setMessage('')
                    return;
                  }
              });
            }
        });

        setSearchResult([]);
        setMessage("No user with that email found");
    };

    const handleSendRequest = () => {
        firebase.database().ref('users/' + searchResult[2] + "/friends/requestsReceived/" + uid).set(
            {
                "email": myEmail,
                "name": myName
            }
        );
        setInputText('');
        setSearchResult([]);
    }

    const handleAccept = (friend) => () => {
        firebase.database().ref('users/' + uid + "/friends/requestsReceived/" + friend.id).remove()
        firebase.database().ref('users/' + uid + "/friends/friendList/" + friend.id).set(
            {
                "email": friend.email,
                "name": friend.name
            }
        );
        setInputText('');
        setSearchResult([]);
    };

    const handleDecline = (friend) => () => {
        firebase.database().ref('users/' + uid + "/friends/requestsReceived/" + friend.id).remove()
        setInputText('');
        setSearchResult([]);
    };

    function resetEvent() {
        setEventTime('');
        setEventLocation('');
        setEventDescription('');
        setEventInvites([]);
    }

    const createEvent = () => {
        setEditCreateEvent(!editCreateEvent);
        resetEvent()
        console.log("hi")
        var participants = {[uid]: {"role":"host", "accepted": true}}
        eventInvites.forEach(invite=>participants[invite.id] = {"role":"participant", "accepted": false})
        firebase.database().ref('events').push(
            {
                "participants": participants,
                "eventInfo": {
                    "description": eventDescription,
                    "location": eventLocation,
                    "time": eventTime
                }
            }
        );
    };

    return (
        <div className="friends">
           <form onSubmit={handleSearch}>
            <input onChange={e=>{setInputText(e.target.value)}} value={inputText} />
            <button type='submit'>Search</button>
           </form>
           <br/>
           {searchResult.length === 0 ? message : <div>{searchResult[0]} <button onClick={handleSendRequest}>Add</button></div>}
           <br/>
           <br/>
           <br/>
           <br/>
           Friend requests:
           {requests.map(friend => (
               <div key={friend.id}>
                   {friend.email}
                   <button onClick={handleAccept(friend)}>Accept</button>
                   <button onClick={handleDecline(friend)}>Decline</button>
               </div>
           ))}
           <br/>
           <br/>
           <br/>
           <br/>
           Friends:
           {friends.map(friend => (
               <div key={friend.id}>
                   {friend.name}
                   {editCreateEvent ? 
                        (eventInvites.includes(friend) ? 
                            <button onClick={()=>setEventInvites(eventInvites.filter(obj=>obj!==friend))}>Uninvite</button>
                            :
                            <button onClick={()=>setEventInvites([...eventInvites,friend])}>Invite</button>
                        )
                    : <button onClick={() => handleRemove(friend.id)}>Remove</button>}
               </div>
           ))}
           <br/>
           <br/>
           <br/>
           <br/>
           {editCreateEvent ? <></> : <button onClick={() => setEditCreateEvent(!editCreateEvent)}>Create event</button>}
           {editCreateEvent ? 
                <div>
                    Description<input onChange={e =>setEventDescription(e.target.value)} value={eventDescription}/>
                    <br/>
                    Time<input onChange={e =>setEventTime(e.target.value)} value={eventTime} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}" placeholder="YYYY-MM-DD TT:TT"/>
                    <br/>
                    Location<input onChange={e =>setEventLocation(e.target.value)} value={eventLocation}/>
                    <br/>
                    <button onClick={createEvent}>Create event</button>
                    <button onClick={() => {resetEvent();setEditCreateEvent(false)}}>stop edit</button>
                </div>
            : <></>}
        </div>
    )
};

export default Friends;