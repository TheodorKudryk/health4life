import {Builder, By, Key} from "selenium-webdriver";

async function testFriends(){
    let driver = await new Builder().forBrowser("chrome").build();


    //await driver.get("http://localhost:3000/#main");
    await driver.get("http://localhost:3000/#friends");
    
    //await driver.findElement(By.className("stepBtn")).click();
    await driver.findElement(By.id("search")).sendKeys("123");
    await (await driver.findElement(By.id("searchResult"))).getAttribute(textContent)
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
testFriends();