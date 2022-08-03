// declared variables to be used in program
var quizEl = document.getElementById('quiz');
var displayResultEl = document.getElementById('display-result');
var viewResultEl = document.getElementById('view-result');
var viewHighScoreEl = document.getElementById('view-high-scores');
var startingBtnEl = document.getElementById('starting-btn');
var timer = 0;
var index = 0;
var timerCountdown;

// object variables to store the property and behavior of the objects to be used in program
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
    increaseIncorrectCounter: function(){
        ++this.incorrectCounter;
    }
};

var scores = {
    score: [],
    sortScores: function(){
        this.score.sort(function(a,b){
            return a[1] - b[1];
        }).reverse();
    }
};

var userResult = {
    intitials: null,
    score: 0
};

// function starts the timer
function countdownTimer() {
        timerCountdown = setInterval(function() {
        var displayTimer = document.getElementById('timer-display');
        displayTimer.textContent = timer;
        if(timer === 0){
            clearInterval(timerCountdown);
        }
        timer--;
    }, 1000);
}

// function setup question for the quiz
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

// function finish the quiz if time ran out
function quizOver(){
    if(timer <= 0){
        clearInterval(timerCountdown);
        calculateResult();
        quizEl.setAttribute('style', 'display: none');
        viewResultEl.setAttribute('style', 'display: block;');
        document.getElementById('final-score').textContent = quizSheet.result;
        return true;
    }
    return false;

}

// function display the first question for the quiz
function displayFirstQuestion(){
    var question = document.getElementsByClassName('question')[0];

    var state = question.getAttribute('data-state');
    if(state === 'hidden'){
        question.setAttribute('data-state', 'visible');
        question.setAttribute('style', "display: block");
    }
   
}

// function calculate result
function calculateResult(){
    var correctCount = quizSheet.correctCounter;
    var incorrectCount = quizSheet.incorrectCounter;
    var penaltyPoints  = incorrectCount * 10;
    var numberOfQuestions = quizSheet.questions.length;
    var result = Math.floor((correctCount / numberOfQuestions) * 100);
    if(result === 0){
        quizSheet.result = result;
    }
    else{
        if((result - penaltyPoints) < 0){
            quizSheet.result = 0;
        }
        else{
            quizSheet.result = (result - penaltyPoints);
        }
        
    }
}

// function setup the view result page for the quiz
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
        scores.sortScores();
        localStorage.setItem('scores', JSON.stringify(scores));

        textField.value = "";
        quizSheet.result = 0;
        displayResultEl.style.display = 'none';
        viewResultEl.style.display = 'none';
        viewHighScoreEl.style.display = 'block';
        setupViewHighScore();
});

    viewResultEl.append(heading, paragraph);
    viewResultEl.append(label, textField);
    viewResultEl.append(button);
}

// function setup the view high score page for the quiz
function setupViewHighScore(){
    document.getElementsByTagName('header')[0].style.display = 'none';
    var heading = document.createElement('h1');
    heading.textContent = 'High Scores';
    heading.setAttribute('style', 'text-align: center;');
    var orderListEl = document.createElement('ol');
    orderListEl.setAttribute('class', 'scores-list');
    var goBackButton = document.createElement('input');
    goBackButton.setAttribute('type', 'button');
    goBackButton.setAttribute('value', 'Go Back');
    goBackButton.setAttribute('class', 'view-high-scores-btn');
    var clearHighScoreButton = document.createElement('input');
    clearHighScoreButton.setAttribute('type', 'button');
    clearHighScoreButton.setAttribute('value', 'Clear High Scores');
    clearHighScoreButton.setAttribute('class', 'view-high-scores-btn');

    var scoresList = JSON.parse(localStorage.getItem('scores'));
    
    for (var i = 0; i < scores.score.length; i++){
        
        for(var j = 0; j <= Object.values('scoresList').values.length; j++){
            
            var list = document.createElement('li');
            list.textContent = scoresList.score[i][j].toUpperCase() + " - " + scoresList.score[i][j+1];
            orderListEl.append(list);
        }   
        
    }

    viewHighScoreEl.append(heading,orderListEl);
    viewHighScoreEl.append(goBackButton, clearHighScoreButton);

    goBackButton.addEventListener('click', function(){
        viewHighScoreEl.style.display = 'none';
        document.getElementsByTagName('header')[0].style.display = 'flex';
        document.getElementsByClassName('home-page')[0].style.display = 'block';
        document.getElementById('timer-display').textContent = '0';

        quizEl.innerHTML = "";
        viewResultEl.innerHTML = "";
        viewHighScoreEl.innerHTML = "";
    });

    clearHighScoreButton.addEventListener('click', function(){
        localStorage.clear();
        scores.score = [];
        orderListEl.innerHTML="";
    });

}

// added event listener to class name view-high-score to switch to view-high-score page
document.getElementsByClassName('view-high-scores')[0].addEventListener('click', function(){
    clearInterval(timerCountdown);
    quizEl.style.display = 'none';
    document.getElementsByClassName('home-page')[0].style.display = 'none';
    viewResultEl.style.display = 'none';
    displayResultEl.style.display = 'none';
    viewHighScoreEl.style.display = 'block';
    setupViewHighScore();
});

// added event listener is home page button to start and setup the quiz
startingBtnEl.addEventListener('click', function() {
    timer = 75;
    index = 0;
    quizSheet.result = 0;
    quizSheet.correctCounter = 0;
    quizSheet.incorrectCounter = 0;
    countdownTimer();
    var homePage = document.querySelector('.home-page');
    homePage.setAttribute('style', 'display: none;');
    quizEl.setAttribute('style', 'display: flex;');
    setupQuestion();
    setupViewResult();
    displayFirstQuestion();
    
});

// added event listener to quiz div element to handle the flow and logic of quiz
quizEl.addEventListener('click', function(event){
    var element = event.target;
    var questions = document.getElementsByClassName('question');

    if(element.matches('input')){
        var dataNumber = element.getAttribute('data-number');
        if(dataNumber == quizSheet.answers[index++]){
            displayResultEl.innerHTML = '<h1>Correct</h1>';
            displayResultEl.style.display = 'flex';
            quizSheet.increaseCounter();
        }
        else{
            displayResultEl.innerHTML = '<h1>Wrong</h1>'
            displayResultEl.style.display = 'flex';
            quizSheet.increaseIncorrectCounter();
            timer -= 10;
            if(quizOver()){
                alert("You used up all of your time! Quiz Over!");
            }
        }

        if(index === quizSheet.questions.length){
            alert('Quiz is over!');
            clearInterval(timerCountdown);
            calculateResult();
            quizEl.setAttribute('style', 'display: none');
            viewResultEl.setAttribute('style', 'display: block;');
            questions[index-1].setAttribute('style', 'display: none');
            document.getElementById('final-score').textContent = quizSheet.result;
            index = 0;
            return;
        }

        var state = questions[index].getAttribute('data-state');
        if(state === 'hidden'){
            questions[index].setAttribute('data-state', 'visible');
            questions[index].setAttribute('style', 'display: block;');
            questions[index-1].setAttribute('data-state', 'hidden');
            questions[index-1].setAttribute('style', 'display: none;');
        }
    }
});

