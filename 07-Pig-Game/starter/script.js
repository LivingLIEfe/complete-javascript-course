'use strict';

// selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.remove(`hidden`);

//roll dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1. generate random dice number
    const dice = Number(Math.trunc(Math.random() * 6) + 1);

    //2. display dice number
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    //3. Check if number is 1
    if (dice !== 1) {
      //add value of dice to score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2.Check if player score >= 100
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add(`hidden`);
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }

    //Finish the game
  }
});

btnNew.addEventListener(`click`, function () {
  //1. set values to 0
  playing = true;
  diceEl.classList.remove(`hidden`);
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //2. Switch player back to player 1 (player 0)
  if (activePlayer === 1) {
    activePlayer === 0;
  }
  player0El.classList.add(`player--active`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--active`);
});
