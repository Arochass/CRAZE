import {preloadImages, preloadFonts} from '../utils';
import Cursor from '../cursor';
import LocomotiveScroll from 'locomotive-scroll';
import Img1 from '/img/foreground/casual2.png';
import Img2 from '/img/foreground/minidress.png';
import Img3 from '/img/foreground/grunge2.png';
import Img4 from '/img/foreground/plaid.png';
import Img5 from '/img/foreground/last.png';

// Initialize Locomotive Scroll (horizontal direction)
const lscroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    direction: 'horizontal',
    smartphone: { smooth: true, direction: 'horizontal', horizontalGesture : true}, 
    tablet: { smooth: true, direction: 'horizontal', horizontalGesture : true }
});

lscroll.init()
lscroll.on('scroll', (args) => {
    if (typeof args.currentElements['circle'] === 'object') {
      let el = args.currentElements['circle']
      let progress = el.progress
      let rotateDeg = 720 * progress
      let circle= document.querySelectorAll(
        '[data-scroll-id="circle"]'
      )[0]
      circle.style.transform = `rotate(${rotateDeg}deg)`
    }

    if (typeof args.currentElements['changeimg'] === 'object') {
      let el = args.currentElements['changeimg']
      let progress = el.progress
      let change= document.querySelectorAll(
        '[data-scroll-id="changeimg"]'
      )[0]

      if (progress >= 0 && progress < 0.25) {
        change.style.backgroundImage = `url(${Img1})`
      }
      if (progress >= 0.25 && progress < 0.5) {
        change.style.backgroundImage = `url(${Img2})`
      }
      if (progress >= 0.5 && progress < 0.75) {
        change.style.backgroundImage = `url(${Img3})`
      }
      if (progress >= 0.75 && progress < 0.9) {
        change.style.backgroundImage = `url(${Img4})`
      }
      if (progress >= 0.9 && progress < 1) {
        change.style.backgroundImage = `url(${Img5})`
      }

    }
  })

// Preload images and fonts
Promise.all([preloadImages('.gallery__item-imginner'), preloadFonts('vxy2fer')]).then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');

    // Initialize custom cursor
    const cursor = new Cursor(document.querySelector('.cursor'));

    // Mouse effects on all links and others
    [...document.querySelectorAll('a')].forEach(link => {
        link.addEventListener('mouseenter', () => cursor.enter());
        link.addEventListener('mouseleave', () => cursor.leave());
    });
});
