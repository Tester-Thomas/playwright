class LoginPage
{
  constructor(page) {
    this.page = page;
    this.loginBtn = page.locator("#login");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async validLogin(username, password) {
    // ✅ Use locators directly, no ()
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}

module.exports = { LoginPage };
