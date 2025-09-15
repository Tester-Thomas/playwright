const {test,expect} = require("@playwright/test");


test("Calendar Handling", async ({page})=>
{
    const monthNumber = "6";
    const date = "16";
    const year = "2028";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator("button[class='react-calendar__navigation__label']").click();
    await page.locator("button[class='react-calendar__navigation__label']").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months_month").nth(Number(monthNumber)-1).click();
    await page.locator(".react-calendar__viewContainer").getByText(date).click();
});