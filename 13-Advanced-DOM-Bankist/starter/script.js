'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

//Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //guard clause
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  //activate content area.
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// //h1.firstElementChild.style.color = 'white';
// console.log(h1.parentNode);
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentNode.children);
//h1.closest('.header').style.backgroundColor = 'Orange';
//page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log(e);
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//1. add evenetlistener to common parent element. 2 determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //matching the strategy
  if (e.target.classList.contains('nav__link')) {
    //console.log('LINK');
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
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

// const ramdonInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${ramdonInt(0, 255)},${ramdonInt(0, 255)},${ramdonInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('LINK', e.target);
//   this.style.backgroundColor = randomColor();
//   //e.stopPropagation();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log('LINK', e.target);
//   this.style.backgroundColor = randomColor();
// });

//menu fade animation
const handover = function (e) {
  console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};

//passing an argument into handler.
nav.addEventListener('mouseover', handover.bind(0.5));

nav.addEventListener('mouseout', handover.bind(1));

//sticky navigation
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function (e) {
  console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
