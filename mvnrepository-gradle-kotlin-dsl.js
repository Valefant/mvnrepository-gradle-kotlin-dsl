// ==UserScript==
// @name         mvnrepository-gradle-kotlin-dsl
// @namespace    mvnrepository
// @version      0.1
// @description  Adds a new tab, which shows the code for downloading the dependency in gradle kotlin dsl
// @author       Valefant
// @match        https://mvnrepository.com/artifact/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // insert tab
    const gradleTab = document.querySelector("#gradle-li");
    const gradleKotlinDslTab = gradleTab.cloneNode(true);
    gradleKotlinDslTab.id = "gradle-kotlin-li";
    gradleKotlinDslTab.childNodes[0].text = "Gradle KTS";
    gradleKotlinDslTab.childNodes[0].href = "#kts-gradle";
    const tabParent = gradleTab.parentElement;
    tabParent.insertBefore(gradleKotlinDslTab, gradleTab);

    // insert textarea
    const gradleBox = document.querySelector("#gradle-div");
    const gradleKotlinDslBox = gradleBox.cloneNode(true);
    gradleKotlinDslBox.id = "kts-gradle-div";
    const textArea = gradleKotlinDslBox.childNodes[0];
    textArea.id = "kts-gradle-a";
    const parts = textArea.value.split("\n")[1].split(" ").map(part => part.trim().replaceAll(",", "").replaceAll("'", ""));

    // in gradle.kts has the form of: implementation("group:name:version")
    textArea.value = `${parts[0]}("${parts[2]}:${parts[4]}:${parts[6]}")`;

    const boxParent = gradleBox.parentElement;
    boxParent.insertBefore(gradleKotlinDslBox, gradleBox);

    const tabs = [...document.querySelectorAll(".tabs a")]
    tabs.forEach(tab => tab.addEventListener("click", changeTabView));

    // on page load, set the gradle kotlin dsl tab active
    changeTabView({target: document.querySelector("a[href='#kts-gradle']")});
})();

// sets only one tab as active and hide the other ones
function changeTabView(event) {
    const target = event.target;
    const tabs = [...document.querySelectorAll(".tabs li")];
    [...tabs].forEach(tab => tab.classList.remove("active"));
    target.parentElement.classList.add("active");

    const targetId = target.href.split("#")[1].split("-")[0];
    const textBoxes = [...document.querySelectorAll(".tab_container div")];
    textBoxes.forEach(box => box.classList.remove("active"));
    textBoxes.filter(box => {
        const id = box.id.split("-")[0];
        return id === targetId;
    })[0].classList.add("active");
}
