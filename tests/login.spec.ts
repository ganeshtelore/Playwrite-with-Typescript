import { LoginPage } from "../PageObjectModel/login.page";
import {test, expect} from "@playwright/test";

const email = "ganeshtelore4@gmail.com";
const pwd = "Ganesh@04";
const url = "https://ethicalpay2.koyeb.app/home";

test("Verify Login Functionality", async({page})=> {
    const loginObj = new LoginPage(page);
    await loginObj.navigate();
    await loginObj.loginHandler(email, pwd, url);
})