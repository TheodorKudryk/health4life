import {
    setActiveUser,
    selectUserName,
} from './userSlice';
import {
    start
  } from '../main/mainSlice';
import {useDispatch, useSelector} from 'react-redux';
import {auth, provider} from '../../firebase/firebase';
import styles from './Login.module.css';
import firebase from 'firebase';

var current = new Date().toLocaleDateString('zh-Hans-CN');
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
        firebase.database().ref().child("users/" + result.user.uid + "/" + current).once('value',function(snap){
            if (snap){
              dispatch(start(snap.val()))
            }
          })
        window.location.hash="main";
        })
    }
    return (
            <button className={styles.login} onClick = {handleSignIn}>Sign In</button>
    )
}