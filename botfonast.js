/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   botfonast.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: codespace <codespace@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/02/29 09:48:38 by codespace         #+#    #+#             */
/*   Updated: 2024/02/29 12:46:35 by codespace        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Path: botfonast.js
const parentContainer = document.querySelector("body > div.maincontainer > div");
const imageContainer = document.createElement("div");
imageContainer.style.display = "flex";
imageContainer.style.justifyContent = "center";
imageContainer.style.alignItems = "center";


let cookies = 'login_state=5RDUM953SFFF95M7G5WDH1Q; csrftoken=WgujQBJ9y9bi5cYWyGDu3KueMa7aVaXv; sessionid=543tbr724aw5dro62z4lvzhucxfindj0';
let csrfmiddlewaretoken;
let captTamzwarot;
let captcha_0;
let texto;



async function fetchImage() {
    console.log("fetching image ...");
    try {
        const response = await fetch("https://bus-med.1337.ma/", {
            method: "GET",
            headers: {
                Cookie: cookies
            }
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
    let image = document.createElement("img");
    image.classList.add("imagy");
    image.style.width = "150px";
    image.style.position = "absolute";
    image.style.top = "10%";
    image.style.left = "50%";
    image.style.transform = "translate(-50%, -50%)";
    image.style.border = "1px solid #000";
    image.src = await fetchImage();
    imageContainer.appendChild(image);
    parentContainer.appendChild(imageContainer);
    placeInput();
}

function placeInput() {
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("takcholt");
    input.style.width = "150px";
    input.style.position = "absolute";
    input.style.top = "20%";
    input.style.left = "50%";
    input.style.transform = "translate(-50%, -50%)";
    input.style.border = "1px solid #000";
    parentContainer.appendChild(input);
    input.addEventListener("input", (e) => {
        if (e.target.value.length === 4) {
            getTaxi(e.target.value);
        }
    });

}

function getTaxi(texto) {
    fetch("https://bus-med.1337.ma/create-reservation", {
        "headers": {
            Cookie: cookies,
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
        "body": `csrfmiddlewaretoken=${csrfmiddlewaretoken}&traget_id=50&captcha_0=${captcha_0}&captcha_1=${texto}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(res => res.text()).then(console.log(`Done ✅ \n csrfmiddlewaretoken=${csrfmiddlewaretoken}&traget_id=50&captcha_0=${captcha_0}&captcha_1=${texto}`)).catch(err => console.error("Error: ", err));

}

placeImage();
// getElementsByName("csrfmiddlewaretoken")[0].value;
// "body": `csrfmiddlewaretoken=${csrfmiddlewaretoken}&traget_id=50&captcha_0=${captcha_0}&captcha_1=${texto}`,