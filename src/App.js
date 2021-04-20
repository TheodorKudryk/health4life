import React from 'react';
import './App.css';
import {auth, provider} from './firebase/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveUser, setUserLogOutState, selectUserName, selectUserEmail} from './features/login/userSlice';
import Main from "./features/main/Main"

function App() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  //const userEmail = useSelector(selectUserEmail);

  const handleSignIn = () =>{
    auth.signInWithPopup(provider).then((result)=>{
      dispatch(setActiveUser({
        userName: result.user.displayName,
        userEmail: result.user.email
      }))
    })
  }

  const handleSignOut = () =>{
    console.log("hey")
    auth.signOut().then(()=>{
      dispatch(setUserLogOutState())
    }).catch((err)=>alert(err.message))
  }

  return (
    <div className="App">
      <header className = "App-header">
          {
            userName ? (<div>
              <Main/>

<button onClick = {handleSignOut}>Sign Out</button>
            </div>
            ):(
              <button onClick = {handleSignIn}>Sign In</button>
            )
          }
      </header>
    </div>
  );
}

export default App;