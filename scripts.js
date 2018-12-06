// write to page
//

var wordArray = ["pine apple", "aloe vera", "che ese"]; //Word possibilites
var selectedWord =""; //Word used for one round of game
var wordLetters = selectedWord.split(""); //Letters in selectedWord
var gameRunning = false; //
var playerScore = 0;
var playerLives = 10;
var winCondition; //???
var hasPressed = ["0"]; //Array of guesses made, both correct and incorrect
var wrongLetters = [];

//Game start and restart
function startGame() {

	console.log("startGame function");

	if(!gameRunning){
		selectedWord = setWord();
	} else {
		alert("You are in a game");
	};
};

//Game setup
function setWord() {
	gameRunning = true;
	x = Math.ceil(Math.random() * 3) - 1;
	console.log(x);
	testInput = document.getElementById("tester");
	
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
		testInput.appendChild(newElement);
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
		makeGuess(pressedKey);
		hasPressed.push(pressedKey);
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
		wrongGuess(key);
		playerLives--;
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
		letterPosition = document.getElementById("toFind"+numbers[i]);
		letterPosition.innerHTML = wordLetters[numbers[i]];
	};
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
