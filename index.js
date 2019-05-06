
var Word = require("./Word.js");
var inquirer = require("inquirer");

 //make an array that has all possible guesses(letters)//
var letterArray = "abcdefghijklmnopqrstuvwxyz";

 //make an array that has all of the random words to be guessed// 
 var words = [
    "potatoe", "sushi", "cake", "brownie", "broccoli", "squash", "onion", "tomatoe", "soup", "cracker", 
    "hotdog", "hamburger", "salad"
]
 //make a 
var randomWord = Math.floor(Math.random() * words.length);
var gameWord     = words[randomWord];

 //pass the randomWord to the Word.js constructor
var selectedWord = new Word(gameWord);
var requireNewWord = false;

 //make two varriables to hold right and wrong guesses
 var correctLetters = [];

var incorrectLetters = [];


 //make a variable to keep track of the number of guesses
var guessesLeft = 7;

 // make a function that chooses the word for the user to guess
function game(){
    if (requireNewWord) {
        var randomWord = Math.floor(Math.random() * words.length);
        var gameWord = words[randomWord];
        

         selectedWord = new Word (gameWord);
        requireNewWord = false;
    }

     //create an array that holds the letters of the selectedWord
    var solution = [];
    selectedWord.objArray.forEach(solutionCheck) // remember to create solutionCheck function 

     //create an inquirer prompt for the user to pick a letter
    if (solution.includes(false)){
        inquirer.prompt([
            {
                type: "input",
                message: "Type a letter to guess the word! Here's a hint - think about food.",
                name: "userinput"
            }

         ]).then(function(input){

             //make an if/else statement checking the users guesses
            //if there are too many charactars in the guess ask user to try again
            if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                console.log("\nHmmm.. Please try again!\n");
                game();
            } else {
                // if the users guess is repeated, throw an error 
                if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                console.log("\nYou already guessed that letter!\n");
                game()
            } else {
                //if the users guess is original, check to see if it is in the gameword
                var  letterCheckArray = [];
                selectedWord.userGuess(input.userinput);
                selectedWord.objArray.forEach(letterCheck);

                 if (letterCheckArray.join("") === solution.join("")) {
                    console.log("\NOPE!\n");

                     incorrectLetters.push(input.userinput);
                    guessesLeft--;
                } else {
                    console.log("\NICE!!\n");
                    correctLetters.push(input.userinput);
                }
               
                 selectedWord.log();

                 //print the guesses left and letters guessed
                console.log("Guesses Left: " + guessesLeft + "\n");
                console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                 //run the game until the guesses hit 0
                if (guessesLeft > 0){
                    game();
                } else {
                    console.log("You Lost!! :( \n");
                    restartGame();
                }
                function letterCheck(key) {
                    letterCheckArray.push(key.guessed);
                }
              }
            }
        });
    } else {
        console.log("WINNER!!!  :) \n");
        restartGame();
    }
    function solutionCheck(key) {
        solution.push(key.guessed);
    }
}

 //create a function to restart the game
function restartGame(){
    //prompt user tp play again or exit the game
    inquirer.prompt ([
        {
            type: "list",
            message: "Do you want to: ",
            choices: [
                "play again?", 
                "exit game?"
            ],
            name: "restart"
        }
    ])
    .then(function(input){
        //reset all variables to start values
        if (input.restart === "play again?") {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft= 10;
            game();
        } else {
            return;
        }
    });
}
//call the game function
game();
