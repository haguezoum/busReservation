// ==UserScript==
// @name         Botfonast
// @namespace    http://tampermonkey.net/
// @version      2024-03-01
// @description  try to take over the world!
// @author       Hassan Aguezoum
// @match        https://bus-med.1337.ma/
// @icon         https://media.istockphoto.com/id/1366823352/vector/national-flag-of-palestine-eps-file-palestinian-flag-vector-file.jpg?s=2048x2048&w=is&k=20&c=N6OvLQWVgCuG9-UW4cRb_WJWStghfm0GF8K9igGpif4=
// @grant        none
// ==/UserScript==

// Path: botfonast.js
(function() {
const parentContainer = document.querySelector("body > div.maincontainer > div");
const imageContainer = document.createElement("div");

imageContainer.style.display = "flex";
imageContainer.style.justifyContent = "center";
imageContainer.style.alignItems = "center";

let csrfmiddlewaretoken;
let captcha_0;
let captcha;

const timeId =
{
    "11": 9,
    "12": 21,
    "13": 52,
    "14": 50,
    "16": 30,
    "17": 46,
    "18": 33,
    "19": 40,
    "20": 41,
    "21": 29,
    "22": 56, //17,
    "23": 38
}
// 53 => 21:00 (second one)
// 56 => 22:00 (second one)
async function fetchImage() {
    console.log("fetching captcha ...");
    try {
        const response = await fetch("https://bus-med.1337.ma/", {
            method: "GET",
        });

        const html = await response.text();
        let domparser = new DOMParser();
        let parsedHtml = domparser.parseFromString(html, "text/html");
        const imgElement = parsedHtml.querySelector("#note_form > div.modal-body > img");
        const img_url = imgElement ? imgElement.src : null;
        csrfmiddlewaretoken = parsedHtml.querySelector("input[name=csrfmiddlewaretoken]").value;
        captcha_0 = parsedHtml.querySelector("input[name=captcha_0]").value;
        return img_url ? img_url : null;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function placeImage() {
    console.log("Create captcha ...");
    let image = document.createElement("img");
    image.classList.add("imagy");
    image.style.width = "150px";
    image.style.position = "absolute";
    image.style.top = "10%";
    image.style.zIndex = "1000";
    image.style.left = "50%";
    image.style.transform = "translate(-50%, -50%)";
    image.style.border = "1px solid #000";
    image.src = await fetchImage();
    imageContainer.appendChild(image);
    parentContainer.appendChild(imageContainer);
    placeInput();
}

function placeInput() {
    console.log("Create input ...");
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("takcholt");
    input.style.width = "150px";
    input.style.position = "absolute";
    input.style.zIndex = "9999";
    input.style.top = "20%";
    input.style.left = "50%";
    input.style.transform = "translate(-50%, -50%)";
    input.style.border = "1px solid #000";
    parentContainer.appendChild(input);
    input.addEventListener("input", (e) => {
        if (e.target.value.length == 4) {
           captcha = e.target.value;
        }
    });

}

function sendNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body: body });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, { body: body });
            }
        });
    }
}



function FetchMe(csrfmiddlewaretoken, traget_id, captcha_0, captcha_1) {
    fetch("https://bus-med.1337.ma/create-reservation", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9,zgh-MA;q=0.8,zgh;q=0.7,ar-MA;q=0.6,ar;q=0.5,fr-FR;q=0.4,fr;q=0.3",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1"
        },
        "referrer": "https://bus-med.1337.ma/",
        "referrerPolicy": "same-origin",
        "body": `csrfmiddlewaretoken=${csrfmiddlewaretoken}&traget_id=${traget_id}&captcha_0=${captcha_0}&captcha_1=${captcha_1}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });
}

let initHour = new Date().getHours();

function executeAtSpecificHour() {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    if(hour != initHour && minute == 0 && second == 2) {
        console.log("Executing ...");
        console.log(`csrfmiddlewaretoken: ${csrfmiddlewaretoken} | traget ID: ${timeId[+(initHour + 1)]} | captcha_0: ${captcha_0} | captcha: ${captcha}`);
        FetchMe(csrfmiddlewaretoken, timeId[+(initHour + 1)], captcha_0, captcha);
        sendNotification("Reservation", "Reservation has been made successfully!");
    }
}


executeAtSpecificHour();
placeImage();

setInterval(executeAtSpecificHour, 800);
})();