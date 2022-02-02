// Globals
var todaysWord = [];
var currGuess = [];
var guessCount = 1;
var totalGuesses = 8;
var victory = false;


function parseGuessWord(arrInputs) {
  let guessWord = '';
  for (let i = 0; i < arrInputs.length; i++) {
    guessWord += arrInputs[i].value;
  }
  return guessWord;
}


function validWord(word) {
  return true;
}


function calculateScore(guessWord) {
  let score = Array(todaysWord.length);
  score.fill("");
  let charsChecked = [];

  // check for black
  for (let i = 0; i < todaysWord.length; i++) {
    if (guessWord[i] === todaysWord[i]) {
      score[i] = "⚫️";
      charsChecked[i] = true;
    }
  }
  
  // then for white
  for (let i = 0; i < todaysWord.length; i++) {
    for (let j = 0; j < todaysWord.length; j++) {
      if (i != j && !score[i] && !charsChecked[j] && guessWord[i] === todaysWord[j]) {
        score[i] = "⚪️";
        charsChecked[j] = true;
      }
    }
  }

  if (score.filter(x => x == "⚫️").length === score.length) {
    victory = true;
  }

  return score.sort();
}


function submitGuess() {
  let result = calculateScore(currGuess);
  document.getElementById("guess" + guessCount).getElementsByClassName("key")[0].textContent = result[0] + result[1] + " " + result[2] + result[3];
  guessCount++;
  if (victory) {
    document.getElementsByTagName("body")[0].className += "pyro";
  } else if (guessCount <= totalGuesses) {
    currGuess = [];
    console.log('next turn');
  } else {
    setTimeout(() => {alert("Too bad! Try again tomorrow")}, 1000);
  }
}


function dateSeed() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return Number(yyyy+mm+dd);
}


function myRandom(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}


function inputEvent(id) {
  let pinCount = currGuess.length;
  if (id === "delete") {
    document.getElementById("guess" + guessCount).getElementsByClassName("pinhole")[pinCount - 1].textContent = '';
    currGuess.pop();
  } else if (pinCount === 4 && id === "enter") {
    submitGuess();
  } else if (pinCount < 4) {
    document.getElementById("guess" + guessCount).getElementsByClassName("pinhole")[pinCount].textContent = id;
    currGuess.push(id);
  }
  console.log(currGuess);
}


function init() {
  // draw board
  const gameDiv = document.getElementById("game");
  for (let i = 0; i < totalGuesses; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("id", "guess" + (i + 1));
    gameDiv.appendChild(rowDiv);

    // Inputs
    for (let j = 0; j < todaysWord.length; j++) {
      let letterInput = document.createElement("div");
      letterInput.setAttribute("class", "pinhole");
      rowDiv.appendChild(letterInput);
    }
    let keyDiv = document.createElement("div");
    keyDiv.className = "key";
    rowDiv.appendChild(keyDiv);
  }

  const keyboardKeys = document.getElementById("keyboard").getElementsByTagName("button");
  for (let i = 0; i < keyboardKeys.length; i++) {
    keyboardKeys[i].addEventListener("click", function() {
      inputEvent(this.id);
    });
  }
}

window.onload = function() {
  todaysWord = ['🔴', '🔵', '🟣', '🟤'];
  init();
}

// 🔴🔵🟣🟤🟢🟠
// ⚪️⚫️