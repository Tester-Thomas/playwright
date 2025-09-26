const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../PageObjects/LoginPage');
const {DashboardPage} = require('../PageObjects/DashboardPage');
const {CheckoutPage} = require('../PageObjects/CheckoutPage');

test.only("Test app", async ({ page }) => {
  const uname = "thomazz@airpay.technology";
  const pswd = "Thomas@2010";
  const itemname = "ADIDAS ORIGINAL";   // <--- add this
  const countryName = "ind";
  const cvvNumber = "234";
  const months = "03";
  const days = "10";
  const cno = "12345678";
  const cardN = "Thomas Francis P"
  const code = "rahulshettyacademy";
  const couponmsg = "* Coupon Applied";

  const obj = new LoginPage(page);
  await obj.reDirection();
  await obj.validLogin(uname, pswd);

  const obj1 = new DashboardPage(page);
  await obj1.productSearch(itemname);
  await obj1.NavigateCart();

  const obj2 = new CheckoutPage(page);
  await obj2.checkProduct(itemname);
  await obj2.checkoutBtns();
  await obj2.countrySearch(countryName);
  await obj2.cvv(cvvNumber);
  await obj2.emailCheck(uname);
  await obj2.expiry(months,days);
  await obj2.card(cno,cardN)
  await obj2.coupon(code,couponmsg);
  await obj2.submitBtn();
});

