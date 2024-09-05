import { createInterface } from 'readline/promises';
import {stdin as input, stdout as output} from 'process';
import { ANSI } from './Ansi.mjs';

//pick a word
const wordOptions = ['dog', 'cat', 'mouse', 'shark', 'giraffe', 'snake'];
let chosenWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
let hiddenWord = Array(chosenWord.length).fill('_');
let numberOfAttempt = 12;
let guessedLetters = [];
let wrongGuesses = [];
let totalGuesses = 0;

const rl = createInterface({input, output});

//make the hangman
const hangmanStages = [
    `

    
    
    
    
    
                 `
    , `

    =========`, `
     
         |
         |
         |
         |
         |
    =========`,
    `


         +
         |
         |
         |
         |
         |
    =========`,
   `


      ---+
         |
         |
         |
         |
         |
    =========`,
   `
     +---+
         |
         |
         |
         |
         |
    =========`,
    `
      +---+
      |   |
          |
          |
          |
          |
    =========`, `
      +---+
      |   |
      O   |
          |
          |
          |
    =========`, `
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========`, `
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========`, `
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    =========`, `
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    =========`, `
      +---+
      |   |
      O   |
     /|\\  |
     / \\  |
          |
    =========`];


console.log('Hello and welcome to my hangman game');
console.log('Your word is: ' + hiddenWord.join(' ') + '\n');

const promptUser = async() => {
    const choice = await rl.question('You can now guess a [letter] or the [word].');

    if (choice.toLowerCase() === 'letter') {
        await promptLetterGuess();
    } else if(choice.toLowerCase()=== 'word'){
        await promptWordGuess();
    } else {
        console.log('Please enter [letter] or [word].')
        await promptUser();
    }
};

const promptLetterGuess = async () => {
    const letter = await rl.question('Guess a letter: ');

    if(letter.length !== 1 || !letter.match(/[a-z]/)) {
        console.log('Please enter a letter from the alphabet.');
        return await promptLetterGuess();
    }

    totalGuesses++;

    if(guessedLetters.includes(letter)){
        console.log('You have already guessed this letter.');
        return await promptLetterGuess();
    }

    guessedLetters.push(letter);

    if (chosenWord.includes(letter)){
        console.log('You guessed correct!');
        for (let i = 0; i < chosenWord.length; i++){
            if (chosenWord[i] === letter){
                hiddenWord[i] = letter;
            }
        }
    } else {
        numberOfAttempt--;
        wrongGuesses.push(letter);
        console.log('You have guessed wrong, you have ' + numberOfAttempt + ' attempts left.');
        console.log(hangmanStages[12 - numberOfAttempt]);
    }
    
    console.log(hiddenWord.join(' ')+ '\n');
    if (!hiddenWord.includes('_')){
        console.log('Congratulations, you have guessed the word! The word was: ' + chosenWord)
        displayStats();
        return rl.close();
    }

    if (numberOfAttempt === 0){
        console.log('A man has been hanged! The word was: ' + chosenWord);
        console.log(hangmanStages[12]);
        displayStats();
        return rl.close();
    }

    await promptUser();
};

const promptWordGuess = async() => {
    const wordGuess = await rl.question('Guess the word: ');

    totalGuesses++;

    if (wordGuess.toLowerCase() === chosenWord){
         console.log('Congratulations! You guessed the word! The word was: ' + chosenWord);
         displayStats();
         rl.close();
    }else{
        numberOfAttempt--;
        wrongGuesses.push(wordGuess);
        console.log('You have guessed wrong.');
        console.log(hangmanStages[10 - numberOfAttempt])

        if (numberOfAttempt === 0) {
            console.log('A man has been hanged! The word was: ' + chosenWord);
            console.log(hangmanStages[10]);
            displayStats();
            rl.close();
        } else {
            await promptUser();
        }

    }
       
};

const displayStats = () => {
    console.log('\nGame Stats: ');
    console.log('total guesses: ' + totalGuesses);
    console.log('total wrong guesses: ' + wrongGuesses);
    console.log( 'total wrong letters/words guessed: ' + wrongGuesses.join(', '));

};

promptUser(); //start the game
