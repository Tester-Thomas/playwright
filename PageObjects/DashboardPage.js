class DashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productName = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async productSearch(productName)
    {
        const title = await this.productName.allTextContents();
        console.log(title);
        const count = await this.products.count();
        
            for(let i=0; i<count; ++i)
            {
                const name = await this.products.nth(i).locator('b').textContent();
                if (name.trim() === productName)
                    {
                     // await cards.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
                        await this.products.nth(i).locator('text=Add To Cart').click();
                        break;
                    }
            }
    }

    async NavigateCart()
    {
        await this.cart.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports ={DashboardPage};