import {Builder, By, Key} from "selenium-webdriver";

async function testLogs(){
    let driver = await new Builder().forBrowser("firefox").build();

    await driver.get("http://localhost:3000/#logs");

    driver.sleep(1000);

    await driver.findElement(By.className("chartDropDown")).click();

    driver.sleep(1000);

    await driver.findElement(By.id("optionTen")).click();

    driver.sleep(1000);

    await driver.findElement(By.className("chartDropDown")).click();

    driver.sleep(1000);

    await driver.findElement(By.id("optionSeven")).click();

    driver.sleep(1000);

    await driver.findElement(By.className("chartDropDown")).click();

    driver.sleep(1000);

    await driver.findElement(By.id("optionThree")).click();

    driver.sleep(1000);
}

testLogs();