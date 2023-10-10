// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "\n";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let userWord = input.question( "Enter a word to score: ");
   console.log(oldScrabbleScorer(userWord));
};

let simpleScorer = function (word) {
   let score = word.length;
   return score;
};

let vowelBonusScorer = 
   function(word) {
      let vowels = ['a','e','u','o','i'];
      score = 0;
      for (let i = 0; i < word.length; i++) {
         if(vowels.includes(word[i].toLowerCase())) {
            score += 3;
         }
         else {
            score += 1;
         }
      }
      return score;
   };


let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let score = 0;
	for (let i = 0; i < word.length; i++) {
 
	  for (const letter in newPointStructure) {
 
		 if (word[i].toLowerCase() === letter) {
			score += newPointStructure[letter];
		 }
 
	  }
	}
	return score;
 };


const scoringAlgorithms = [
   {name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer},
   {name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer},
   {name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer}
];

function scorerPrompt() {
   let choice = 3;
   let choices = [0, 1, 2];
   while(!choices.includes(choice))  {
      choice = Number(input.question("Which scoring algorithm would you like to use ?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: "));
   }
   return scoringAlgorithms[choice];
}

function transform(pointStructure) {
   let newStructure = {};
   for(score in pointStructure) {
      for(let i = 0; i < pointStructure[score].length; i++) {
         newStructure[pointStructure[score][i].toLowerCase()] = Number(score);
      }
   }

   return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   console.log("Let's play some scrabble!\n");
   let userWord = input.question( "Enter a word to score: ");
   let sortingAlgorithm = scorerPrompt();
   console.log(`Score for '${userWord}': ${sortingAlgorithm.scorerFunction(userWord)}`);

   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
