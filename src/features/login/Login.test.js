
import { Builder, By, Key} from "selenium-webdriver";



async function btn(){
    let driver = await new Builder().forBrowser("chrome").build();
   

    await driver.get("http://localhost:3000/#login");
    
    
    await driver
        .findElement(By.className("logInBtn"))
        .click();
   
    
    
    /*
    await driver.get("https://accounts.google.com/o/oauth2/auth/identifier?response_type=code&client_id=793595792486-rvq5f3o7ve8kp524fig2htipnvuefvj9.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fhealth4life-ea4f8.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDnMc2PyCQjNKgfT_jRp0HIC6q4rVC-eq1LkspU2Fks8VEZ47YZpEby1ctYchYslj2lhq6Ps2EFznIPhY6KCM2liX2p4l4uXGXqLBUZzVl-GEaYjvRjG9PBAxYPVO8hEFnumCFWef4QaioaaaA5VChJeTdP-vTFLg0AKrnQPmitTrSe94QBJdpPB1Ug0CqE1ecNlayDLMuR7DN4tLt3CO939r01tVj-1oD8Cr7oeCMYOeCDrYgTIiJnh4hCnOqE-I95ijngA_xdZrDnrurRFNxbfyf9R8M9ePY1SZJezWqcKcrKCfXtO7eDjVrFsXOID6ZDcmkdSEOvD&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&context_uri=http%3A%2F%2Flocalhost%3A3000&flowName=GeneralOAuthFlow");
    await driver.findElement(By.id('identifierId')).click();
    await driver.findElement(By.id('identifierId')).sendKeys("matilda.qvick@gmail.com");
    await driver.switchTo().activeElement().sendKeys(Key.RETURN);
    */


}

btn();