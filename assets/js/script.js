var quizEl = document.getElementById('quiz');
var displayResultEl = document.getElementById('display-result');
var viewHighScoreEl = document.getElementById('view-high-score');
var startingBtnEl = document.getElementById('starting-btn');

var timer = 10;

startingBtnEl.addEventListener('click', function() {
    var homePage = document.querySelector('.home-page');
    homePage.setAttribute('style', 'display: none;');
    setupQuestion();
    quizEl.setAttribute('style', 'display: flex;')
    var collections = document.getElementsByClassName('question');
    collections[1].setAttribute('style', 'display: block;');
    var timerCountdown =  setInterval(countdownTimer, 1000);
});


var quizSheet = {
    questions: [
        "Commonly used data types DO Not include:",
        "The condition in an if / else statement is enclosed with ____________.",
        "Arrays in JavaScript can be used to store ___________.",
        "String values must be enclosed within ___________ when being assigned to variables.",
        "A very useful tool used during development and debugging for printing content to debugger is:"
    ],
    choices: [
        ["strings", "booleans", "alerts", "numbers"],
        ["quotes", "curly bracket", "parenthesis", "square brackets"],
        ["numbers and strings", "other arrays", "booleans", "all of the above"],
        ["commas", "curly brackets", "quotes", " parenthesis"],
        ["JavaScript", "terminal/bash", "for loops", "console.log"]
    ],
    answers: [3, 3, 4, 3, 4],
    result: 0,
    correctCounter: 0,
    incorrectCounter: 0
};

var scores = {
    score: []
};

var userResult = {
    intitials: null,
    score: 0
};

function countdownTimer() {
    timer--;
    var displayTimer = document.getElementById('timer-display');
    displayTimer.textContent = timer;
    
}

function setupQuestion() {
    var questionCollections = quizSheet.questions.length;

    for(var i = 0; i < questionCollections; i++){
        var questionEl = document.createElement('div');
        questionEl.setAttribute('class', 'question');
        var questionHeaderEl = document.createElement('div');
        questionHeaderEl.setAttribute('class', 'question-header');
        var questionBodyEl = document.createElement('div');
        questionBodyEl.setAttribute('class', 'question-body');
        questionHeaderEl.textContent = quizSheet.questions[i];

        
        

        for(var j = 0; j < quizSheet.choices[i].length; j++){
            var inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'button');
            inputEl.setAttribute('class', 'choice-btn');
            inputEl.setAttribute('value', quizSheet.choices[i][j]);

            questionBodyEl.append(inputEl);
        }
        questionEl.append(questionHeaderEl, questionBodyEl);
        quizEl.append(questionEl);

    }

}

