import firebase from 'firebase';
import { setActiveUser} from './loginSlice';
import {useDispatch} from 'react-redux';
import {auth, provider} from '../../firebase';
import './Login.css';
import pic from './app.png'
import { steps, pulse, exerciseCalories, eatenCalories, eventlist, allSteps } from '../main/mainSlice';
import { addBirthdate, addHeight, addSex, addActivityLevel, addGoal, addWeight, addName, addSuggestedCalories } from '../profile/profileSlice';
import {create, updateRequests} from '../friends/friendsSlice';


export function Login() {
  var userName;
  const dispatch = useDispatch();
  let firstLogin = false;

  const handleSignIn = () =>{
      auth.signInWithPopup(provider).then((result)=>{
          userName = result.user.displayName
      dispatch(setActiveUser({
          userName,
          userEmail: result.user.email,
          userId: result.user.uid,
      }))

       const split = userName.split(" ");
       const name = split[0]; 

        var check = false;
        var newValue;
        const datum = new Date().toLocaleDateString('zh-Hans-CN');
        firebase.database().ref().child("users/" + result.user.uid).once("value")
        .then(function(snapshot) {
            check = snapshot.hasChild("name");
        }).then(
            ()=> {if(!check){
                firstLogin = true;
                window.location.hash="popup";
                firebase.database().ref().child("users/" + result.user.uid + "/email").set(result.user.email);
                firebase.database().ref().child("users/" + result.user.uid + "/steps/" + datum).set(0);
                firebase.database().ref().child("users/" + result.user.uid + "/pulse/").set(75);
                firebase.database().ref().child("users/" + result.user.uid + "/calories/" + datum + "/burnedExercise").set(0);
                firebase.database().ref().child("users/" + result.user.uid + "/calories/" + datum + "/intake").set(0);
                firebase.database().ref().child("users/" + result.user.uid + "/calories/" + datum + "/burnedSteps").set(0);
                firebase.database().ref().child("users/" + result.user.uid + "/calories/" + datum).set(0);
                firebase.database().ref().child("users/" + result.user.uid + "/birthdate").set("YYYY-MM-DD");
                firebase.database().ref().child("users/" + result.user.uid + "/height/").set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/sex/").set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/activityLevel/").set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/weight/" + datum).set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/goal/").set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/name/").set(name);
                firebase.database().ref().child("users/" + result.user.uid + "/suggestedCalories/").set("none");
              }
            console.log(check);}
        );
        
        firebase.database().ref().child("users/" + result.user.uid + "/calories/" + datum).once("value")
        .then(function(snapshot) {
          check = snapshot.hasChild("burnedExercise");
        }).then(
            ()=> {if(!check){
                firstLogin = true;
                
                firebase.database().ref().child("users/" + result.user.uid + "/calories/" + datum + "/burnedExercise").set(0);
              }
            console.log(check);}
        );

        firebase.database().ref().child("users/" + result.user.uid + "/calories/" + datum).once("value")
        .then(function(snapshot) {
          check = snapshot.hasChild("intake");
        }).then(
            ()=> {if(!check){
                firstLogin = true;
                
                firebase.database().ref().child("users/" + result.user.uid + "/calories/" + datum + "/burnedExercise").set(0);
                firebase.database().ref().child("users/" + result.user.uid + "/calories/" + datum + "/intake").set(0);
              }
            console.log(check);}
        );
        //  ------------------------------------------FRIENDS-------------------------------------------------------------------
        firebase.database().ref().child("users/" + result.user.uid  + "/friends/friendList").on('value',function(snap){
            if (snap)
                dispatch(create(snap.val()));
        });
        firebase.database().ref().child("users/" + result.user.uid  + "/friends/requestsReceived").on('value',function(snap){
            if (snap)
                dispatch(updateRequests(snap.val()));
        });
        // ------------------------------------------^FRIENDS^------------------------------------------------------------------
        console.log(result.user.uid);
        console.log(datum);
        firebase.database().ref().child("users/" + result.user.uid  + "/birthdate").on('value',function(snap){
            if (snap){
              newValue= snap.val();
              console.log("age exists");
            }
            dispatch(addBirthdate(newValue));
          })
          firebase.database().ref().child("users/" + result.user.uid  + "/pulse").on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            if(newValue == null){
              newValue=75;
            }
            dispatch(pulse(newValue));
          })

          firebase.database().ref().child("users/" + result.user.uid  + "/sex").on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            dispatch(addSex(newValue));
          })
          firebase.database().ref().child("users/" + result.user.uid  + "/activityLevel").on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            dispatch(addActivityLevel(newValue));
          })
          firebase.database().ref().child("users/" + result.user.uid  + "/goal").on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            dispatch(addGoal(newValue));
          })
          firebase.database().ref().child("users/" + result.user.uid  + "/height").on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            dispatch(addHeight(newValue));
          })

          firebase.database().ref().child("users/" + result.user.uid  + "/weight").on('value',function(snap){
            snap.forEach((snap1) => {
              snap1.forEach((snap2) => {
                snap2.forEach((snap3) => {
                  newValue = snap3.val();
                })
              })
            })
            dispatch(addWeight(newValue))
          })
          firebase.database().ref().child("users/" + result.user.uid  + "/name").on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            dispatch(addName(newValue));
          })
          firebase.database().ref().child("users/" + result.user.uid  + "/suggestedCalories").on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            dispatch(addSuggestedCalories(newValue));
          })
          firebase.database().ref().child("users/" + result.user.uid  + "/calories/" + datum + "/intake").on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            dispatch(eatenCalories(newValue));
          })
          firebase.database().ref().child("users/" + result.user.uid  + "/calories/" + datum + "/burnedExercise").on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            dispatch(exerciseCalories(newValue));
          })
          firebase.database().ref().child("events").once("value", (snap) => {
            snap.forEach((childsnap)=>{
             console.log(childsnap.child("participants").hasChild(result.user.uid));
                if(childsnap.child("participants").hasChild(result.user.uid)){
                   
                    console.log(childsnap.child("eventInfo").val());
                 Object.values(childsnap.child("eventInfo").val())
                 dispatch(eventlist(Object.values(childsnap.child("eventInfo").val())))
                    
                }
     
            });
        });
        

        firebase.database().ref().child("users/" + result.user.uid  + "/steps/").on('value',function(snap){
          if (snap){
            newValue= snap.val();
          }
          dispatch(allSteps(newValue));
        })
        


          firebase.database().ref().child("users/" + result.user.uid  + "/steps/" + datum).on('value',function(snap){
            if (snap){
              newValue= snap.val();
            }
            if(newValue == null){
              newValue=0;
            }
            dispatch(steps(newValue));
      
          })
           
          if(!firstLogin){
            window.location.hash="main";
          } 
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
