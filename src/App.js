import React from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {selectUserName} from './features/login/userSlice';
import Main from "./features/main/Main";
import {Login} from "./features/login/Login";
import {Nav} from "./features/nav/Nav";
import Friends from "./features/friends/Friends";
import Show from "./app/show";

function defaultRoute(userName){
  //should check if user is logged in and if not only be allowed on #login.
  if(! ["#profile", "#logs", "#main", "#friends", "#login"].find(knownRoute=>knownRoute===window.location.hash))
    window.location.hash="#main";
}

export default function App() {
  const userName = useSelector(selectUserName);
  defaultRoute(userName);
  window.addEventListener("hashchange", ()=> defaultRoute());

  return (
    <div className="App">
      <Show hash="#login"><Login/></Show>
      <Show hash="#nav"><Nav/></Show>
      <Show hash="#profile">Profile</Show>
      <Show hash="#main"><Main/></Show>
      <Show hash="#friends"><Friends/></Show>
      <Show hash="#logs">Logs</Show>
    </div>
  )
};