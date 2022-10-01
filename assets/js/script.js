//create a document query that links to a button in the index.html
//when the button is clicked, the game will start! wow
//accomplished by addButton.addEventListener("click", function())
//inside our code, we could have a either a variable object or array that contains all of the words selectable for a game
//as for the timer: when the start button is clicked, we enter an interval function that counts down every second.
//if the seconds run out before the word is guessed, the game is cut short and the player loses :(
//in the main, 'var secondsLeft' and function setTime(), and inside...
//var timeInterval = setInterval(function() {})
//secondsLeft--;
//.textContent = secondsLeft + "seconds left!" (until the game ends)
//if(secondsLeft === 0) { ...
//clearInterval(timeInterval);
//function that says you lost! oh no!
//(reference activity 09 if needed)
//using potentially if statement, when a key on the keyboard is pressed, the code checks if said key is in the randomized word picked for the game
//if the key is in fact there, the character in the word will show up!
//these serve as key events, where the blank "_" symbol is then replaced by the correct character
//after every game, we use localStorage to store the win and loss count. we would display this score card after each game

var wordChosen = document.querySelector("#word");
var timeEl = document.querySelector(".time");
var winCount = document.querySelector("#win-count");
var lossCount = document.querySelector("#loss-count");
var startGameBtn = document.querySelector("#start-button");
var resetScoreBtn = document.querySelector("#reset-score")

var timerInterval;
var words = ["javascript", "code", "timer", "markdown", "repository"];
var blank = ""
var answer = ""
var wins = 0;
var losses = 0;
var secondsLeft = 10;
var timerActive;

//when correct key is pressed, character appears in word
document.addEventListener("keydown", function(event) {
    if (secondsLeft > 0 && timerActive == true) {
        var answerActive = ""
        var keyPress = event.key.toLowerCase;
        for (var i = 0; i < answer.length; i++) {
            if (answer.charAt(i) == keyPress) {
                answerActive += answer.charAt(i);
            } else {
                answerActive += blank.charAt(i);
            }
        }
        blank = answerActive;
        wordChosen.textContent = answerActive;
        
        clearInterval(timerInterval);
        winIncrease();
    }
});

function gameStart() {
    //resets timer upon hitting start button
    clearInterval(timerInterval); 
    secondsLeft = 10;
    timerActive == true;
    blank = ""
    var answer = words[Math.floor(Math.random() * words.length)]; //randomly selects a single word
    for (var i = 0; i < answer.length; i++) {
        if (Math.random() < 0.1) {
            blank += answer.charAt(i);
        } else {
            blank += " _ ";
        }
    }
    wordChosen.textContent = blank;

    timerInterval = setInterval(function() {
        
        if (secondsLeft > 1) {
            timeEl.textContent = secondsLeft + " seconds left! Don't give up!"
            secondsLeft--;
        } else if (secondsLeft === 1) {
            timeEl.textContent = secondsLeft + " second left! Last chance!"
            secondsLeft--;
        } else {
            timeEl.textContent = "You lose!"
            clearInterval(timerInterval); //stops timer
            lossIncrease();
        }
    }, 1000);
}

//local storage win increase
function winIncrease() {
    wins++;
    winCount.textContent = "Wins: " + wins;
    localStorage.setItem("win-count", wins);
}
//local storage loss increase
function lossIncrease() {
    losses++;
    lossCount.textContent = "Losses: " + losses;
    localStorage.setItem("loss-count", losses);
}
//upon hitting the reset score button, wins and losses are set to 0 both on the page and in local storage
function removeScore() {
    wins = 0;
    losses = 0;
    winCount.textContent = "Wins: 0"
    localStorage.setItem("win-count", wins);
    lossCount.textContent = "Losses: 0"
    localStorage.setItem("loss-count", losses);
}

wins = localStorage.getItem(winCount);
losses = localStorage.getItem(lossCount);

//buttons
startGameBtn.addEventListener("click", gameStart); //game start upon button click
resetScoreBtn.addEventListener("click", removeScore); //reset scores upon button click