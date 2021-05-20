import {Builder, By, Key} from "selenium-webdriver";

async function testFriends(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/#friends");
    
    await driver.findElement(By.id("search")).sendKeys("anna.hi@mail.com",Key.RETURN);

    driver.sleep(2000);

    await driver.findElement(By.id("search")).sendKeys("abc",Key.RETURN);

    driver.sleep(1000);

    await driver
        .findElement(By.id("createEventBtn"))
        .click();

    driver.sleep(1000);
    
    await driver.findElement(By.id("eventDescr")).sendKeys("Gym session",Key.RETURN);

    driver.sleep(1000);
    
    await driver.findElement(By.id("eventTime")).sendKeys("2021-06-19 20:00",Key.RETURN);

    driver.sleep(1000);
    
    await driver.findElement(By.id("eventLoc")).sendKeys("Gym A",Key.RETURN);

    driver.sleep(2000);

    await driver
        .findElement(By.id("stopEventBtn"))
        .click();

}

testFriends();