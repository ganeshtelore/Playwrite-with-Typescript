import { LoginPage } from "../PageObjectModel/login.page";
import {test, expect} from "@playwright/test";
import dotenv from "dotenv";
import LoginPageData from "../TestData/LoginPage/LoginPageData.json";

dotenv.config();

const email = "ganeshtelore4@gmail.com";
const pwd = "Ganesh@04";
//const url = "https://ethicalpay2.koyeb.app/home";

for(const data of LoginPageData) {
    test(`Verify Login Functionality with Email ${data.email}`, async({page})=> {
        const loginObj = new LoginPage(page);
        await loginObj.navigate();
        const url = process.env.REDIRECTION_URL.toString();
        await loginObj.loginHandler(data.email, data.pwd, url);
    })
}