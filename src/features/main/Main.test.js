import {Builder, By, Key} from "selenium-webdriver";

async function btn(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/#main");
    
    await driver.findElement(By.className("stepBtn")).click();
   
}

btn();