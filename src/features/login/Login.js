import {
    setActiveUser,
    setUserLogOutState,
    selectUserName,
    selectUserEmail
} from './userSlice';

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
        })
    }
    return (
        <button onClick = {handleSignIn}>Sign In</button>
    )
}