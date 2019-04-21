const commands = require("./commands.js");

//prompt the user for input
process.stdout.write('prompt > ');

//The stdin 'data' event triggers safter a user types in a line
process.stdin.on('data', (userInput) => {
  userInput = userInput.toString().trim();
  //evaluateCmd is a function which will be implemented in command.js
  commands.evaluateCmd(userInput);
}); 