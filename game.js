// LES VARIABLES

import { quizzInsolite } from './question.js';
let questionContainer = document.querySelector(".question");
let optionsContainer = document.querySelector(".options"); 
let buttonNext = document.querySelector("#next-button");
buttonNext.innerText = "suivant";
let replayButton = document.querySelector('#replay-button');
let affichageScore = document.querySelector("#afficheScore");
let currentQuestionIndex = 0;
let bloquage = true;    //variable pour bloquer le fait de cliquer sur le bouton next ou sur les options
let score = 0;
let maxScore = 20;
affichageScore.innerHTML = `Ton score est de ${score} points !`
buttonNext.style.display = "block";
let barProgress = 0;
document.querySelector('#progress').setAttribute('value', barProgress); //injecter une valeur a la bar de progrès
let timer = 30;
document.querySelector('#timer').innerHTML = timer; //afficher le timer dans la page html



// LES FONCTIONS

//fonction qui va décrémenter la valeur du timer de 1 chaque seconde

let setTimer = setInterval(() => {
    timer > 0 ? timer-- : 0;                                        //operation ternaire, if else
    document.querySelector('#timer').innerHTML = timer;
}, 1000);                                                           //on met 1000 car c'est en millisecondes

//fonction créer un timer de 30 secondes, si on ne repond pas avant la fin il bloque les réponses

let timeout = setTimeout(() => {
    bloquage = false;
    buttonNext.disabled = false;
}, timer * 1000);


function loadQuestion() {
    let question = quizzInsolite.questions[currentQuestionIndex];
    questionContainer.innerText = question.text;

    optionsContainer.innerHTML = '';
    buttonNext.disabled = true;

    //fonction qui va créer chaque bouton et lui attribuer une valeur

    question.options.forEach(contenu => {
        const button = document.createElement('button');
        button.innerText = contenu;
        button.classList.add('option');
        optionsContainer.appendChild(button);

        //fonction qui va, si on choisis une option, bloquer les autres options et checkAnswer

        button.addEventListener("click", () => {
            if (bloquage) {                                 //check si on pas a deja appuye sur une autre option dans la meme question
                bloquage = false;
                buttonNext.disabled = false;
                checkAnswer(button, question.correct_answer);
            }
        });
    });
}

//fonction qui va reset les 2 timers avec leurs valeurs et les relancer

let manageTime = () =>
{
    clearTimeout(timeout);
    clearInterval(setTimer);
    timer = 30;
    document.querySelector('#timer').innerHTML = timer;
    timeout = setTimeout(() => {
        bloquage = false;
        buttonNext.disabled = false;
    }, timer * 1000);
    setTimer = setInterval(() => {
        timer > 0 ? timer-- : 0;
        document.querySelector('#timer').innerHTML = timer;
    }, 1000);
}

//fonction qui permet d'afficher un certain gif par rapport au score

let gifByScore = () =>
{
    if (score === 0)
        document.querySelector('#gif').setAttribute('src', "https://media1.tenor.com/m/iAooOO3wBt0AAAAd/nul-homer.gif");
    else if (score <= maxScore * 0.25)
        document.querySelector('#gif').setAttribute('src', "https://media1.tenor.com/m/_IT4iiUqkw4AAAAd/homer-simpson-les-simpson.gif");
    else if (score <= maxScore * 0.5)
        document.querySelector('#gif').setAttribute('src', "https://media1.tenor.com/m/7zg2nZnGU-QAAAAd/the-office-the.gif");
    else if (score >= maxScore * 0.5 + 1 && score <= maxScore * 0.75)
        document.querySelector('#gif').setAttribute('src', "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2016/05/Simpsons.gif");
    else if (score >= maxScore * 0.75 + 1 && score <= maxScore - 1)
        document.querySelector('#gif').setAttribute('src', "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnllenJ0Z25tZTU3eGFyNGVoZXd3OXl2YXlyd2MwMWphemQ2Njl5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0amJzVHIAfl7jMDos/giphy.webp");
    else if (score === maxScore)
        document.querySelector('#gif').setAttribute('src', "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWhja3d1eXF4NWVmbGcybXV5YXp3eWF4dmRwN2pnNXdtMzd1YWkyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6MbhZORlagRIyHKw/giphy.webp")
}

//fonction qui affiche des confetti

let getConfetti = () =>
{
    confetti({
        particleCount: 300,
        spread: 90,
        origin: { x: 1, y: 0.9 },
    });
    
      confetti({
        particleCount: 300,
        spread: 90,
        origin: { x: 0, y: 0.9 },
    });
}

//fonction qui va tout réinitialiser pour relancer le quizz dès le départ

let endQuizz = () =>
{
    questionContainer.innerText =` Fin du Quizz ! Tu as ${score} points !`;
    optionsContainer.innerHTML = "";
    buttonNext.style.display = "none";
    replayButton.style.display = "block";
    document.querySelector('#timer').style.display = "none";
    gifByScore();
    document.querySelector('#gif').style.display = "block";
    getConfetti();
}

//fonction qui va detecter le click sur le bouton suivant et passer a la prochaine question

buttonNext.addEventListener('click', () => {
    if (!bloquage) {        //check si on a bien deja repondu a la question
        currentQuestionIndex++;
        affichageScore.innerHTML = `Ton score est de ${score} points !`
        if (currentQuestionIndex < quizzInsolite.questions.length)
            loadQuestion();
        else                                                         //check si on est bien arrivé a la fin du quizz
            endQuizz();
        bloquage = true;
        barProgress = (100 / maxScore) * currentQuestionIndex;                             //incrémentation de la bar de progression
        document.querySelector('#progress').setAttribute('value', barProgress);
        manageTime();
    }
});

//fonction qui va tout reset et nous renvoyer au debut du quizz

replayButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    replayButton.style.display = "none";
    buttonNext.style.display = "block";
    barProgress = (100 / maxScore) * currentQuestionIndex;
    document.querySelector('#progress').setAttribute('value', barProgress);
    manageTime();
    document.querySelector('#timer').style.display = "block";
    loadQuestion();
    bloquage = true;
    score = 0;
    document.querySelector('#gif').style.display = "none";
    affichageScore.innerHTML = `Ton score est de ${score} points !`
});

//fonction qui va check si la reponse est bonne ou pas

function checkAnswer(boutonSelectionne, answers) {
    bloquage = false;
    buttonNext.disabled = false;
    if (boutonSelectionne.innerText === answers) {
        boutonSelectionne.classList.add('right');       //la reponse devient verte car la classe right a comme attribut cette couleur (bonne réponse)
        score++;
    } else
        boutonSelectionne.classList.add("wrong");       //la reponse devient rouge car la classe wrong a comme attribut cette couleur (fausse réponse)
}



loadQuestion(); //fonction principale qui regroupe toutes les fonctions, à appeler à la fin !
