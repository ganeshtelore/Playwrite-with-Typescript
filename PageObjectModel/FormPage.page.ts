import { Page, Locator, BrowserContext, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export class FormPage {
  private page: Page;
  private context: BrowserContext;

  private radioBtn: Locator;
  private textBox: Locator;
  private countryOption: Locator;
  private selectBox: Locator;
  private checkBox1: Locator;
  private openWindowBtn: Locator;
  private newTabButton: Locator;
  private textbox2: Locator;
  private alertBtn: Locator;
  private confirmBtn: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.radioBtn = page.locator('input[type="radio"][value="radio1"]');
    this.textBox = page.getByRole("textbox", {
      name: "Type to Select Countries",
    });
    this.countryOption = page.locator("#ui-id-3");
    this.selectBox = page.getByRole("combobox");
    this.checkBox1 = page.locator(
      'input[type="checkbox"][value="option1"]'
    );
    this.openWindowBtn = page.getByRole("button", {
      name: "Open Window",
    });
    this.newTabButton = page.getByText("Open Tab");
    this.textbox2 = page.locator('#name');
    this.alertBtn = page.locator('input[type="submit"][value="Alert"]');
    this.confirmBtn = page.locator('input[type="submit"][value="Confirm"]')
  }

  async navigate() {
    await this.page.goto(process.env.BASE_URL!);
  }

  async fillForm(name:string) {
    await this.radioBtn.click();

    await this.textBox.fill("India");
    await this.countryOption.click();

    await this.selectBox.selectOption({ label: "Option1" });

    await this.checkBox1.check(); 

    // Promise.all() ensures every action inside it should execute simultaneously. it ensures start listening before executing.
    const [newPage] = await Promise.all([
      this.context.waitForEvent("page"),
      this.openWindowBtn.click(),
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://www.qaclickacademy.com/");
    await newPage.close();
    const[newTab] = await Promise.all([
        this.context.waitForEvent("page"),
        this.newTabButton.click(),
    ]);
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL("https://www.qaclickacademy.com/");
    await newTab.close();
    this.page.once('dialog', async dialog => {
    await expect(dialog.type()).toBe('alert');
    await expect(dialog.message())
      .toBe(`Hello ${name}, share this practice page and share your knowledge`);
    await dialog.accept();
  });
  await this.textbox2.fill(name);
  await this.alertBtn.click();
  this.page.once('dialog', async dialog=>{
    await expect(dialog.type()).toBe('confirm');
    await expect(dialog.message()).toBe(`Hello ${name}, Are you sure you want to confirm?`);
    await dialog.accept();
  });
  await this.textbox2.fill(name);
  await this.confirmBtn.click();
  }
}
