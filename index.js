var word = require("./word");
var random = require("./randomwords")
var inquirer = require("inquirer");


console.log("Lets Play");
console.log("\nWelcome to CLI-Hangman!");
// console.log(word.wordDisplay().join(' '));
console.log('You have: '+ numberOfGuesses+ ' guesses remaining. \n');
// guessLetter();

//variable to use for the randomWord generated//
//variable for number of guesses the user will have //
// variable to store user's guesses //
var guessedLetters = [];
var word = randomWord();
var numberOfGuesses = 5;

var question = [{
    type: 'input',
    name: 'guessedLetter',
    message: 'Guess a letter!',
    validate: function (input) {
        if ((input.length === 1) && !(Number(input))) {
            return true;
        } else {
            console.log('\n')
            return false;
        }
    }
}]

function guessLetter() {
    inquirer.prompt(question).then(function (response) {
        if (guessedLetters.includes(response.guessedLetter)) {
            console.log('---------------------------------------------------')
            console.log('You already guessed ' + response.guessedLetter + '!');
            console.log('---------------------------------------------------')
            console.log(word.wordDisplay().join(' '));
            console.log('You have: ' + numberOfGuesses + ' guesses remaining. \n');
            guessLetter();
        } else {
            guessedLetters.push(response.guessedLetter);
            var guess = response.guessedLetter;
            var found = word.guess(guess);
            var output = word.wordDisplay();
            console.log(output.join(' '));
            if (!found) {
                numberOfGuesses--
            }
            if ((numberOfGuesses === 0) && (output.includes('_'))) {
                console.log('-----------------------------------');
                console.log('YOU LOSE!');
                console.log('The answer was: ' + word.stringWord);
                console.log('-----------------------------------');
                playAgain()
            } else if (output.includes('_')) {
                console.log('You have: ' + numberOfGuesses + ' guesses remaining. \n');
                guessLetter();
            } else {
                console.log('-------');
                console.log('YOU WIN');
                console.log('-------');
                playAgain();
            }
        }
    })
}


//function that generates the random word // 
function randomWord() {
    var indexOfWord = Math.floor(Math.random() * random.length);
    return new Word(random[indexOfWord])
}

function playAgain() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'gameStatus',
        message: 'Play again?'
    }]).then(function (response) {
        if (response.gameStatus === true) {
            word = randomWord();
            numberOfGuesses = 5;
            guessedLetters = [];
            console.log(word.wordDisplay().join(' '));
            console.log('You have: ' + numberOfGuesses + ' guesses remaining. \n');
            guessLetter();
        } else {
            console.log('-------------------');
            console.log('Thanks for playing!');
            console.log('-------------------');
        }
    })
}