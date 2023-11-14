import { config } from "dotenv";
import puppeteer from "puppeteer";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

// DOTENV
config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

// Timers 
const randomTimer = () => Math.floor(Math.random() * (10022 - 4196)) + 4196;
const sleep = (time) => new Promise((r) => setTimeout(r, time || randomTimer()));

// Puppeteer
async function init() {
    const browser = await puppeteer.launch({headless: false, slowMo:50, args: ["--lang=en"]});
    const page = await browser.newPage();
    if(existsSync('./cookies.json')) {
        try {
            const cookiesStr = await readFile('./cookies.json', 'utf-8');
            const cookies = JSON.parse(cookiesStr);
            for(let cookie of cookies) {
                await page.setCookie(cookie);
            }
        }catch(e)
            {console.error(`There was a problem trying to set the cookies: ${e}`)
        }finally {
            await page.goto('https://instagram.com/');
        }
    }
    return { browser, page }
}

// Check if is login or not
async function isLoggedIn(page) {
    try {
        await page.waitForSelector('div._aagx', {timeout: 5000})
        return true
    }catch(e){return false}    
}

// Login Function
async function login(page, browser) {
    if(username && password && username.length > 0 && password.length > 0){
        try{
            await sleep();
            await page.type("input._aa4b._add6._ac4d[aria-label='Phone number, username, or email']",username);
            await page.type("input._aa4b._add6._ac4d[aria-label='Password']",password);
            await page.keyboard.press('Enter');
            await sleep();
            try{
                const cookiesStr = await page.cookies();
                if(cookiesStr && cookiesStr.length > 0) {
                    const cookies = JSON.stringify(cookiesStr);
                    await writeFile('./cookies.json', cookies, 'utf-8');
                }
            }catch(e){console.error(`Can't save cookies: ${e}`)}
            await sleep();
        }catch(e){console.error(`There was a problem trying to login: ${e}`)}
    }else {
        console.error(`Username and password from the dotenv file is incorrect or is empty`);
        browser.close();
    }
}

// Go to Followings users
async function getFollowing(page) {
    try{
        await page.goto(`https://instagram.com/${username}/following`);
        await sleep();
    }catch(e){console.error(`Can't connect to the following list: ${e}`)}
}

// We load the users just in case that it's some users that we don't want to stop follow
async function loadUsers() {
    try{
        if(existsSync('./users.json')){
            const users = await readFile('./users.json', 'utf-8');
            return new Set(JSON.parse(users));
        }else {return new Set();}
    }catch(e){console.error(e);}
}

// Scroll function 
async function scroller(page) {
    await page.evaluate(() => {
        const scroller = document.querySelector('._aano');
        if(scroller) scroller.scrollTop += 250;
    })
    await sleep();
}

// Start Unfollow
async function* unFollow(page, users) {
    // Counters
    let counter = 0; // Number of users unfollowed
    let scrollCounter = 0; // Number of how many times scroll just in case we are in the end of the list 
    let triggerValue = Math.floor(Math.random()* 9) + 12; // A random number between 12 and 20 to make randoms waits

    while(counter <= 200){
        const btns = await page.$x("//button[contains(@class, '_acan') and contains(@class, '_acap') and contains(@class, '_acat') and contains(@class, '_aj1-')][./div//div[text()='Following']][not(./div//div[text()='Follow'])]")
        if(btns.length === 0){
            scrollCounter++
            if(scrollCounter >= 5){
                yield {action: "closeBrowser"};
                return;
            }else {
                yield {action: "scroll"};
                continue;
            }
        }
        for(const btn of btns) {
            let span = await btn.$x('../../../div[2]/div/div/div/span/div/a/div/div/span');
            if (span.length === 0) span = await btn.$x('../../../div[2]/div/div/div/div/div/a/div/div/span');
            const username = await page.evaluate((node) => {
                if (node instanceof HTMLElement) {return node.innerText;}return null;}, span[0]);
            try{
                if(!users.has(username)){
                    await btn.click();
                    try{
                        await sleep();
                        const confirm = await page.waitForSelector('button._a9--._a9-_', {timeout: 3000})
                        if(confirm) await page.click('button._a9--._a9-_');
                    }finally{
                        counter++;
                        scrollCounter = 0;
                        console.log(`Unfollow Count: ${counter}`);
                        await sleep(Math.floor(Math.random()* 96520 - 58622) + 58622);
                        yield {action: "unfollowed", counter, username: "...",};
                        if(counter % triggerValue === 0){
                            yield {action: "sleep", duration: Math.floor(Math.random()* 360522 - 175820)+ 175820};
                        }else {
                            yield {action: "sleep", duration: Math.floor(Math.random()*(91522 - 59522) + 1) + 59522};
                        }
                    }
                }
            }catch(e){
                yield {action: "error", message: e.message};
            }
        }
    }
}


// Anonimus function
(async () => {
    const { browser, page } = await init();
    const isLogged = await isLoggedIn(page);
    if(!isLogged) await login(page, browser);
    await getFollowing(page);
    const users = await loadUsers();
    const Unfollower = unFollow(page, users);
    // Switching states of the generator function
    for await (const state of Unfollower) {
        switch (state.action) {
            case "scroll":
                await scroller(page);
                break;
            case "sleep":
                const minutes = Math.floor(state.duration / 60000);
                const seconds = Math.floor((state.duration % 60000) / 1000);
                minutes <= 1 ? console.log(`Waiting ${minutes} minute and ${seconds} seconds`) : console.log(`Waiting ${minutes} minutes and ${seconds} seconds`)
                await sleep(state.duration);
                break;
            case "closeBrowser":
                await browser.close();
                return;
            case "error":
                await browser.close();
                console.error(state.message);
                break;
        }
    }
})();
