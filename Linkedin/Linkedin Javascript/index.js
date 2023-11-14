import puppeteer from "puppeteer";
import {config} from 'dotenv';
import {existsSync, readFileSync, writeFileSync} from 'fs'

config();
let randomTime = Math.floor(Math.random()*(9288 - 4522 + 1) + 4522);
let counter = 0;
let randomCounter = 0;
const sleep = (time) => new Promise(r => setTimeout(r, time || randomTime)); 

async function initBrowser() {
    const proxy = ''
    const browser = await puppeteer.launch({headless:false, slowMo:50, /*args:[`--proxy-server=${proxy}`]*/});
    const page = await browser.newPage();
    return page;
}

async function BrowserTo(page) {
    await page.goto('https://linkedin.com');
    await sleep();
    if(existsSync('./cookies.json')){
        const cookiesStr = JSON.parse(readFileSync('./cookies.json', 'utf-8'));
        await page.setCookie(...cookiesStr);
        await sleep();
    }else{
        (await page.type('#session_key', process.env.USERNAME));
        await sleep();
        (await page.type('#session_password', process.env.PASSWORD));
        await sleep();
        (await page.press('button.btn-md.btn-primary.flex-shrink-0.cursor-pointer'))
        await sleep();
        const cookies = await page.cookies();
        writeFileSync('./cookies.json', JSON.stringify(cookies, null, 2));
    }
    await page.goto('https://linkedin.com/mynetwork/')
    await sleep();
}

async function modal(page) {
    try {
        await page.evaluate(() => {
            const btn = document.querySelector('.artdeco-button.ip-fuse-limit-alert__primary-action.artdeco-button--2.artdeco-button--primary.ember-view[aria-label="Entendido"]');
            if(btn){btn.click();}else{console.error("I can't find the modal button")}
            console.log('I click the modal');
        })        
    }catch(e){console.error(`there was a problem trying to find the modal: ${e}`)}
}

async function scroll(page) {
    try {
        await page.evaluate(() => {
            const scrollWindow = document.querySelector('/html/body/div[5]/div[3]/div/div/div/div/div[2]/div/div/main/div[3]/section/section/section/div/div[1]');
            if(scrollWindow){scrollWindow.scrollTop += 300}
        })
        btns = await page.$x("//footer//button[contains(@class, 'artdeco-button') and contains(@class, 'artdeco-button--2') and contains(@class, 'artdeco-button--secondary') and contains(@class, 'ember-view') and contains(@aria-label, 'conectar')]")
    }catch(e){console.error(`There was a problem trying to scroll down ${e}`)}
}

async function connect(page){
    try {
        const btns = await page.$x("//footer//button[contains(@class, 'artdeco-button') and contains(@class, 'artdeco-button--2') and contains(@class, 'artdeco-button--secondary') and contains(@class, 'ember-view') and contains(@aria-label, 'conectar')]");
        let triggerValue = Math.floor(Math.random() * 9) + 12;
        for(let btn of btns){
            if(btn === 0)   await scroll(page)
            await btn.click();
            counter++;
            console.log(counter)
            if (counter === 100) break;
            randomCounter++;
            if (randomCounter === triggerValue) {
                console.log("Taking a break.")
                await sleep(Math.floor(Math.random() * 175188 + 185322));
                randomCounter = 0;
                triggerValue = Math.floor(Math.random() * 9) + 12;
            }
            const modalWindow = await page.$("div.artdeco-modal__content.ember-view")
            if(modalWindow) await modal(page);
            await sleep(Math.floor(Math.random()*(48522 - 32987 + 1) + 32987));
            
        }
    }catch(e){
        try
            {await scroll(page)
        }catch(e){console.error(`There was a problem trying to scroll the users: ${e}`)}}
}

(async () => {
    const page = await initBrowser();
    await BrowserTo(page);
    await connect(page);
})();