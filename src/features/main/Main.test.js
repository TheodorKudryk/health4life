import {Builder, By, Key} from "selenium-webdriver";
async function btn(){
    let driver = await new Builder().forBrowser("chrome").build();


    await driver.get("http://localhost:3000/#main");
    await driver.get("http://localhost:3000/#friends");
    
    //await driver.findElement(By.className("stepBtn")).click();
    await driver.findElement(By.id("calbtn")).sendKeys("123");
    await driver.findElement(By.id)
}

/*if(testBool && name == "none"){
    console.log("secound check:" + name)
    name ="john"
    let useruid="user1"
    let usermail="john.smith@mail.com"
    dispatch(setActiveUser({
        username: name,
        userEmail: usermail,
        userId: useruid,
    }))
    dispatch(addName("john"))
    firebase.database().ref().child("users/" + useruid + "/friends/friendList").on('value',function(snap){
        if (snap)
            dispatch(create(snap.val()));
    });
    firebase.database().ref().child("users/" + useruid  + "/friends/requestsReceived").on('value',function(snap){
        if (snap)
            dispatch(updateRequests(snap.val()));
    });
}
*/
btn();