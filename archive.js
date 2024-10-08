// ==UserScript==
// @name         Akhtaf n Tmazirt
// @namespace    http://tampermonkey.net/
// @version      2024-02-08
// @description  try to take over the world!
// @author       Hassan Aguezoum
// @match        https://bus-med.1337.ma/
// @icon         https://source.leet.ma/favicon.ico
// @grant        none
// ==/UserScript==

'use strict';
const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

const csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
let traget_id;
const captcha_0 = document.getElementsByName("captcha_0")[0].value;
const reservBtn = document.querySelector("#note_form > div.modal-body > img");
let captcha_1;
let captchaTime;
let time;
let timeToRun = new Date();
let divs = document.querySelectorAll('.card:not(.locked)');
let timeNow = new Date();

for (let i = 0; i < divs.length; i++) {
    console.log(divs[i].querySelector(".place").innerText.includes("Martil", "Ahriq"));
    if (divs[i].querySelector(".place").innerText.includes("Martil", "Ahriq")) {
        traget_id = divs[i].querySelector("div.card > div.interact_container > button:nth-child(1)") ?
            divs[i].querySelector("div.card > div.interact_container > button:nth-child(1)").attributes[3].value : null;
    }
    else {
        traget_id = null;
    }
}
// get ticket --------->

fetch("https://bus-med.1337.ma/").then((res) => { return res.text() }).then(data => {
    let domparser = new DOMParser();
    let html = domparser.parseFromString(data, "text/html");
    return (html);
}).then(htmlTree => {
    let img = htmlTree.querySelector("#note_form > div.modal-body > img");
    console.log(img.src);
}).catch(err => {
    console.error(err);
});

// get ticket --------->

reservBtn.addEventListener("click", () => {
    captchaTime = prompt("Please enter: ");
    console.log(captchaTime);
    captcha_1 = captchaTime.split(":")[0];
    time = captchaTime.split(":")[1] ? captchaTime.split(":")[1] : timeNow.getHours();

});

let interval = setInterval(() => {
    if (time == timeToRun.getHours()) {
        clearInterval(interval);
        fetchMe();
    }
}, 10);

function fetchMe() {

    console.log("fetching");
    console.log(`target id ${traget_id} | token ${csrfmiddlewaretoken} | captcha0 ${captcha_0} | captcha1 ${captcha_1} | time : ${time}`);
    setTimeout(() => {
        fetch("https://bus-med.1337.ma/create-reservation", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded",
                "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "login_state=65YL5J1RGPLL878AJX0PMM4; csrftoken=fAypqVB0SAvholQTl2jjFKOyJ0dQuQyQ; sessionid=vqxgj6amzjow5wxk9pfq5pzyjszzg28y",
                "Referer": "https://bus-med.1337.ma/",
                "Referrer-Policy": "same-origin"
            },
            "body": `csrfmiddlewaretoken=${csrfmiddlewaretoken}&traget_id=${traget_id}&captcha_0=${captcha_0}&captcha_1=${captcha_1}`,
            "method": "POST"
        }).then(res => {
            console.info(res);
        });
        console.log("Done");
    }, 1000);
}

console.log("Script is running ...");