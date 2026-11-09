//import "./style.css";

import { GuessingGame } from "./guessing-game";

const btnAnswer = document.getElementById("btnAnswer");
const userMessageDiv = document.getElementById("userMessage");
const errorDiv = document.getElementById("errorMessage");
const btnRestart = document.getElementById("btnRestart");
let maxGuess = 10;

function handleAnswerClick() {
  let answer = getUserAnswer();

  let result = game.guess(answer);

  if (game.isGameOver) {
    return;
  }

  if (result.isError) {
    errorDiv!.innerText = result.message;
  } else {
    userMessageDiv!.innerText = result.message;
  }

  console.log("Answer clicked!", result);
}

btnAnswer?.addEventListener("click", handleAnswerClick);

function getUserAnswer(): number | null {
  const answerElement = document.getElementById(
    "userAnswer",
  ) as HTMLInputElement | null;

  if (answerElement == null) {
    return null;
  }

  let answer = Number(answerElement.value);

  if (Number.isNaN(answer) || answer == 0) {
    return null;
  }

  answerElement.value = "";
  answerElement.focus();
  return answer;
}

function handleRestartClick() {
  console.log("resart clicked");

  game = new GuessingGame(maxGuess, 3);
}

btnRestart?.addEventListener("click", handleRestartClick);

let game = new GuessingGame(maxGuess, 3);
