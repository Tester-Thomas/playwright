const {test,expect} = require("@playwright/test");

test("Popup validations", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goBack();
    await page.goForward();
    
    console.log("This is test");

});