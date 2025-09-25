class LoginPage {
    constructor(page)
    {
        this.page = page;  // optional, if you want
        this.loginbtn = page.locator("(//input[@id='login'])[1]");
        this.email = page.locator("(//input[@id='userEmail'])[1]");
        this.pswd = page.locator("(//input[@id='userPassword'])[1]");
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    // Method must be inside the class
    async validLogin(username, password)
    {
        await this.email.fill(username);
        await this.pswd.fill(password);
        await this.loginbtn.click();
        await page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };
