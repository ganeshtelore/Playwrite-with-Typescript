import {test, expect} from "@playwright/test";
import { FormPage } from "../PageObjectModel/FormPage.page";

test("Validating automation of form elements", async({page,context})=> {
    const obj = new FormPage(page,context,expect);
    await obj.navigate();
    await obj.fillForm("Ganesh Telore");
})