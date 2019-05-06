// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

// An array of new Letter objects representing the letters of the underlying word

// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)


// var Letter = require("./letter");

// var Word = function(word) {
//     var split = split.word(" ");
//     var wordArray = [];
//     split.forEach(function(element) {
//         var letter = new Letter(element);
//         wordArray.push(letter)
//     })
//     this.word = wordArray;
//     this.string = word;
//     this.wordDisplay = function() {
//         var display = [];
//         this.word.forEach(function(element) {
//             display.push(element.display())
//         })
//         return display;
//     }
//     this.guess = function(element) {
//         var found = false;
//         this.word.forEach(function(element) {
//             if (element.check(letter)) {
//                 found = true;
//             }
//         })
//         return found;
//     }

    
// }

// module.exports = Word;

var Letter = require("./Letter.js");

 //build an object array for the Word constructor
function Word (answer){
    this.objArray = [];

     //make a loop to go through every letter guessed
    for (var i = 0; i < answer.length; i++){
        //create new letter variable that pushes letters into objArray 
        var letter = new Letter(answer[i]);
        this.objArray.push(letter);
    }

     //write a function that will log the data in the terminal 
    this.log = function (){
        answerLog ="";
        for (var i = 0; i < this.objArray.length; i++){
            //concatenate characters and underscores
            answerLog += this.objArray[i] + " ";
        }
        console.log(answerLog + "\n=================================");
    };

     //write a function that loops through the objArray and calls the choice function from the Letter.js
    this.userGuess = function(input){
        for (var i = 0; i < this.objArray.length; i++){
            this.objArray[i].choice(input);
        }
    };
}

 //export to be used index.js file
module.exports = Word; 