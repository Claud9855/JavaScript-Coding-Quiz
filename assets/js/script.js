var quizEl = document.getElementById('quiz');
var displayResultEl = document.getElementById('display-result');
var viewResultEl = document.getElementById('view-result');
var viewHighScoreEl = document.getElementById('view-high-score');
var startingBtnEl = document.getElementById('starting-btn');

var timer = 75;
var countdown = null;
startingBtnEl.addEventListener('click', function() {
    countdown = countdownTimer();
    var homePage = document.querySelector('.home-page');
    homePage.setAttribute('style', 'display: none;');
    quizEl.setAttribute('style', 'display: flex;');
    setupQuestion();
    setupViewResult();
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
    increaseCounter: function(){
        ++this.correctCounter;
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
        var questions = document.getElementsByClassName('question');

        if(element.matches('input')){
            var dataNumber = element.getAttribute('data-number');
            if(dataNumber == quizSheet.answers[i++]){
                displayResultEl.innerHTML = '<h1>Correct</h1>';
                displayResultEl.style.display = 'flex';
                quizSheet.increaseCounter();
            }
            else{
                displayResultEl.innerHTML = '<h1>Wrong</h1>'
                displayResultEl.style.display = 'flex';
                timer -= 10;
            }

            if(i === quizSheet.questions.length){
                alert('Quiz is over!');
                calculateResult();
                quizEl.setAttribute('style', 'display: none');
                viewResultEl.setAttribute('style', 'display: block;');
                document.getElementsByTagName('header')[0].style.display = 'none';
                document.getElementById('final-score').textContent = quizSheet.result;
                return;
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

function calculateResult(){
    var correctCount = quizSheet.correctCounter;
    var numberOfQuestions = quizSheet.questions.length;
    quizSheet.result = Math.floor((correctCount / numberOfQuestions) * 100);
}


function setupViewResult(){
    var heading = document.createElement('h1');
    heading.textContent = 'All Done!';
    var paragraph = document.createElement('p');
    paragraph.innerHTML = 'Your final score is <span id="final-score">0</span>';
    var label = document.createElement('label');
    label.textContent = 'Enter initials:'
    label.setAttribute('for', 'initials');
    var textField = document.createElement('input');
    textField.setAttribute('type','text');
    textField.setAttribute('name', 'initials');
    var button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'view-result-btn');
    button.setAttribute('value', 'Submit');

    button.addEventListener('click', function(){
        if(textField.value === ""){
            alert("Textfield is empty! Please enter initials...");
            return;
        }
        userResult.intitials = textField.value;
        userResult.score = quizSheet.result;

        scores.score.push([userResult.intitials, userResult.score]);

        textField.value = "";

        console.log(scores.score);
});

    viewResultEl.append(heading, paragraph);
    viewResultEl.append(label, textField);
    viewResultEl.append(button);
}



function setupViewHighScore(){
    var orderListEl = document.createElement('ol');
    var listEl = document.createElement('li');
}

