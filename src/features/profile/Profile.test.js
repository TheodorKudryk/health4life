import {Builder, By, Key} from "selenium-webdriver";
   

async function profileTest(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000/#profile");

    driver.sleep(1000);
    
    driver.findElement(By.id("nameBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("nameInput")).sendKeys("NewName")
    driver.sleep(200);
    driver.findElement(By.id("nameBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("bdayBtn")).click()
    driver.findElement(By.id("bdayInput")).clear()
    driver.sleep(200);
    driver.findElement(By.id("bdayInput")).sendKeys("2020-01-01")
    driver.sleep(200);
    driver.findElement(By.id("bdayBtnSubmit")).click()
    
    driver.sleep(1000);

    driver.findElement(By.id("heightBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("heightInput")).clear()
    driver.sleep(200);
    driver.findElement(By.id("heightInput")).sendKeys("170")
    driver.sleep(200);
    driver.findElement(By.id("heightBtnSubmit")).click()


    driver.sleep(1000);

    driver.findElement(By.id("sexBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("male")).click();
    driver.sleep(200);
    driver.findElement(By.id("sexBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("sexBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("female")).click();
    driver.sleep(200);
    driver.findElement(By.id("sexBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("sexBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("other")).click();
    driver.sleep(200);
    driver.findElement(By.id("sexBtnSubmit")).click()

    driver.sleep(1000)

    driver.findElement(By.id("weightBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("weightInput")).clear()
    driver.sleep(200);
    driver.findElement(By.id("weightInput")).sendKeys("100")
    driver.sleep(200);
    driver.findElement(By.id("weightBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("activityLevelBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("1.2")).click();
    driver.sleep(200);
    driver.findElement(By.id("activityLevelBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("activityLevelBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("1.375")).click();
    driver.sleep(200);
    driver.findElement(By.id("activityLevelBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("activityLevelBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("1.55")).click();
    driver.sleep(200);
    driver.findElement(By.id("activityLevelBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("activityLevelBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("1.725")).click();
    driver.sleep(200);
    driver.findElement(By.id("activityLevelBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("activityLevelBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("1.9")).click();
    driver.sleep(200);
    driver.findElement(By.id("activityLevelBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("goalBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("lose")).click();
    driver.sleep(200);
    driver.findElement(By.id("goalBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("goalBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("maintain")).click();
    driver.sleep(200);
    driver.findElement(By.id("goalBtnSubmit")).click()

    driver.sleep(1000);

    driver.findElement(By.id("goalBtn")).click()
    driver.sleep(200);
    driver.findElement(By.id("gain")).click();
    driver.sleep(200);
    driver.findElement(By.id("goalBtnSubmit")).click()

}

profileTest();
