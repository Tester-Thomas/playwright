const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage');

test("Client app login", async ({ page }) =>{
  const uname = "thomazz@airpay.technology";
  const pswd = "Thomas@2010";

  const obj = new LoginPage(page);
  obj.goTo();
  obj.validLogin(uname,pswd);
});
