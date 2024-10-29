import { quizzInsolite } from './question.js';

let firstQuestion = document.querySelector(".question");
firstQuestion.innerHTML = quizzInsolite.questions[0].text;

let optionsContainer = document.querySelector(".options");
optionsContainer.innerHTML = ""; 
quizzInsolite.questions[0].options.forEach(element => {
    const button = document.createElement('button'); 
    button.innerText = element; 
    button.classList.add('option'); 
    optionsContainer.appendChild(button); 
});

let button = document.querySelector("#next-button");
button.innerText = "suivant";






