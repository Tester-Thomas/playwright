const {test,expect} = require("@playwright/test");
const {text} = require('stream/consumers');

test('Client app other way', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("thomazz@airpay.technology");
    await page.getByPlaceholder("enter your passsword").fill("Thomas@2010");
    await page.getByRole("button",{name:'Login'}).click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText:"ADIDAS ORIGINAL"}).getByRole("button",{name:' Add To Cart'}).click();
    await page.getByRole("listitem").getByRole("button",{name:"  Cart "}).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();

    await page.getByRole("button",{name:"Checkout"}).click();

    await page.locator("[type='text']").nth(0).clear();
    await page.locator("[type='text']").nth(0).fill("123456789123456");
    await page.locator("select.input").nth(0).selectOption("03");
    await page.locator("select.input").nth(1).selectOption("26");
    await page.locator("input.input").nth(1).fill("123");
    await page.locator("[type='text']").nth(2).fill("Thomas");
    await page.locator("[type='text']").nth(3).fill("rahulshettyacademy");
    await page.getByRole("button",{name:"Apply Coupon"}).click();
    await page.pause();


    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("Place Order ").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    const ordid = page.locator(".em-spacer-1 .ng-star-inserted");
    const cleanOrdId = String(ordid).replace(/\|/g, '').trim();

    console.log(cleanOrdId);

    await page.getByRole("button",{name:"Click To Download Order Details in CSV"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"  ORDERS"}).click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByText(cleanOrdId)).toBeVisible();
    console.log(cleanOrdId);

});

