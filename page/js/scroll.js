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
  console.log(" "+w+" "+thr)
  if (carousel=== null && w<thr) {
    carousel = new Siema({
      selector: '.press .flex-row',
      perPage: 1,
      loop: true
    })

  }
  if (carousel!==null && w>=thr) {
    carousel.destroy(true)
    carousel = null
  }
}
createCarouselIfNecessary()





// scroll highlighting

function getScroll() {
  return window.scrollY || document.documentElement.scrollTop
}

var scrollHeights = []
window.addEventListener("load", function() {
  // console.log("document load event")
  var ul = document.querySelector("#product-menu ul")
  if (!ul) {
    console.log("no ul")
    return
  }
  document.querySelector(".main").childNodes.forEach(function(el){
    var entry = {}
    if (!el.id) return
    if (!el.dataset.menuText) return

    entry.id = el.id
    entry.h = el.getBoundingClientRect().top + getScroll()

    var li = document.createElement("li")
    var a = document.createElement("a")
    var span = document.createElement("span")
    span.innerHTML = el.dataset.menuText
    a.href="#"+el.id
    a.appendChild(span)
    li.appendChild(a)
    ul.appendChild(li)

    entry.li = li

    scrollHeights.push(entry)

    console.log(entry.id+" "+entry.h+" "+getScroll())
  })
  handleScroll()
})


function recalculateHeights() {
  scrollHeights.forEach(function(entry) {
    entry.h = document.getElementById(entry.id).getBoundingClientRect().top + getScroll()
  })
}
var currentlyActiveElementIndex = null
var res = 2 // reserve in pixels
function handleScroll() {
  var currentHeight = getScroll()
  console.log(currentHeight)
  for (var i=0; i<scrollHeights.length; i++) {
    if (
      (i < scrollHeights.length-1 && currentHeight >= (scrollHeights[i].h)-res && currentHeight < (scrollHeights[i+1].h)-res) ||
      (i == scrollHeights.length-1 && currentHeight >= (scrollHeights[scrollHeights.length-1].h)-res)
    ) {
      if (currentlyActiveElementIndex===i) {
        return
      }

      var li = scrollHeights[i].li
      if (li.className!="product-menu-active") li.className="product-menu-active"
      if (currentlyActiveElementIndex!==null) scrollHeights[currentlyActiveElementIndex].li.className=""
      currentlyActiveElementIndex = i

    }
  }
  console.log(currentlyActiveElementIndex)
}
document.addEventListener("scroll", handleScroll)

window.addEventListener("resize", function(){
  createCarouselIfNecessary()
  recalculateHeights()
})
setInterval(function(){
  if (carousel!==null) {
    carousel.next(1)
  }
}, 2000)
