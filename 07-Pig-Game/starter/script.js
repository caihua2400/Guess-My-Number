'use strict';

//selecting score elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;

//register the current player
let activePlayer = 0;
//store total scores for both players.
const scores = [0, 0];

//state value for whether we will play the game or not, changed when one is winner.

let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //set the current score to 0 and change the background.
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionility

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1 generating a dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2 display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // check if rolled 1 if true , switched to next player.
    if (dice !== 1) {
      //console.log(dice);
      currentScore = currentScore + dice;
      //temporary soluction that future will check the active player
      //current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (dice === 1) {
      //we have to know when the button is clicked, which player is the active player.
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to the active player's total score.
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if the total score is >= 100, if yes, wins.

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('.player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //if not, switch to the next player.
      switchPlayer();
    }
  }
});
