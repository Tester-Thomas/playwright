const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test("Ecommerce website automate", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // await page.locator("(//a[normalize-space()='Register here'])[1]").click();

    // //Registration
    // const uname = page.locator("(//input[@id='firstName'])[1]");
    // const lname = page.locator("(//input[@id='lastName'])[1]");
    // const email = page.locator("(//input[@id='userEmail'])[1]");
    // const phno = page.locator("(//input[@id='userMobile'])[1]");
    // const occupation = page.locator("(//select[@class='custom-select ng-untouched ng-pristine ng-valid'])[1]");
    // const gender = page.locator("(//input[@value='Male'])[1]");
    // const pwd = page.locator("(//input[@id='userPassword'])[1]");
    // const conpwd = page.locator("(//input[@id='confirmPassword'])[1]");
    // const check = page.locator("(//input[@type='checkbox'])[1]");
    // const registerbtn = page.locator("(//input[@id='login'])[1]"); 

    // await uname.fill("Thomas");
    // await lname.fill("Francis");
    // await email.fill("thmz@gmail.com");
    // await phno.fill("9400539801");
    // // await occupation
    // // await gender
    // await pwd.fill("Thomas@2010");
    // await conpwd.fill("Thomas@2010");
    // await check.check();
    // await registerbtn.click();

    //Login
    const mail = "thomazz@airpay.technology";
    const popuploginbtn = page.locator("(//button[normalize-space()='Login'])[1]");
    const login_email = page.locator("(//input[@id='userEmail'])[1]");
    const login_pwd = page.locator("(//input[@id='userPassword'])[1]");
    const loginbtn = page.locator("(//input[@id='login'])[1]");

    // await popuploginbtn.click();
    await login_email.fill(mail);
    await login_pwd.fill("Thomas@2010");
    await loginbtn.click();

    //homepage
    const itemname = page.locator(".card-body b");
    const cards = page.locator(".card-body");
    await page.waitForLoadState('networkidle');
    page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    //ZaraCoat4
    const productTitle = "iphone 13 pro";
    const count = await itemname.count();
    console.log(count);

    for(let i=0; i<count; ++i)
    {
        const name = await cards.nth(i).locator('b').textContent();
        if (name.trim() === productTitle)
        {
            // await cards.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
            await cards.nth(i).locator('text=Add To Cart').click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("li[class='totalRow'] button[type='button']").click();

    await page.locator("[placeholder*='Country']").pressSequentially("Ind");
    const options = page.locator(".ta-results");
    await options.waitFor();
    const optioncount = await options.locator("button").count();
    console.log("Options count is:" +optioncount);

    for(let i=0; i<=optioncount; ++i)
    {
        const text = await options.locator("button").nth(i).textContent();
        if(text === " Indonesia")
        {
            await options.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name label")).toHaveText(mail);

    await page.locator(".text-validated").first().fill("123456789");

    const month = page.locator("select.input").first();
    await month.selectOption("03");

    const day = page.locator("select.input").last();
    await day.selectOption("10");

    const cvv = page.locator(".field [type='text']").nth(1);
    await cvv.fill("234");

    const cardName = page.locator(".field [type='text']").nth(2);
    await cardName.fill("Thomas Francis P");

    const coupon = page.locator(".field [type='text']").nth(3);
    await coupon.fill("rahulshettyacademy");

    await page.locator("[type='submit']").click();

    await expect(page.locator(".ng-star-inserted").nth(2)).toHaveText("* Coupon Applied");


    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const ordid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(ordid);

    await page.locator("[style='margin-top: -10px;']").nth(0).click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    const ordids = page.locator("tbody tr th");
    const rowcount = await rows.count();
    console.log(rowcount);

    for(let i=0; i<rowcount; ++i)
    {
        const rowid = await rows.nth(i).locator("th").textContent();
        if(ordid.includes(rowid))
        {
            await rows.nth(i).locator("button").first().click();
            await page.pause();
            break;
        }
    }

    const OrderidDetails = await page.locator(".col-text").textContent(); 
    expect(ordid.includes(OrderidDetails)).toBeTruthy();

});