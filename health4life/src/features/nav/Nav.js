import './nav.css';
import {auth} from '../.././firebase/firebase';
import {useDispatch} from 'react-redux';
import {setUserLogOutState} from '../login/userSlice';
import {end} from '../main/mainSlice';
export function Nav() {
    const navToProfile = ()=> window.location.hash="profile";
    const navToLogs = ()=> window.location.hash="logs";
    const navToMain = ()=> window.location.hash="main";
    const navToFriends = ()=> window.location.hash="friends";

    const dispatch = useDispatch();
    const handleSignOut = () =>{
        window.location.hash="login";
        dispatch(end());
        auth.signOut().then(()=>{
            dispatch(setUserLogOutState())
        }).catch((err)=>alert(err.message))
    }

    return (
        <div className="navBar">
            <button onClick={()=>navToProfile()}>profile</button>
            <button onClick={()=>navToLogs()}>logs</button>
            <button onClick={()=>navToMain()}>main</button>
            <button onClick={()=>navToFriends()}>friends</button>
            <button onClick={()=>handleSignOut() }>log out</button>
        </div>
    )
};