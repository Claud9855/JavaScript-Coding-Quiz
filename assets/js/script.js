var quizEl = document.getElementById('quiz');
var displayResultEl = document.getElementById('display-result');
var viewHighScoreEl = document.getElementById('view-high-score');
var startingBtnEl = document.getElementById('starting-btn');

var timer = 75;

startingBtnEl.addEventListener('click', function() {
    countdownTimer();
    var homePage = document.querySelector('.home-page');
    homePage.setAttribute('style', 'display: none;');
    quizEl.setAttribute('style', 'display: flex;');
    setupQuestion();
    displayFirstQuestion();
    
});


var quizSheet = {
    questions: [
        "<h3>Commonly used data types DO Not include:</h3>",
        "<h3>The condition in an if / else statement is enclosed with<hr class='underline'/> .</h3>",
        "<h3>Arrays in JavaScript can be used to store <hr class='underline'/> .</h3>",
        "<h3>String values must be enclosed within <hr class='underline'/> when being assigned to variables.</h3>",
        "<h3>A very useful tool used during development and debugging for printing content to debugger is:</h3>"
    ],
    choices: [
        ["strings", "booleans", "alerts", "numbers"],
        ["quotes", "curly bracket", "parenthesis", "square brackets"],
        ["numbers and\nstrings", "other arrays", "booleans", "all of the above"],
        ["commas", "curly brackets", "quotes", " parenthesis"],
        ["JavaScript", "terminal/bash", "for loops", "console.log"]
    ],
    answers: [3, 3, 4, 3, 4],
    result: 0,
    correctCounter: 0,
    incorrectCounter: 0,

    increaseCounter: function(){
        ++this.correctCounter;
    },

    decreaseIncorrectCounter: function(){
        ++this.incorrectCounter;
    }

};

var scores = {
    score: []
};

var userResult = {
    intitials: null,
    score: 0
};

function countdownTimer() {
        var timerCountdown = setInterval(function() {
        var displayTimer = document.getElementById('timer-display');
        displayTimer.textContent = timer;
        if(timer === 0){
            clearInterval(timerCountdown);
        }
        timer--;
    }, 1000);
}

function setupQuestion() {
    var questionCollections = quizSheet.questions.length;

    for(var i = 0; i < questionCollections; i++){
        var questionEl = document.createElement('div');
        questionEl.setAttribute('class', 'question');
        questionEl.setAttribute('data-state', 'hidden');
        var questionHeaderEl = document.createElement('div');
        questionHeaderEl.setAttribute('class', 'question-header');
        var questionBodyEl = document.createElement('div');
        questionBodyEl.setAttribute('class', 'question-body');
        questionHeaderEl.innerHTML = quizSheet.questions[i];
        
        for(var j = 0; j < quizSheet.choices[i].length; j++){
            var inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'button');
            inputEl.setAttribute('class', 'choice-btn');
            inputEl.setAttribute('data-number', j+1);
            inputEl.setAttribute('value', quizSheet.choices[i][j]);

            questionBodyEl.append(inputEl);
        }

        questionEl.append(questionHeaderEl, questionBodyEl);
        quizEl.append(questionEl);

    }

}

var i = 0;
quizEl.addEventListener('click', function(event){
        var element = event.target;
        var result = document.getElementById('display-result');
        var questions = document.getElementsByClassName('question');

        
        console.log(i);
        console.log(quizSheet.correctCounter + " -");
        if(element.matches('input')){
            var dataNumber = element.getAttribute('data-number');
            if(i === quizSheet.questions.length-1){
                alert('Quiz is over!');
            }
            else if(dataNumber == quizSheet.answers[i++]){
                result.innerHTML = '<h1>Correct</h1>';
                result.style.display = 'flex';
                quizSheet.increaseCounter();
            }
            else{
                result.innerHTML = '<h1>Wrong</h1>'
                result.style.display = 'flex';
                quizSheet.decreaseIncorrectCounter();
                timer -= 10;
            }

            var state = questions[i].getAttribute('data-state');
            if(state === 'hidden'){
                questions[i].setAttribute('data-state', 'visible');
                questions[i].setAttribute('style', 'display: block;');
                questions[i-1].setAttribute('data-state', 'hidden');
                questions[i-1].setAttribute('style', 'display: none;');
            }
        }

        

        
    });


function displayFirstQuestion(){
    var question = document.getElementsByClassName('question')[0];

    var state = question.getAttribute('data-state');
    if(state === 'hidden'){
        question.setAttribute('data-state', 'visible');
        question.setAttribute('style', "display: block");
    }
   
}

