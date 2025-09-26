class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.userName = page.locator("(//input[@id='userEmail'])[1]");
        this.password = page.locator("(//input[@id='userPassword'])[1]");
        this.loginBtn = page.locator("(//input[@id='login'])[1]");
    }

    async reDirection()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(uname,pswd)
    {
        await this.userName.fill(uname);
        await this.password.fill(pswd);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage}