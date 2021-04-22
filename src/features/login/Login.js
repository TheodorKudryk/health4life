import {
    setActiveUser,
    selectUserName,
} from './userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {auth, provider} from '../../firebase/firebase';
import styles from './Login.module.css';

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
        window.location.hash="main";
        })
    }
    return (
            <button className={styles.login} onClick = {handleSignIn}>Sign In</button>
    )
}