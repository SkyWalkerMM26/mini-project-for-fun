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

var wordLocation = document.querySelector("#word-location");
var timeEl = document.querySelector(".time");
var winCount = document.querySelector("#win-count");
var lossCount = document.querySelector("#loss-count");
var startGameBtn = document.querySelector("#start-button");
var resetScoreBtn = document.querySelector("#reset-score")


var timerInterval;
var words = ["javascript", "code", "timer", "markdown", "repository"];
var answer;
var lettersRemaining;
var wins = 0;
var losses = 0;
var secondsLeft = 10;
var timerActive;

function gameStart() {
    secondsLeft = 10;
    timerActive == true;

    answer = words[Math.floor(Math.random() * words.length)]; //randomly selects a single word
    wordLocation.innerHTML = "";
    loadWord();

    document.addEventListener("keydown", keyboard);

    timerInterval = setInterval(function() {
        secondsLeft--;
        if (secondsLeft > 1) {
            timeEl.textContent = secondsLeft + " seconds left! Don't give up!"
        } else if (secondsLeft === 1) {
            timeEl.textContent = secondsLeft + " second left! Last chance!"
        } else {
            timeEl.textContent = "You lose!"
            clearInterval(timerInterval); //stops timer
            lossIncrease();
        }
    }, 1000);
}

//when correct key is pressed, character appears in word
function keyboard(event) {
    var keyPress = event.key;
    console.log("here is event.key: ", event.key); //checks if key presses are registered in console
    lettersRemaining = answer.length;

    if (secondsLeft > 0 && timerActive == true) {
        for (var i = 0; i < answer.length; i++) {
            var letter = document.getAttribute("data-letter");
            var state = letter.getAttribute("data-state");
            if (state === "hidden") {
                lettersRemaining--;
                letter.textContent = keyPress;
                letterElement.setAttribute("data-state", "visible");
            }
        }
        
        if (lettersRemaining === 0) {
            winIncrease();
        }
    }
}

function loadWord() {
    var addUlElement = document.createElement("ul");
    addUlElement.className = "word";
    for (var i = 0; i < answer.length; i++) {
        var addLiElement = document.createElement("li");
        addLiElement.textContent = "_"
        addLiElement.className = "letter";
        addLiElement.id = "letter-" + i;
        addLiElement.setAttribute("data-state", "hidden");
        addLiElement.setAttribute("data-letter", answer[i]);
        addUlElement.appendChild(addLiElement);
    }
    wordLocation.appendChild(addUlElement);
}

//local storage win increase
function winIncrease() {
    clearInterval(timerInterval);
    wins++;
    timeEl.textContent = "You win!"
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