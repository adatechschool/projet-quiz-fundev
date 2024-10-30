import { quizzInsolite } from './question.js';

let questionContainer = document.querySelector(".question");

let optionsContainer = document.querySelector(".options");
optionsContainer.innerHTML = ""; 

let buttonNext = document.querySelector("#next-button");
buttonNext.innerText = "suivant";

let currentQuestionIndex = 0;



function loadQuestion() {
    optionsContainer.innerHTML = '';
    let question = quizzInsolite.questions[currentQuestionIndex];
    questionContainer.innerText = question.text;

    question.options.forEach(element => {
        const button = document.createElement('button');
        button.innerText = element;
        button.classList.add('option');
        optionsContainer.appendChild(button);
      });
}

  buttonNext.addEventListener('click', () => {
    currentQuestionIndex++;
    if ( currentQuestionIndex < quizzInsolite.questions.length) {
        loadQuestion();
      } else {
        questionContainer.innerText ="Fin du Quizz";
        optionsContainer.innerHTML = "";
        buttonNext.style.display = "none";
      }
});

loadQuestion();








