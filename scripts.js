// write to page
//

var wordArray = ["pineapple", "dinosaur", "cheese"]; //Word possibilites
var selectedWord =""; //Word used for one round of game
var wordLetters = selectedWord.split(""); //Letters in selectedWord
var gameRunning = false; //
var playerScore = 0;
var playerLives = 10;
var winCondition; //???
var hasPressed = []; //Array of guesses made, both correct and incorrect
var wrongLetters = [];
var correctLetters = [];

//Game start and restart
function startGame() {

	console.log("startGame function");
	
	

	if(!gameRunning){
		selectedWord = setWord();
		document.getElementById("livesCounter").innerHTML = playerLives;
		document.getElementById("winsCounter").innerHTML = playerScore;
	} else {
		alert("You are in a game");
	};
};

function restartGame(){
	var restart = confirm("Are you sure want to lose your progress?");
	if(restart){
		gameRunning = false;
		playerLives = 10;
		playerScore = 0;
		document.getElementById("playField").innerHTML = "";
		document.getElementById("livesCounter").innerHTML = "";
		document.getElementById("winsCounter").innerHTML = "";
		document.getElementById("wrongGuessList").innerHTML = "";
		startGame();
	}
};

//Game setup
function setWord() {
	gameRunning = true;
	x = Math.ceil(Math.random() * 3) - 1;
	console.log(x);
	playField = document.getElementById("playField");
	
	selectedWord1 = wordArray[x];
	wordLetters = selectedWord1.split("");
	for (i=0; i<wordLetters.length; i++) {
		var newElement= document.createElement("span");
		newElement.className = "toFind";
		newElement.setAttribute("id", "toFind"+i);
		if(wordLetters[i] === " "){
			var textNode = document.createTextNode("  ");
			newElement.appendChild(textNode);
		}else{
			var textNode = document.createTextNode("_ ");
			newElement.appendChild(textNode);
		}
		playField.appendChild(newElement);
	};
	//testInput.innerHTML= wordLetters;
	selectedWord = selectedWord1;
	winCondition = selectedWord1.length;
	console.log(winCondition);
};

//Recieve and push player input
document.onkeyup = function (event) {
if(gameRunning){
	pressedKey = String.fromCharCode(event.keyCode).toLowerCase();
	//makeGuess(pressedKey);
	noPast = true;
	for(i=0; i<hasPressed.length; i++){
		if(pressedKey == hasPressed[i]){
			alert("Past Press");
			noPast = false;
			break;
		};
	};
	//Check to see if player input = past input
	if(noPast){
		hasPressed.push(pressedKey);
		makeGuess(pressedKey);
	};
};
};

//Check player input
function makeGuess(key) {
	var allWrong = true;
	var toChange = []; //Letter positions in selectedWord
	var numberOfCorrect = 0;
	var scoreDiv = document.getElementById("winsCounter");
	var livesDiv = document.getElementById("livesCounter");

	for(i = 0; i < wordLetters.length; i++){
		if(key == wordLetters[i]){
			alert("Ooo killem ");
			toChange.push(i);
			numberOfCorrect++;
			console.log(numberOfCorrect);
			allWrong = false;
		};
	};

	//Add points or take lives
	if(allWrong == true){
		alert("Oops!");
		playerLives--;
		wrongGuess(key);
		livesDiv.innerHTML = playerLives;
	} else {
		correctGuess(toChange);
		playerScore += numberOfCorrect;
		scoreDiv.innerHTML = playerScore;
		console.log(playerScore);
	};
};

//Replace underscores for correct letter guesses
function correctGuess(numbers) {
	
	for (i=0; i<numbers.length; i++){
		correctLetters.push("a");
		letterPosition = document.getElementById("toFind"+numbers[i]);
		letterPosition.innerHTML = wordLetters[numbers[i]];
	};
	endGame();
};

//Place wrong guesses here
function wrongGuess(letter) {
	wrongLetters.push(letter);
	if(wrongLetters.length < 2){
		var wrongLetter = document.createTextNode(letter);
	}else{ 
		var wrongLetter = document.createTextNode(", " + letter);}
	var wrongGuessDiv = document.getElementById("wrongGuessList");
	wrongGuessDiv.appendChild(wrongLetter);
	endGame();

};

function endGame(){
	console.log(correctLetters);
	console.log(hasPressed);
	if(correctLetters.length === wordLetters.length){
		document.getElementById("wrongGuessList").innerHTML="";
		wrongLetters=[];
		hasPressed=[];
		correctLetters=[];
		document.getElementById("playField").innerHTML="";
		setWord();
		alert("You won!");
	} else if(playerLives === 0){
		playerLives = 10;
		playerScore = 0;
		document.getElementById("wrongGuessList").innerHTML="";
		wrongLetters=[];
		hasPressed=[];
		correctLetters=[];
		document.getElementById("playField").innerHTML="";
		gameRunning = false;
		startGame();

		alert("You lost :(");
	};

};

//Complete word guess, maybe add later
/*function guessWord() {
	var submittedGuess = document.getElementById("fullGuess").value;	
	if (submittedGuess == selectedWord){
		alert("you win");
	}else{
		alert("you lost");
	};
};*/
