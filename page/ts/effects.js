import { lory } from "lory.js";
const ScrollReveal = require("scrollreveal");

// scroll reveal
window.sr = ScrollReveal({
  scale: 1,
});
sr.reveal(".text-box");
sr.reveal(".product-r3-row-wrapper div", 200);
sr.reveal(".product-r2-row-wrapper div", 200);
sr.reveal(".img-scroll");

var carousel = null;
var thr = 768;

export function createCarouselIfNecessary() {
  var el = document.querySelector(".press .carousel-wrapper");
  if (!el) return;

  var w = window.innerWidth;

  if (carousel === null && w <= thr) {
    carousel = lory(el, {
      infinite: 1,
      classNameFrame: "carousel-frame",
      classNameSlideContainer: "carousel-slides",
    });
  }
  if (carousel !== null && w > thr) {
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
