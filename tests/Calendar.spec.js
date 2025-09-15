const {test,expect} = require("@playwright/test");


test("Calendar Handling", async ({page})=>
{
    const monthNumber = "6";
    const date = "16";
    const year = "2028";
    const ExpectedList = [monthNumber,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator("button[class='react-calendar__navigation__label']").click();
    await page.locator("button[class='react-calendar__navigation__label']").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months").getByRole("button").nth(Number(monthNumber-1)).click();
    await page.locator(".react-calendar__month-view").getByText(date).click();

    const inputs = page.locator(".react-date-picker__inputGroup__input");

    for(let i=0; i<ExpectedList.length; i++)
    {
        const values = await inputs.nth(i).inputValue();
        console.log();
        expect(values).toEqual(ExpectedList[i]);
    }
});