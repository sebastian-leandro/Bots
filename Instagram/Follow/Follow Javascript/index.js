import { config } from 'dotenv';
import puppeteer from "puppeteer";
import { existsSync } from "fs";
import { writeFile, readFile } from "fs/promises";

config();
const randomTime = () => Math.floor(Math.random()*(7922 - 5322 + 1)) + 5322;
const sleep = (time = randomTime()) => new Promise((r) => setTimeout(r, time));
let counter = 0;
let randomCounter = 0;

async function init(){
    try{
        const proxyServer = '20.205.61.143:80';
        const browser = await puppeteer.launch({headless:false, slowMo:50, args: ['--lang=en-US,en']});
        const page = await browser.newPage();
        if(existsSync('./cookies.json')){
            try{
                const cookiesStr = await readFile('./cookies.json', 'utf-8');
                const cookies = JSON.parse(cookiesStr);
                for(let cookie of cookies){
                    await page.setCookie(cookie);
                }
            }catch(e){console.error(`There was a problem trying to parse the cookies: ${e}`);}
        } return page;
    }catch(e){console.error(`There was an error initializing the browser: ${e}`)}
}

async function isLogged(page){
    try{await page.waitForSelector('div._a9-v',{timeout:5000}); return true;}catch(e){return false}
}

async function login(page){
    try{
        await page.goto('https://instagram.com');
        await sleep();
        const isLoggedIn = await isLogged(page);
        if(!isLoggedIn){
            await page.type("input._aa4b._add6._ac4d[aria-label='Phone number, username, or email']", process.env.USERNAME);
            await sleep();
            await page.type("input._aa4b._add6._ac4d[aria-label='Password']", process.env.PASSWORD);
            await sleep();
            await (await page.$('button._acan._acap._acas._aj1-')).click();
            await sleep();
            const cookies = await page.cookies();
            await writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
        }
    }catch(e){console.error(`There was an error trying to login: ${e}`);}
}

async function getFollowersList(page){
    try{
        await sleep();
        await page.goto(`https://instagram.com/${process.env.ACCOUNT}/followers`);
        await sleep();
    }catch(e){console.error(`There was a problem trying to get the followers list: ${e}`);}
}

async function scroll(page) {
    try {
        await page.evaluate(() => {
            const scroller = document.querySelector('._aano');
            scroller.scrollTop += 250;
        });
    } catch(e) {
        console.error(`There was a problem trying to scroll down: ${e}`);
    }
}

let users;

if (existsSync('./users.json')) {
    const nameStr = await readFile('./users.json', 'utf-8');
    users = new Set(JSON.parse(nameStr));
}else {
    users = new Set();
}

async function saveUsers(users){
    try{
        await writeFile('./users.json', JSON.stringify([...users]));
        console.log('Users saved');
    }catch(e){console.error(`Failed to save user: ${e}`)}
}

async function follow(page){
    let btns = await page.$x("//button[contains(@class, '_acan') and contains(@class, '_acap') and contains(@class, '_acas') and contains(@class, '_aj1-')][./div//div[text()='Follow']][not(./div//div[text()='Following'])]");
    let triggerValue = Math.floor(Math.random() * 9) + 12;
    btns.splice(0,1);

    while(btns.length === 0){
        await scroll(page);
        await sleep();
        btns = await page.$x("//button[contains(@class, '_acan') and contains(@class, '_acap') and contains(@class, '_acas') and contains(@class, '_aj1-')][./div//div[text()='Follow']][not(./div//div[text()='Following'])]");
        btns.splice(0,1);
    }
    while(btns.length > 0 && counter <= 400){

        for(let btn of btns){
            let span = await btn.$x('../../../div[2]/div/div/div/span/div/a/div/div/span');
            if(span.length === 0) span = await btn.$x('../../../div[2]/div/div/div/div/div/a/div/div/span');
            const username = await page.evaluate(span => span.innerText, span[0]); 
            if(!users.has(username)){
                try{
                    await btn.click();
                    counter++;
                    console.log(counter);
                    users.add(username);
                    await saveUsers(users);
                }catch(e){console.error(`There was a problem finding the buttons ${e}`)}
                if (randomCounter === triggerValue) {
                    console.log("Taking a break.")
                    await sleep(Math.floor(Math.random() * 175188 + 185322));
                    randomCounter = 0;
                    triggerValue = Math.floor(Math.random() * 9) + 12;
                }
                randomCounter++; 
                await sleep(Math.floor(Math.random()*(91522 - 60849 + 1) + 60849));
            }else {
                console.log(`Skipping ${username}`);
            }
        }
        await scroll(page);
        await sleep();
        btns = await page.$x("//button[contains(@class, '_acan') and contains(@class, '_acap') and contains(@class, '_acas') and contains(@class, '_aj1-')][./div//div[text()='Follow']][not(./div//div[text()='Following'])]");
        btns.splice(0,1);
    }
}

(async () => {
    const page = await init();
    await login(page);
    await getFollowersList(page);
    await follow(page);
})();