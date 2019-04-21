const fs = require("fs");

//write out data
function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
    //we will add the functionality of echo next within the object commandLibrary
    commandLibrary.echo(userInputArray.slice(1).join(" "));
    break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "sort":
      commandLibrary.sort(userInputArray.slice(1));
    case "wc":
      commandLibrary.wc(userInputArray.slice(1));
      break;
    case "uniq":
      commandLibrary.uniq(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
    default:
      console.log("Command not found. \nprompt > ")
      break;
  }
}

//where we will store the logic of our commands
const commandLibrary = {

  //the echo command, returns what the user typed
  "echo": function(userInput) {
    done(userInput);
  },
  //the cat command, returns the contents of a file
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) {
      console.error(err)
    };
      done(data);
    });
  },
  //the sort command, returns a sorted file
  "sort": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) console.error(err);
        const array = data.toString().split('\n');
        const sortedArray = array.sort();
        const stringArray = sortedArray.join('\n');
        done(stringArray);
      })
    },
  //the word count command, returns number of lines, words, and characters in a file
  "wc": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) console.error(err);
      const array = data.toString().split('\n');
      const stringArray = data.toString().split(' ');
      const stringAll = data.toString().split('');
      var lineCount = 0;
      var wordCount = 0;
      var charCount = 0;
      for(i=0; i < array.length-1; i++) {
        lineCount += 1;
      };
      for(j=0; j < stringArray.length-1; j++) {
        wordCount +=1;
        }
      for (k=0; k < stringAll.length-1; k++){
        charCount += 1;
      }
        var counts = lineCount.toString() + '    ' + wordCount.toString() + '    ' + charCount.toString();
      done(counts);
      })
    },
    //The unique command, returns unique elements in the file (no repeats)
    "uniq": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, (err, data) => {
        if (err) console.error(err);
          const array = data.toString().split('\n');
          const arrayWithoutDuplicates = Array.from(new Set(array));
          const stringArray = arrayWithoutDuplicates.join("\n");
          done(stringArray);
      })
    },
    //The head command, returns the first five elements of the file
    "head": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, (err, data) => {
        if (err) console.error(err)  ;
          const array = data.toString().split('\n');
          var headOfArray = array.slice(0, 5);
          var stringArray = headOfArray.join('\n');
          done(stringArray)
      })
    },
  }

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
