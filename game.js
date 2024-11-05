import { quizzInsolite } from './question.js';

let questionContainer = document.querySelector(".question");

let optionsContainer = document.querySelector(".options"); 

let buttonNext = document.querySelector("#next-button");
buttonNext.innerText = "suivant";

let replayButton = document.querySelector('#replay-button');

let affichageScore = document.querySelector("#afficheScore");

let currentQuestionIndex = 0;

let bloquage = true;

let score = 0;

affichageScore.innerHTML = `Ton score est de ${score} points !`

buttonNext.style.display = "block";

let barProgress = 0;
document.querySelector('#progress').setAttribute('value', barProgress);

let timer = 30;

document.querySelector('#timer').innerHTML = timer;

let setTimer = setInterval(() => {
    if (timer > 0)
        timer--;
    document.querySelector('#timer').innerHTML = timer;
}, 1000);


let timeout = setTimeout(() => {
    bloquage = false;
    buttonNext.disabled = false;
}, 30000);



function loadQuestion() {
    let question = quizzInsolite.questions[currentQuestionIndex];
    questionContainer.innerText = question.text;

    optionsContainer.innerHTML = '';
    buttonNext.disabled = true;

    question.options.forEach(contenu => {
        const button = document.createElement('button');
        button.innerText = contenu;
        button.classList.add('option');
        optionsContainer.appendChild(button);

        button.addEventListener("click", () => {
            if (bloquage) {
                bloquage = false;
                buttonNext.disabled = false;
                checkAnswer(button, question.correct_answer);
            }
        });
    });
}

let manageTime = () =>
{
    clearTimeout(timeout);
    clearInterval(setTimer);
    timer = 30;
    document.querySelector('#timer').innerHTML = timer;
    timeout = setTimeout(() => {
        bloquage = false;
        buttonNext.disabled = false;
    }, 30000);
    setTimer = setInterval(() => {
        if (timer > 0)
            timer--;
        document.querySelector('#timer').innerHTML = timer;
    }, 1000);
}

buttonNext.addEventListener('click', () => {
    if (!bloquage) {
        currentQuestionIndex++;
        affichageScore.innerHTML = `Ton score est de ${score} points !`
        if (currentQuestionIndex < quizzInsolite.questions.length)
            loadQuestion();
        else {
            questionContainer.innerText =` Fin du Quizz ! Tu as ${score} points !`;
            optionsContainer.innerHTML = "";
            buttonNext.style.display = "none";
            replayButton.style.display = "block";
            document.querySelector('#timer').style.display = "none";
        }
        bloquage = true;
        barProgress = (100 / 7) * currentQuestionIndex;
        document.querySelector('#progress').setAttribute('value', barProgress);
        manageTime();
    }
});

replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    replayButton.style.display = "none";
    buttonNext.style.display = "block";
    loadQuestion();
    bloquage = true;
    score = 0;
    affichageScore.innerHTML = `Ton score est de ${score} points !`
});


function checkAnswer(boutonSelectionne, answers) {
    bloquage = false;
    buttonNext.disabled = false;
    if (boutonSelectionne.innerText === answers) {
        boutonSelectionne.classList.add('right');
        score++;
    } else
        boutonSelectionne.classList.add("wrong");
}

loadQuestion();
