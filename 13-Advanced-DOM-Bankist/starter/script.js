'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScroll.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //console.log(e.target.getBoundingClientRect());
  //window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset);
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', function (e) {
  console.log('you are reading the heading.');
});
// h1.onmouseenter = function (e) {
//   console.log('mouse entered');
// };

//selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
//const header = document.querySelector('.header');
// const allSelections = document.querySelectorAll('.section');
// console.log(allSelections);
// console.log(document.getElementById('section--1'));
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);
// const btnList = document.getElementsByClassName('btn');

//creating and inserting elements.

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// //message.textContent = 'we use cookies to improve web experience.';
// message.innerHTML =
//   'we use cookies to improve web experience.<button class="btn btn--close--cookie">Got it</Button >';
// //insert the element as the first element of the parent element
// header.prepend(message);
// //insert the element as the last element of the parent element.
// //Also there are only one message element is inserted since this is a live element.
// header.append(message);

// //get two elements at the same time.
// //header.append(message.cloneNode(true));
// //insert as a silbing
// //header.before(message)
// //header.after(message)

// //delete elements.

// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', () => message.remove());

// //styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// //we cann't read style properties like const result = message.style.width. The reason is that it only works with inline properties.

// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).width);

// document.documentElement.style.setProperty('--color-primary', 'orangered');
// //Attributes

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('designer'));
// console.log((logo.alt = 'This is a beautiful logo'));

// console.log(logo.getAttribute('src'));

// //Data Attributes
// console.log(logo.dataset.versionNumber);

// //classes
// logo.classList.add;
// logo.classList.remove;
// logo.classList.toggle;
// logo.classList.contains;
