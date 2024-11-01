import { quizzInsolite } from './question.js';

let questionContainer = document.querySelector(".question");

let optionsContainer = document.querySelector(".options"); 

let buttonNext = document.querySelector("#next-button");
buttonNext.innerText = "suivant";

let replayButton = document.querySelector('#replay-button');

let currentQuestionIndex = 0;

let bloquage = true;

let score = 0;






function loadQuestion() {
    optionsContainer.innerHTML = '';
    buttonNext.disabled = true;

    let question = quizzInsolite.questions[currentQuestionIndex];
    questionContainer.innerText = question.text;

    question.options.forEach(contenu => {
        const button = document.createElement('button');
        button.innerText = contenu;
        button.classList.add('option');
        optionsContainer.appendChild(button);

        button.addEventListener("click", () => {
            if (bloquage) {
            bloquage = false;
            buttonNext.disabled = false;
            checkAnswer(button, question.correct_answer);}
});

      });
}
console.log(bloquage)
  
buttonNext.addEventListener('click', () => {
    if (!bloquage) {
    currentQuestionIndex++;
    if ( currentQuestionIndex < quizzInsolite.questions.length) {
        loadQuestion();
      } else {
        questionContainer.innerText =` Fin du Quizz ! Tu as ${score} points !`;
        optionsContainer.innerHTML = "";
        buttonNext.style.display = "none";
        replayButton.style.display = "block";
      }
        bloquage = true;
  }});
  
  
  replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    replayButton.style.display = "none";
    buttonNext.style.display = "block";  
    loadQuestion();
    bloquage = true;
});



function checkAnswer(boutonSelectionne, answers) {
    bloquage = false;
    buttonNext.disabled = false;
    if (boutonSelectionne.innerText === answers) {
        boutonSelectionne.style.backgroundColor = "green";
        score++;
    } else {
        boutonSelectionne.style.backgroundColor = "red";
    }
}

loadQuestion();