'use strict';
///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsCointainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('nav');
//Modal window
const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};
const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
btnsOpenModal.forEach((btn)=>btn.addEventListener('click', openModal)
);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
//Smooth scrolling
btnScrollTo.addEventListener('click', function(e) {
    console.log(e.target.getBoundingClientRect());
    console.log('Current scrol (X,Y)', window.pageXOffset, pageYOffset);
    console.log('heigh/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
    //Modern solution, scroll smoothly to section
    section1.scrollIntoView({
        behavior: 'smooth'
    });
});
//Page navigation
//OLDER WAY of smooth scrolling
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('LINK');
//     /// get attribute value. we put id in href, them read and then we select
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();
    console.log(e.target);
    //Matching strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
        console.log('link');
    }
});
/// Tabbed component
//not optimal if we would have lots of elements
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));
tabsCointainer.addEventListener('click', function(e) {
    //FINDS CLOSEST element to which we clicking, if we click element itself, when closest is the element itself
    const clicked = e.target.closest('.operations__tab');
    // Guard clause
    if (!clicked) return;
    //remove active classes
    tabs.forEach((t)=>t.classList.remove('operations__tab--active')
    );
    tabsContent.forEach((c)=>c.classList.remove('operations__content--active')
    );
    //Active tab
    clicked.classList.add('operations__tab--active');
    //Activate content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});
//Menu fade animation
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });
const handleHover = function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        siblings.forEach((el)=>{
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};
//Rewatch this
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
//Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
//this CALLBACK function will be called every time target interstects with root/object at the treshold we've dfined
//entries are treshold array
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   treshold: [0],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
//this CALLBACK function will be called every time target interstects with root/object at the treshold we've dfined
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const stickyNav = function(entries) {
    const [entry] = entries;
    // console.log(entry);
    if (entry.isIntersecting) nav.classList.remove('sticky');
    else nav.classList.add('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    treshold: 0,
    rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);
//Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    treshold: 0.15,
    rootMargin: '-20px'
});
allSections.forEach(function(section) {
    sectionObserver.observe(section);
// section.classList.add('section--hidden');
});
///LAZY LOADING IMAGES
const imTargets = document.querySelectorAll('img[data-src]');
const loading = function(entries, observer) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;
    //replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loading, {
    root: null,
    treshold: 1,
    rootMargin: '-200px'
});
imTargets.forEach((img)=>imgObserver.observe(img)
);
//Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slides.length;
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';
const createDots = function() {
    slides.forEach(function(_, i) {
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
};
createDots();
const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach((dot)=>dot.classList.remove('dots__dot--active')
    );
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
activateDot(0);
const goToSlide = function(slide) {
    slides.forEach((s, i)=>{
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
        console.log(i, slide);
    });
};
goToSlide(0);
activateDot(curSlide);
const nextSlide = function() {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
};
const prevSlide = function() {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
};
// 0%, 100%, 200%
//Next slide
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function(e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
});
dotContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')) {
        const slide = e.target.dataset.slide;
        goToSlide(slide);
        activateDot(slide);
    }
});
document.addEventListener('DOMContentLoaded', function(e) {
    console.log(' HTML parsed and DOM built');
});

//# sourceMappingURL=index.810bb8fa.js.map
