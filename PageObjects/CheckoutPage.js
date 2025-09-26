const { expect } = require("@playwright/test");

class CheckoutPage
{
    constructor(page)
    {
        this.page = page;
        this.cartproduct = page.locator("h3:has-text('ADIDAS ORIGINAL')");
        this.checkoutBtn = page.locator("li[class='totalRow'] button[type='button']");
        this.country = page.locator("[placeholder*='Country']");
        this.cvvN = page.locator(".field [type='text']").nth(1);
        this.mail = page.locator(".user__name label");
        this.cardNo = page.locator(".text-validated").first();
        this.cardName = page.locator(".field [type='text']").nth(2);
        this.coupons = page.locator(".field [type='text']").nth(3);
        this.checkoutSubmit = page.locator(".action__submit");
    }

    async checkProduct(itemname)
    {
        const bool = this.cartproduct.isVisible();
        expect(bool).toBeTruthy();
    }

    async checkoutBtns()
    {
        await this.checkoutBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async countrySearch(countryName)
    {
        await this.country.pressSequentially(countryName);
        const options = this.page.locator(".ta-results");
        await options.waitFor();
        const optioncount = await options.locator("button").count();
        console.log("Options count is:" +optioncount);

        for(let i=0; i<=optioncount; ++i)
        {
            const text = await options.locator("button").nth(i).textContent();
            if(text === " Indonesia")
            {
                await options.locator("button").nth(i).click();
                break;
            }
        }
    }

    async cvv(cvvNumber)
    {
        await this.cvvN.fill(cvvNumber);
    }

    async emailCheck(uname)
    {
        expect(this.mail).toHaveText(uname);
    }

    async expiry(months,days)
    {
        const month = this.page.locator("select.input").first();
        await month.selectOption(months);

        const day = this.page.locator("select.input").last();
        await day.selectOption(days);
    }

    async card(cno,cardN)
    {
        await this.cardNo.fill(cno);
        await this.cardName.fill(cardN);
    }

    async coupon(code,couponmsg)
    {
        await this.coupons.fill(code);
        await this.page.locator("[type='submit']").click();
        await expect(this.page.locator(".ng-star-inserted").nth(2)).toHaveText(couponmsg);
    }

    async submitBtn()
    {
        await this.checkoutSubmit.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {CheckoutPage};