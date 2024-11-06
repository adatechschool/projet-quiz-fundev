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
affichageScore.innerHTML = `Ton score est de ${score} points !`
buttonNext.style.display = "block";
let barProgress = 0;
document.querySelector('#progress').setAttribute('value', barProgress); //injecter une valeur a la bar de progrès
let timer = 30;
document.querySelector('#timer').innerHTML = timer; //afficher le timer dans la page html



// LES FONCTIONS

let setTimer = setInterval(() => {
    if (timer > 0)
        timer--;
    document.querySelector('#timer').innerHTML = timer;                     //fonction qui va décrémenter la valeur du timer de 1 chaque seconde
}, 1000);                                                           //on met 1000 car c'est en millisecondes



let timeout = setTimeout(() => {
    bloquage = false;
    buttonNext.disabled = false;            //fonction créer un timer de 30 secondes, si on ne repond pas avant la fin il bloque les réponses
}, 30000);


function loadQuestion() {
    let question = quizzInsolite.questions[currentQuestionIndex];
    questionContainer.innerText = question.text;

    optionsContainer.innerHTML = '';
    buttonNext.disabled = true;

    question.options.forEach(contenu => {                   //fonction qui va créer chaque bouton et lui attribuer une valeur
        const button = document.createElement('button');
        button.innerText = contenu;
        button.classList.add('option');
        optionsContainer.appendChild(button);

        button.addEventListener("click", () => {            //fonction qui va, si on choisis une option, bloquer les autres options et checkAnswer
            if (bloquage) {         //check si on pas a deja appuye sur une autre option dans la meme question
                bloquage = false;
                buttonNext.disabled = false;
                checkAnswer(button, question.correct_answer);
            }
        });
    });
}



let manageTime = () =>                          //fonction qui va reset les 2 timers avec leurs valeurs et les relancer
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



let gifByScore = () =>              //fonction qui permet d'afficher un certain gif par rapport au score
{
    if (score === 0)
        document.querySelector('#gif').setAttribute('src', "https://media1.tenor.com/m/iAooOO3wBt0AAAAd/nul-homer.gif");
    else if (score <= 5)
        document.querySelector('#gif').setAttribute('src', "https://media1.tenor.com/m/_IT4iiUqkw4AAAAd/homer-simpson-les-simpson.gif");
    else if (score <= 10)
        document.querySelector('#gif').setAttribute('src', "https://media1.tenor.com/m/7zg2nZnGU-QAAAAd/the-office-the.gif");
    else if (score >= 11 && score <= 15)
        document.querySelector('#gif').setAttribute('src', "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2016/05/Simpsons.gif");
    else if (score >= 16 && score <= 19)
        document.querySelector('#gif').setAttribute('src', "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnllenJ0Z25tZTU3eGFyNGVoZXd3OXl2YXlyd2MwMWphemQ2Njl5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0amJzVHIAfl7jMDos/giphy.webp");
    else if (score === 20)
        document.querySelector('#gif').setAttribute('src', "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWhja3d1eXF4NWVmbGcybXV5YXp3eWF4dmRwN2pnNXdtMzd1YWkyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6MbhZORlagRIyHKw/giphy.webp")
}

let getConfetti = () =>             //fonction qui affiche des confetti
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

let endQuizz = () =>            //fonction qui va tout réinitialiser pour relancer le quizz dès le départ
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



buttonNext.addEventListener('click', () => {                    //fonction qui va detecter le click sur le bouton suivant et passer a la prochaine question
    if (!bloquage) {        //check si on a bien deja repondu a la question
        currentQuestionIndex++;
        affichageScore.innerHTML = `Ton score est de ${score} points !`
        if (currentQuestionIndex < quizzInsolite.questions.length)
            loadQuestion();
        else                                                         //check si on est bien arrivé a la fin du quizz
            endQuizz();
        bloquage = true;
        barProgress = (100 / 20) * currentQuestionIndex;                             //incrémentation de la bar de progression
        document.querySelector('#progress').setAttribute('value', barProgress);
        manageTime();
    }
});



replayButton.addEventListener('click', () => {          //fonction qui va tout reset et nous renvoyer au debut du quizz
    currentQuestionIndex = 0;
    replayButton.style.display = "none";
    buttonNext.style.display = "block";
    barProgress = (100 / 20) * currentQuestionIndex;
    document.querySelector('#progress').setAttribute('value', barProgress);
    manageTime();
    document.querySelector('#timer').style.display = "block";
    loadQuestion();
    bloquage = true;
    score = 0;
    document.querySelector('#gif').style.display = "none";
    affichageScore.innerHTML = `Ton score est de ${score} points !`
});




function checkAnswer(boutonSelectionne, answers) {         //fonction qui va check si la reponse est bonne ou pas
    bloquage = false;
    buttonNext.disabled = false;
    if (boutonSelectionne.innerText === answers) {
        boutonSelectionne.classList.add('right');       //la reponse devient verte car la classe right a comme attribut cette couleur (bonne réponse)
        score++;
    } else
        boutonSelectionne.classList.add("wrong");       //la reponse devient rouge car la classe wrong a comme attribut cette couleur (fausse réponse)
}



loadQuestion(); //fonction principale qui regroupe toutes les fonctions, à appeler à la fin !
