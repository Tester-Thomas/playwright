const { test, expect } = require('@playwright/test');
const { LoginPage } = require("../PageObjects/LoginPage");

test("Client app login", async ({ page }) => {
  const uname = "thomazz@airpay.technology";
  const pswd = "Thomas@2010";

  const loginpage = new LoginPage(page);

  await loginpage.goTo();                     // ✅ await
  await loginpage.validLogin(uname, pswd);    // ✅ await

  await page.screenshot({ path: '' }); // ✅ await + path
});
