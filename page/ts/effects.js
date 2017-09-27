import { lory } from "lory.js";
const ScrollReveal = require("scrollreveal");

// scroll reveal
window.sr = ScrollReveal({
  scale: 1,
});
// index page
sr.reveal(".people-row .person-info");
sr.reveal(".platform-overview .feature-list");
sr.reveal(".how-it-works .image");

// product page
sr.reveal(".text-box");
sr.reveal(".product-r3-row-wrapper div", 200);
sr.reveal(".product-r2-row-wrapper div", 200);
sr.reveal(".img-scroll");

var carousel = null;
var carouselBreakpoint = 1200; // this has to be the same as $press-carousel-breakpoint sass variable

export function createCarouselIfNecessary() {
  var el = document.querySelector(".press .carousel-wrapper");
  if (!el) return;

  var w = window.innerWidth;

  if (carousel === null && w < carouselBreakpoint) {
    carousel = lory(el, {
      infinite: 1,
      classNameFrame: "carousel-frame",
      classNameSlideContainer: "carousel-slides",
    });
  }
  if (carousel !== null && w > carouselBreakpoint) {
    carousel.destroy();
    carousel = null;
  }
}

createCarouselIfNecessary();

setInterval(function() {
  if (carousel !== null) {
    carousel.next();
  }
}, 2000);
