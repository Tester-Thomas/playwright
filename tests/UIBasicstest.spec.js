const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test("Browser context", async ({browser})=> {
    //Cookies,plugins..etc
    const context = await browser.newContext() //if needed the cookies or plugins we passing the same here
    const page = await context.newPage(); //new page is opening
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("New page", async ({page})=> {
    //We giving page fixture, if there is no plugin or cookies need to pass
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test("login page", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const uname = page.locator('#username');
    const pswd = page.locator('#password');
    const blinktext = page.locator('.blinkingText');
    await uname.fill('thomas');
    await pswd.fill('Airpay');
    const radiobutton = page.locator(".customradio input");
    const dropdown = page.locator("select.form-control ");
    const signin = page.locator('#signInBtn');
    const productname = page.locator(".card-body a");
    const checkbox = page.locator("#terms");
    await signin.click();

    console.log(await page.locator("[style*='block']").textContent());  
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await uname.fill("");
    await uname.fill("rahulshettyacademy");
    await pswd.fill("learning");
    await radiobutton.nth(1).click();
    await page.locator("#okayBtn").click();
    await expect(radiobutton.last()).toBeChecked();
    await dropdown.selectOption('consult');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    expect(await checkbox.isChecked());
    await expect(blinktext).toHaveAttribute("class","blinkingText");
    await signin.click();

    console.log(await productname.nth(0).textContent());

});


test("Child window Handling", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [childPage] = await Promise.all
    (
        [
            context.waitForEvent('page'),
            documentLink.click(),

        ]
    )

    const text = await childPage.locator(".im-para.red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator('#username').fill(domain);
    await page.pause();
    const inputValue = await page.locator("#username").inputValue();
    console.log(inputValue);
    console.log(text);
});

