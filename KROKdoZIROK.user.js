// ==UserScript==
// @name         KROK
// @version      1.0
// @description  KROK DO ZIROK
// @author       Vyasya Pupkin
// @match        https://test.testcentr.org.ua/mod/quiz/attempt.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const cmid = new URLSearchParams(window.location.search).get('cmid');

    const localStorageKey = `${cmid}-answers`;

    const answers = JSON.parse(localStorage.getItem(localStorageKey));

    if (!answers) {

        const url = `https://raw.githubusercontent.com/kpobb1989/KROK/master/2023/${cmid}.json`;

        fetch(url, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(response => {
            console.log('Fetched JSON:', response);

            localStorage.setItem(localStorageKey, JSON.stringify(response));

            document.location.reload();
        }).catch(error => {
            console.error('Fetch error:', error);
        });
    }
    else{
        const question = document.querySelector(".qtext").textContent;

        console.log(question);

        const answer = answers[question]?.find(answer => answer.Correct)?.Answer;

        if (answer) {
            Array.from(document.querySelectorAll('div')).find(el => el.textContent.replace(/<[^>]*>/g, '') == answer)?.parentNode.parentNode.querySelector('input[type="radio"]').click();

           //document.querySelector('input[type="submit"][name="next"][value="Next page"]')?.click();
        }
    }
})();