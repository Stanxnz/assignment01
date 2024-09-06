import { createInterface } from 'readline/promises';
import {stdin as input, stdout as output} from 'process';
import {ANSI} from './ansi.mjs';
import { HANGMAN_UI} from './graphics.mjs';
import { ANIMAL_NAMES } from './animals.mjs';


let chosenWord, hiddenWord, numberOfAttempt, guessedLetters, wrongGuesses, totalGuesses;


function startGame(){
    const wordOptions = ANIMAL_NAMES;
	chosenWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	hiddenWord = Array(chosenWord.length).fill('_');
	numberOfAttempt = HANGMAN_UI.length;
	guessedLetters = [];
	wrongGuesses = [];
	totalGuesses = 0;

}

function resetGame() {
    console.log(ANSI.CURSOR_HOME + ANSI.CLEAR_SCREEN);
    console.log(ANSI.COLOR.GREEN + 'Hello and welcome to my hangman game');
    console.log(ANSI.RESET + 'Your word is: ' + hiddenWord.join(' ') + '\n');

}
const rl = createInterface({input, output});

startGame();
resetGame();

const promptUser = async() => {
    const choice = await rl.question('You can now guess a [letter] or the [word].');
    if (choice.toLowerCase() === 'letter') {
        await promptLetterGuess();
    } else if(choice.toLowerCase()=== 'word'){
        await promptWordGuess();
    } else {
        console.log('Please enter [letter] or [word].');
        await promptUser();
    }
};

const promptLetterGuess = async () => {
    const letter = await rl.question('Guess a letter: ');
    if(letter.length !== 1 || !letter.match(/[a-z]/)) {
        console.log(ANSI.COLOR.YELLOW + 'Please enter a letter from the alphabet.');
        console.log(ANSI.RESET);
        return await promptLetterGuess();
    }

    totalGuesses++;

    if(guessedLetters.includes(letter)){
        console.log(ANSI.COLOR.YELLOW + 'You have already guessed this letter.');
        console.log(ANSI.RESET);
        return await promptLetterGuess();
    }

    guessedLetters.push(letter);

    if (chosenWord.includes(letter)){
        console.log(ANSI.COLOR.GREEN + 'You guessed correct!');
        console.log(ANSI.RESET);
        for (let i = 0; i < chosenWord.length; i++){
            if (chosenWord[i] === letter){
                hiddenWord[i] = letter;
            }
        }
    } else {
        numberOfAttempt--;
        wrongGuesses.push(letter);
        console.log(ANSI.COLOR.RED + 'You have guessed wrong, you have ' + numberOfAttempt + ' attempts left.');
        console.log(ANSI.RESET);
        console.log(HANGMAN_UI[HANGMAN_UI.length - numberOfAttempt]);
    }
    
    console.log(hiddenWord.join(' ')+ '\n');
    if (!hiddenWord.includes('_')){
        console.log(ANSI.COLOR.GREEN + 'Congratulations, you have guessed the word! The word was: ' + chosenWord);
        console.log(ANSI.RESET);
        displayStats();
        await askToPlayAgain();
    }

    if (numberOfAttempt === 0){
        console.log(ANSI.COLOR.RED + 'A man has been hanged! The word was: ' + chosenWord);
        console.log(ANSI.RESET);
        console.log(HANGMAN_UI[HANGMAN_UI.length - numberOfAttempt]);
        displayStats();
        await askToPlayAgain();
    }

    await promptUser();
};

const promptWordGuess = async() => {
    const wordGuess = await rl.question('Guess the word: ');

    totalGuesses++;

    if (wordGuess.toLowerCase() === chosenWord){
         console.log(ANSI.COLOR.GREEN + 'Congratulations, You guessed the word! The word was: ' + chosenWord);
         console.log(ANSI.RESET);
         displayStats();
         await askToPlayAgain();
    }else{
        numberOfAttempt--;
        wrongGuesses.push(wordGuess);
        console.log(ANSI.COLOR.RED + 'You have guessed wrong, you have ' + numberOfAttempt + ' attempts left.');
        console.log(ANSI.RESET);
        console.log(HANGMAN_UI[HANGMAN_UI.length - numberOfAttempt]);

        console.log(hiddenWord.join(' ') + '\n');

        if (numberOfAttempt === 0) {
            console.log(ANSI.COLOR.RED + 'A man has been hanged! The word was: ' + chosenWord);
            console.log(ANSI.RESET);
            console.log(HANGMAN_UI[HANGMAN_UI.length - numberOfAttempt]);
            displayStats();
            await askToPlayAgain();
        } else {
            await promptUser();
        }

    }
       
};

const displayStats = () => {
    console.log('\nGame Stats: ');
    console.log('total guesses: ' + totalGuesses);
    console.log('total wrong guesses: ' + wrongGuesses);

};

const askToPlayAgain = async () => {
    const playAgain = await rl.question('Do you want to play again? Type [yes] or [no]: ');
    if(playAgain.toLowerCase() === 'yes'){
        startGame();
        resetGame();
        promptUser();
    } else {
        console.log('Thanks for playing my game!');
        rl.close();
    }
}

startGame();
promptUser(); 
