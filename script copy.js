'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();

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

//Selecting elements

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSelections = document.querySelectorAll('.section');

console.log(allSelections);

document.getElementById('section--1');

//HTML collection, dynamic one, updates automatically

const allBut = document.getElementsByTagName('button');

console.log(document.getElementsByClassName('btn'));

// create and insert ellements

//.insertAdjacent

const message = document.createElement('div');
message.classList.add('cookie-message');

message.textContent = 'We use cookies for improved functionality and analytics';

//adding HTML code

message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cokie">Got it!</button>';

//moving DOM element
//header.prepend(message);
//header.append(message);

header.before(message);
//header.after(message);

//Delete elements

document
  .querySelector('.btn--close-cokie')
  .addEventListener('click', function () {
    message.remove();
  });

//STYLES

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//Ištraukia, jeigu net nenurodėm
getComputedStyle(message).height;

//Galim pakeisti
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//Galim pakeisti properčius esančius css root skiltyje, kurie buvo nurodyti
document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes
const logo = document.querySelector('.nav__logo');

logo.alt = 'Beatiful and minimalist';

logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

//Data atributes

console.log(logo.dataset.versionNumber);

//classes

logo.classList.add();
logo.classList.remove();
logo.classList.toggle('a');
logo.classList.contains('c'); // not includes

//DONT USE, WILL OVERWRITE ALL CLASSES
logo.clasName = 'jonas';

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //WHERE EVENT HAPPENING
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //STOP PROPAGATION
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

const h1 = document.querySelector('h1');

///IF YOU WANT TO LISTEN EVENT ONCE

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading heading :D');

  h1.removeEventListener('mouseenter', alertH1);
};

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 1000);

h1.addEventListener('mouseenter', alertH1);

/*  OLD SCHOOL WAY


h1.onmouseenter = function (e) {
  alert('addEventListener: Great! You are reading heading :D');
};

*/

// rgb(255, 255, 255)

const h1 = document.querySelector('h1');

//going downwards: child

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';

//going upwards: parents

console.log(h1.parentNode);
console.log(h1.parentElement);

//finds parrent no matter how far they are
h1.closest('.header').style.background = 'var(--gradient-secondary)';

console.log('closest header', h1.closest('.header'));

//going sideways: siblings

console.log(h1.previousElementsSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
