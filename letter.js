// Letter.js: Contains a constructor, Letter. This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. That means the constructor should define:

// A string value to store the underlying character for the letter

// A boolean value that stores whether that letter has been guessed yet

// A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed

// A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly

// var Letter = function(letter) {
//     this.letter = letter;
//     this.guessed = false;
//     this.display = function () {
//         if (!this.guessed) {
//             return "_";
//         }else {
//             return this.letter;
//         }
//     }
//     this.check = function(value) {
//         if (value === this.letter) {
//             return true
//         }
//     }
// }

// module.exports = Letter;

function Letter (value){
    this.letter = value;
    this.guessed = false;

     //return the value as a string
    this.toString = function (){
        //check the value of the letter
        if (this.letter === " "){
            this.guessed = true;
            return " ";
        } else {
            //return an underscore if the letter guessed is incorrect
            if (this.guessed === false) {
                return "_";
            } else {
                return this.letter;
            }
        }
    };

     //return the letter if guessed is correct
    this.choice = function(choice){
        if (choice === this.letter){
            this.guessed = true;
        }
    };
}

 //export to be used in Word.js file
module.exports = Letter;
