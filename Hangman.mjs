import { ANSI } from "./Ansi.mjs";
import { HANGMAN_UI } from "./Graphics.mjs";

const correctWord = "Dog".toLowerCase
const numberOfCharInWord = correctWord.length;
let guessedWord = "".padStart(correctWord.length, "___"); // "" is an empty string that we then fill with _ based on the number of char in the correct word.
let wordDisplay = "";
let isGameOver = false;
let wasGuessCorrect = false;
let wrongGuesses = [];

function drawWordDisplay() {

    wordDisplay = "";

    for (let i = 0; i < numberOfCharInWord; i++) {
        //i == 0, wordDisplay == "", guessedWord[0] == "_";
        //i == 1, wordDisplay == "_ ", guessedWord[1] == "_";
        //i == 2, wordDisplay == "_ _ ", guessedWord[2] == "_";
        if (guessedWord[i] != "_") {
            wordDisplay += ANSI.COLOR.GREEN;
        }
        wordDisplay = wordDisplay + guessedWord[i] + " ";
        wordDisplay += ANSI.RESET;
        //i == 0, wordDisplay == "_ ", guessedWord[0] == "_";
        //i == 1, wordDisplay == "_ _ ", guessedWord[1] == "_";
        //i == 2, wordDisplay == "_ _ _", guessedWord[2] == "_";
    }

    return wordDisplay;
}

while (isGameOver==false) {
        console.log(ANSI.CLEAR_SCREEN);
    console.log(drawWordDisplay)();
    console.log(drawlist(wrongGuesses, ANSI.COLOR.RED));
    console.log(HANGMAN_UI[wrongGuesses.length]);

    const answer = (await askQuestion("guess a char or the word: ")).toLowerCase();

    if (answer==correctWord){
        isGameOver = true;
        wasGuessCorrect = true;
    } else if (ifPlayerGuessedLetter(answer)){

        let org = guessedWord;
        guessedWord = "";

        let isCorrect = false;
        for (let i = 0; i < correctWord.length; i++) {
            if (correctWord[i] == answer) {
                guessedWord += answer;
                isCorrect = true;
    }else{
        guessedWord += org[i];
    }
        
    }

    if (isCorrect == false){
        wrongGuesses.push(answer);
    } else if (guessedWord == correctWord){
        isGameOver = true;
        wasGuessCorrect = true;
    }
    }

if (wrongGuesses.length == HANGMAN_UI.length){
    isGameOver = true;
}

}

console.log(ANSI.CLEAR_SCREEN);
console.log(drawWordDisplay());
console.log(drawList(wrongGuesses, ANSI.COLOR.RED));
console.log(HANGMAN_UI[wrongGuesses.length]);

if (wasGuessCorrect) {
    console.log(ANSI.COLOR.YELLOW + "Congratulations you guessed the word correct!");
}
console.log("Game Over");
process.exit();

function ifPlayerGuessedLetter(answer) {
    return answer.length == 1
}

