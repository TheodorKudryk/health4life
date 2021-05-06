import firebase from 'firebase';
import {
    setActiveUser,
    selectUserName,
} from './userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {auth, provider} from '../../firebase/firebase';
import styles from './Login.css';
import pic from './app.png'
import { start } from '../main/mainSlice';

export function Login() {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    //const userEmail = useSelector(selectUserEmail);

    const handleSignIn = () =>{
        auth.signInWithPopup(provider).then((result)=>{
        dispatch(setActiveUser({
            userName: result.user.displayName,
            userEmail: result.user.email,
            userId: result.user.uid
        }))
        var check = false;
        var current = new Date().getDay();
        firebase.database().ref().child("users/" + result.user.uid + "/steps").once("value")
        .then(function(snapshot) {
          check = snapshot.hasChild(current.toString());
        });
        const datum = new Date().toLocaleDateString('zh-Hans-CN');
        if(!check){
          firebase.database().ref().child("users/" + result.user.uid + "/steps/" + datum).set(0);
        }
        dispatch(start())
        window.location.hash="main";
        })
    }
    return (
        <div>
            <div class="split left">
                <div class="centered">
                    <h1 class="logInTxt">Welcome! &#128522;</h1>
                    <button class="logInBtn"  onClick = {handleSignIn}>Sign In</button>
                </div>
            </div>
            <div class="split right"> 
                <div class="centered">
                    <div class="infoTxt">
                        <h3 >Hello user! &#127939;</h3>
                        <h4 class="mainTxt">Want to track your steps, get in shape or just maintain a healthy lifestyle?
                            Then this app is for you. We are health4life, a team of KTH students who developed an aplication
                            for everyone, no matter your current health status. In this app you will be able to:
                        <ul>
                            <li>Track your steps in real time</li>
                            <li>See your progress in your health journey</li>
                            <li>Track clalorie intake, weight loss, steps per day etc.</li>
                            <li>Invite your friends to workouts</li>
                        </ul>
                            If this sounds like something for you, we welcome you to join the community!
                        </h4>
                        <h3>Good luck on your health journey!</h3>
                    </div>
                    <img class="logoImg" src={pic}  alt="logo"></img>
                </div>
            </div>
        </div>
    )
}