import {Builder, By, Key} from "selenium-webdriver";

async function testFriends(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/#friends");
    
    await driver.findElement(By.id("search")).sendKeys("user1");

}

testFriends();