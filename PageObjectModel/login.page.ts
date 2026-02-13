import {Page, Locator, expect} from "@playwright/test";
export class LoginPage {
    private page: Page;
    private emailInp: Locator;
    private passInp: Locator;
    private loginBtn: Locator;
    private headerData: Locator;

    constructor(page: Page){
        this.page=page;
        this.emailInp = page.locator('input[type="email"][name="tb1"]');
        this.passInp = page.locator('input[type="password"][name="tb2"]');
        this.loginBtn = page.locator('input[type="submit"][value="Login"]');
        this.headerData = page.getByRole('heading', {name:"EthicalPay's Here to Serve!"});
    }

    async navigate(){
        await this.page.goto("https://ethicalpay2.koyeb.app");
    }
    async inputEmail(email: string){
        await expect(this.emailInp).toBeVisible();
        await this.emailInp.fill(email);
    }
    async inputPWD(pwd: string){
        await expect(this.passInp).toBeVisible();
        await this.passInp.fill(pwd);
    }
    async clickLoginBtn(){
        await expect(this.loginBtn).toBeEnabled();
        await this.loginBtn.click();
    }

    async verifyRedirectedURL(url: string){
        await expect(this.page).toHaveURL(url);
    }
    async verifyNextPageData(){
        await expect(this.headerData).toBeVisible();
        await expect(this.headerData).toHaveText(/Ethical/);
    }

    async loginHandler(email: string, pwd: string, url:string){
        await this.inputEmail(email);
        await this.inputPWD(pwd);
        await this.clickLoginBtn();
        await this.verifyRedirectedURL(url);
        await this.verifyNextPageData();
    }
}