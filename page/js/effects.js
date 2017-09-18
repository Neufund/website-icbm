// scroll reveal
window.sr = ScrollReveal({
  scale: 1,
})
sr.reveal(".text-box")
sr.reveal(".product-r3-row-wrapper div", 200)
sr.reveal(".product-r2-row-wrapper div", 200)
sr.reveal(".img-scroll")


// carousel
// siema.min.js
var carousel = null
var thr = 768
function createCarouselIfNecessary() {
  var w = window.innerWidth

  if (carousel=== null && w<=thr) {
    carousel = new Siema({
      selector: '.press .flex-row',
      perPage: 1,
      loop: true
    })

  }
  if (carousel!==null && w>thr) {
    carousel.destroy(true)
    carousel = null
  }
}
createCarouselIfNecessary()
