

const { Telegraf, Input } = require('telegraf');
const { message } = require('telegraf/filters')
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const cookies = 'login_state=5RDUM953SFFF95M7G5WDH1Q; csrftoken=WgujQBJ9y9bi5cYWyGDu3KueMa7aVaXv; sessionid=543tbr724aw5dro62z4lvzhucxfindj0';
const bot = new Telegraf('5602884622:AAF7mQnSWlasSB0FWYPmhjy9YHkcRpaDznk');
let csrfmiddlewaretoken;
let captcha_0;
let reservBtn;
let traget_id;
let captcha_1;
let captchaTime;
let time;
let timeToRun = new Date();
let timeNow = new Date();
let img_url;

// test bot --------->
bot.start((ctx) => ctx.reply('Welcome to Hassan Bot!'));
// bot.command(("lol"), ctx => { ctx.reply("Please enter: "); });

// -------------------------------------------------------------------------->
// 4 = 30;
bot.command("captcha", async (ctx) => {
    const photoURL = await fetchImage(cookies);
    await ctx.replyWithPhoto(Input.fromURL(photoURL, "photo.png"));
});
// -------------------------------------------------------------------------->
bot.on("text", (ctx) => {
    const text = ctx.message.text.split(":")[0];
    time = ctx.message.text.split(":")[1] ? ctx.message.text.split(":")[1] : timeNow.getHours();

    let interval = setInterval(() => {
        if (time == timeToRun.getHours()) {
            clearInterval(interval);
            fetchMe(text);// get ticket
            ctx.reply("Done ✅!");
        }
    }, 10);
});

async function fetchImage(cookies) {
    try {
        const response = await fetch("https://bus-med.1337.ma/", {
            method: "GET",
            headers: {
                Cookie: cookies
            }
        });

        const data = await response.text();
        const $ = cheerio.load(data);

        csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").attr("value");
        captcha_0 = $("input[name='captcha_0']").attr("value");
        const img_url = $("img").attr("src");

        console.log(`with Cheerio :: srfmiddlewaretoken: ${csrfmiddlewaretoken} | captcha_0: ${captcha_0} | captcha_1: ${captcha_1} | img_utl: ${img_url}`);

        return (`https://bus-med.1337.ma/${img_url}`);
    } catch (error) {
        console.error("Error:", error);
    }
}

function fetchMe(text) {
    fetch("https://bus-med.1337.ma/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: cookies
        },
        "body": `csrfmiddlewaretoken=${csrfmiddlewaretoken}&traget_id=30&captcha_0=${captcha_0}&captcha_1=${text}`,
    })
        .then((res) => {
            return res;
        }
        )
        .then(() => {
            console.log("Done from server ...");
        });
}
bot.launch();
console.log("Script is running ...");