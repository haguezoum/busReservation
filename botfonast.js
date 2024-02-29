/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   botfonast.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: codespace <codespace@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/02/29 09:48:38 by codespace         #+#    #+#             */
/*   Updated: 2024/02/29 11:27:53 by codespace        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


// document.body.style.visibility = "hidden";
const parentContainer = document.querySelector("body > div.maincontainer > div");
const imageContainer = document.createElement("div");
imageContainer.style.display = "flex";
imageContainer.style.justifyContent = "center";
imageContainer.style.alignItems = "center";


let cookies = 'login_state=5RDUM953SFFF95M7G5WDH1Q; csrftoken=WgujQBJ9y9bi5cYWyGDu3KueMa7aVaXv; sessionid=543tbr724aw5dro62z4lvzhucxfindj0';
let csrfmiddlewaretoken;
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
        console.log("csrfmiddlewaretoken:", csrfmiddlewaretoken);
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
    image.style.top = "5%";
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
    input.style.top = "15%";
    input.style.left = "50%";
    input.style.transform = "translate(-50%, -50%)";
    input.style.border = "1px solid #000";
    parentContainer.appendChild(input);
    input.addEventListener("input", (e) => {
        if (e.target.value.length === 4) {
            for (let i = 0; i < 4; i++) {
                console.log("Done!")
            }
        }
    });

}
placeImage();
// getElementsByName("csrfmiddlewaretoken")[0].value;