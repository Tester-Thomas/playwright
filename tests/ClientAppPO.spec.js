const {test,expect} = require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage');
const {DashboardPage} = require('../PageObjects/DashboardPage');

test("Test Login Page", async ({page})=>
{
  const email = "thomazz@airpay.technology";
  const pswd = "Thomas@2010";
  const productName = "Zara Coat 4";

  const obj = new LoginPage(page);
  await obj.reDirection();
  await obj.validLogin(email,pswd);

  const obj1 = new DashboardPage(page);
  await obj1.productSearch(productName);
  await obj1.NavigateCart();
  
});
