'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//based on the sort variable, we will sort the movements or not.
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  //ascending order
  // const SortedMovements = sort
  //   ? movements.slice().sort((a, b) => a - b)
  //   : movements;
  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    
    <div class="movements__value">${mov}€</div>
    </div>
    
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(str => str.slice(0, 1))
      .join('');
  });
};

const calcDisplaySummary = function (account) {
  console.log(account.movements);
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outs = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outs)}€`;

  const interests = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interests}€`;
};

createUsernames(accounts);

const euroToUsd = 1.1;

const calcAndDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);

  labelBalance.textContent = `${acc.balance}EUR`;
};

const updateUI = function (currentAccount) {
  displayMovements(currentAccount.movements);

  //display balance
  calcAndDisplayBalance(currentAccount);
  //display summary
  calcDisplaySummary(currentAccount);
};
//Transfer Money Logic
// 1 check the cuurent user has enough money(bigger than the transfer) and

//event handlers
//remember if this is a form button it will reload the page. for this behivor, we have to stop this action at this moment.

//we have to access the login user later on in other sections, so we store it in a global variable.
//Then we add negative moment to the current user and add positive moment to the receiver account.
// Then we update the UI.

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting.
  e.preventDefault();
  //console.log('login clicked');
  console.log(accounts);
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // always remember the number since the input of the value is a string.
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and welcome message.
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //clear the input fields and lose focus.
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
    console.log('Login success');
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  //sorted = !sorted;
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  //console.log(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    currentAccount.username !== receiverAcc?.username
  ) {
    console.log('Transfer valid');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    inputClosePin.value = inputCloseUsername.value = '';
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted;
// });

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// const movementsDesc = movements.map((mov, i, arr) =>
//   mov > 0
//     ? `Movements ${i + 1} : You deposited ${mov}`
//     : `Movements ${i + 1} : You withdrew ${Math.abs(mov)}`
// );

//const movementsUSD = movements.map(mov => mov * euroToUsd);
//const deposits = movements.filter(mov => mov > 0);

//const withdrawals = movements.filter(mov => mov < 0);
//console.log(account1.movements);
// const totalDepositsUSD = account1.movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * 1.1)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

//Maximum value of the movements array

/*
const greatest = movements.reduce(
  (acc, cur) => (cur > acc ? cur : acc),
  movements[0]
);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const ages = [5, 2, 4, 1, 15, 8, 3];
const ages2 = [16, 6, 10, 5, 6, 1, 4];
console.log(ages.length);
const calcAverageHumanAge = function (ages) {
  return ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  //console.log(humanAges);
};

console.log(calcAverageHumanAge(ages2));
*/

//find method.

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

//sorting arrays

// console.log(0.1 + 0.2);

//return <0 a,b(keep order)
//return >0 b,a(switch order)

//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   else return -1;
// });

// console.log(movements);

//descending

// movements.sort((a, b) => {
//   if (a > b) return -1;
//   else return 1;
// });

// console.log(movements);

//filling array

// const x = new Array(7);
// console.log(x);
// x.fill(2);
// console.log(x);
// x.fill(5, 0, 5);
// console.log(x);

//Array.from
// const y = Array.from({ length: 7 }, (_, b) => b * 3);

// console.log(y);

// labelBalance.addEventListener('click', function (e) {
//   e.preventDefault();
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI.map(el => el.textContent.replace('€', '')));
// });

//1.
// const depositsSum = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .filter(x => x > 0)
//   .reduce((acc, cur) => acc + cur);

// console.log(depositsSum);

//2.
//how many deposits that have been in the bank at least 1000 dollars.

// const depositsNum1000 = accounts
//   .flatMap(x => x.movements)
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
// console.log(depositsNum1000);

//3.

//create a object that contains the sum of the deposits and the withdrawls.

// const depositsNum1000 = accounts
//   .flatMap(x => x.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(depositsNum1000);

//4.

//convert any string to a title case.

// const str = 'this is a nice title';

// const convertToTitle = function (title) {
//   const expections = ['a', 'an', 'the', 'but', 'and', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word =>
//       expections.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join(' ');
//   return titleCase;
// };

// console.log(convertToTitle(str));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//recommendedFood = weight ** 0.75 * 28

const calcRecommendFood = function (weight) {
  return Math.trunc(weight ** 0.75 * 28);
};
console.log(calcRecommendFood(13));

//1.
//dogs.forEach(dog => console.log(dog.weight));
dogs.forEach(
  dog => (dog.recommendFood = calcRecommendFood(dog.weight).toFixed(2))
);
console.log(dogs);
//2.

// const findResult = dogs.find(d => {
//   let result = d.owners.includes('Sarah');
//   return result;
// });

// if (typeof findResult !== 'undefined') {
//   console.log(
//     findResult.recommendFood > findResult.curFood
//       ? `eat too much`
//       : `eat too less`
//   );
// }

//3.
const ownersEatTooLittle = dogs
  .filter(dog => dog.recommendFood > dog.curFood)
  .flatMap(dog => dog.owners);
const ownersEatTooMuch = dogs
  .filter(dog => dog.recommendFood < dog.curFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

//4.
console.log(`${ownersEatTooLittle.join(' and ')} eat too little`);
console.log(`${ownersEatTooMuch.join(' and ')} eat too much`);

//5.

// const result = dogs.some(dog => dog.curFood === dog.recommendFood);
// console.log(result);

//6
const result = dogs.some(
  dog =>
    dog.curFood >= dog.recommendFood * 0.9 &&
    dog.curFood <= dog.recommendFood * 1.1
);
console.log(result);

//7.

const checkEatingOkay = dog =>
  dog.curFood >= dog.recommendFood * 0.9 &&
  dog.curFood <= dog.recommendFood * 1.1;

const OKDog = dogs.filter(checkEatingOkay);
console.log(OKDog);

//8.
// const y = Array.from({ length: 7 }, (_, b) => b * 3);

const newDogs = Array.from(dogs).sort((pre, cur) => {
  return pre.recommendFood - cur.recommendFood;
});
console.log(newDogs);
