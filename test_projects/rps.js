// UI VARS

const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");
const myhand = document.querySelector("#myHand");
const timer = document.querySelector("#timer");
const opponenthand = document.querySelector("opponentHand");
const h4myhand = document.querySelector("#myHandText");
const h4opphand = document.querySelector("#opponentHandText");
const h3result = document.querySelector("#timer");
let oppHand, myPick, opponenPick;
// PLAYER SET MOVES
rock.addEventListener("click", pickRock);
paper.addEventListener("click", pickPaper);
scissor.addEventListener("click", pickScissor);

function pickRock() {
  // NUMBER FOR ROCK
  let number;
  number = 1;
  oppHand = randomNum(1, 3);
  whoWins(number, oppHand);
}
function pickPaper() {
  // NUMBER FOR PAPER
  let number;
  number = 2;
  oppHand = randomNum(1, 3);
  whoWins(number, oppHand);
}
function pickScissor() {
  // NUMBER FOR SCISSOR
  let number;
  number = 3;
  oppHand = randomNum(1, 3);
  whoWins(number, oppHand);
}

function whoWins(num, opp) {
  if (num === 1) myPick = "Rock";
  else if (num === 2) myPick = "Paper";
  else if (num === 3) myPick = "Scissor";

  if (opp === 1) opponenPick = "Rock";
  else if (opp === 2) opponenPick = "Paper";
  else if (opp === 3) opponenPick = "Scissor";

  if (num === opp) {
    h3result.style.color = "blue";
    h3result.innerHTML = "Draw";
  } else if (num === 1 && opp === 2) {
    h3result.style.color = "red";
    h3result.innerHTML = "Paper beats rock. You lose";
  } else if (num === 2 && opp === 3) {
    h3result.style.color = "red";
    h3result.innerHTML = "Scissor beats paper. You lose";
  } else if ((num === 3) & (opp === 1)) {
    h3result.style.color = "red";
    h3result.innerHTML = "Rock beats paper. You lose";
  } else if (num === 1 && opp === 3) {
    h3result.style.color = "green";
    h3result.innerHTML = "Rock beats paper. You win";
  } else if (num === 2 && opp === 3) {
    h3result.style.color = "green";
    h3result.innerHTML = "Scissor beats paper. You win";
  } else if (num === 2 && opp === 1) {
    h3result.style.color = "green";
    h3result.innerHTML = "Paper beats rock. You win";
  }

  h4myhand.innerHTML = `My Hand: ${myPick}`;
  h4opphand.innerHTML = `Enemy Hand: ${opponenPick}`;
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
