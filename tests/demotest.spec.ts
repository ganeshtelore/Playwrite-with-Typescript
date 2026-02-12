import {test, expect} from "@playwright/test"

// Test for Redirecting to page & checking the page title
test("Verify Redirection & Title", async({page})=>{
    await page.goto("https://ethixionlite.vercel.app");
    await expect(page).toHaveURL("https://ethixionlite.vercel.app");
    let title = await page.title();
    if (title === "Ethixion") {
        console.log("Title Matched!");
        console.log(title);
    }else{
        console.log("Title does not matches!!!");
    }
    await expect(page).toHaveTitle("Ethixion");
    await page.waitForTimeout(1000);
});

//Test for filling for info for login
test("Verify user able to login with correct credentials", async({page})=>{
    await page.goto("https://ethicalpay2.koyeb.app");
    const username = page.locator('input[type="email"][name="tb1"]');
    await expect(username).toBeVisible();
    await username.fill("ganeshtelore4@gmail.com");

    const password = page.locator('input[type="password"][name="tb2"]');
    await expect(password).toBeVisible();
    await password.fill("Ganesh@04");
    
    const submitBtn = page.locator('input[type="submit"][value="Login"]');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();
    await expect(page).toHaveURL("https://ethicalpay2.koyeb.app/home");
    const header = page.getByRole('heading', {name:"EthicalPay's Here to Serve!"});
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/Ethical/);
})