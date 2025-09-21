const {test,expect} = require("@playwright/test");

test("Popup validations", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'D:\SOFTWARE TESTING\AUTOMATION TESTING\PLAYWRIGHT\playwright\Screenshots\sc2.png'});
    await page.screenshot({path: 'D:\SOFTWARE TESTING\AUTOMATION TESTING\PLAYWRIGHT\playwright\Screenshots\sc1.png'});
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
    await page.locator("a[href='#top']").click();
    

    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("a[href*='lifetime']:visible").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});