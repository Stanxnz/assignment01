/*
    Hi.
    This is a set of exercises
    The idea is to practice a few things at a time.
    You do this by entering your answer after a task is given (see the example)

    DO NOT change any provided code unless the task specifically tells you to.
*/

/*
    Task: Example
    Write code to print all the names in the list, one name per line
*/
console.log("Task: Example");
const people = ["Tony", "Christian", "Håkon"]

for (let index = 0; index < people.length; index++) {
    let person = people[index];
    console.log(person);
}


/*
    Task: A
    Write code that prints the sentence "Debugging is like being a detective in a crime drama where you are also the murderer" 
    100 times. 
    Remember we use console.log() to print things out.
*/
console.log("Task: A");
for (let i = 0; i < 100; i++) {
console.log("Debugging is like being a detective in a crime drama where you are also the murderer" )
}




/*
    Task: B
    The following code is incorrect, can you fix the errors?
    This one isn't that simple, there are syntax errors and logical errors.
    Try to think about what we are trying to achieve.
*/
console.log("Task: B");

const max = 99;
for (let index = max; index > 0; index--); {
    console.log(index + " bottles of soda on the shelf");
    console.log(index + " bottles of soda on the shelf");

    console.log(
        "Take one down, pass it around." + (index - 1) + " bottles of soda on the shelf"
    );
    console.log(" ");
}

console.log("No more bottles of soda on the shelf");


/*
    Task: C
    Declare a variable for gravity, a variable for pi, and a variable for the number of people in a room. 
*/
console.log("Task: C");

const GRAVITY = 9.81;
const PI = Math.PI;
let numberOfPeopleInRoom = 10;

/*
    Task: D
    Create a function that adds two numbers, the function should be named add
*/
console.log("Task: D");

// write your function here.
function add(num1, num2) {
    return num1 + num2
}


console.log("3 + 6 = " + add(3, 6));
console.log("5673 + 234 = " + add(5673, 234));

/*
    Task: E
    Use the variable people from the example and print the names in reverse order (using a loop)
    NB: You should not change people, just use its contents.
*/
console.log("Task: E");

for (let i = people.length -1; i>=0; i--) {
    console.log(people[i]);
}

/*
    Task: F
    Declare a variable for a list of phone numbers. Your list should have at least 3 numbers. 
*/
console.log("Task: F");
const PHONENUMBERS = ["0610052708", "0620054807", "0630056870"];


/*
    Task: G
    Print only the last phone number in your list from Task F
*/
console.log("Task: G");

const LASTPHONENUMBER = PHONENUMBERS[PHONENUMBERS.length-1];

console.log(LASTPHONENUMBER);

/*
    Task: H
    Print only the last names of the people in the list, using a loop.
*/
console.log("Task: H");

let peopleNames = [["Christian", "Simonsen"], ["Tony", "Bergholtz"]]

for (let person of peopleNames){
    console.log(person[1]);
}