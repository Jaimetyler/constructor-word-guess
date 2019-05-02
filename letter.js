var Letter = function(letter) {
    this.letter = letter;
    this.guessed = false;
    this.display = function () {
        if (!this.guessed) {
            return "_";
        }else {
            return this.letter;
        }
    }
    this.check = function(value) {
        if (value === this.letter) {
            return true;
        }
    }
}