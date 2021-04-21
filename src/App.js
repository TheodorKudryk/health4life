import React from 'react';
import './App.css';
import {auth, provider} from './firebase/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveUser, setUserLogOutState, selectUserName, selectUserEmail} from './features/login/userSlice';
import Main from "./features/main/Main";
import {Login} from "./features/login/Login";
import {NavBar} from "./features/navBar/Navbar";
import Friends from "./features/friends/Friends";
import Show from "./app/show";

function defaultRoute(userName){
  if (!userName)
    window.location.hash="#login";
  else if(! ["#profile", "#logs", "#main", "#friends"].find(knownRoute=>knownRoute===window.location.hash))
    window.location.hash="#main";
}

export default function App() {
  const userName = useSelector(selectUserName);
  defaultRoute(userName);
  window.addEventListener("hashchange", ()=> defaultRoute());

  return (
    <div className="App">
      <Show hash="#login"><Login/></Show>
      <Show hash="#nav"><NavBar/></Show>
      <Show hash="#profile">Profile</Show>
      <Show hash="#main"><Main/></Show>
      <Show hash="#friends"><Friends/></Show>
      <Show hash="#logs">Logs</Show>
    </div>
  )
};