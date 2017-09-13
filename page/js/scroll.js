// scroll reveal
window.sr = ScrollReveal({
  scale: 1,
})
sr.reveal(".text-box")
sr.reveal(".product-r3-row-wrapper div", 200)
sr.reveal(".product-r2-row-wrapper div", 200)
sr.reveal(".img-scroll")

// scroll highlighting

function getScroll() {
  return window.scrollY || document.documentElement.scrollTop
}

var scrollHeigts = []
var ul = document.querySelector("#product-menu ul")
window.addEventListener("load", function() {
  console.log("document load event")
  document.querySelector(".main").childNodes.forEach(function(el){
    var entry = {}
    if (!el.id) return
    if (!el.dataset.menuText) return

    entry.id = el.id
    entry.h = el.getBoundingClientRect().top + getScroll()

    var li = document.createElement("li")
    var a = document.createElement("a")
    a.innerHTML = el.dataset.menuText
    a.href="#"+el.id
    li.appendChild(a)
    ul.appendChild(li)

    entry.li = li

    scrollHeigts.push(entry)

    // console.log(entry.id+" "+entry.h+" "+getScroll())
  })
  handleScroll()
})


function recalculateHeights() {
  scrollHeigts.forEach(function(entry) {
    entry.h = document.getElementById(entry.id).getBoundingClientRect().top + getScroll()
  })
}
var currentlyActiveElementIndex = null
function handleScroll() {
  var currentHeight = getScroll()
  for (var i=0; i<scrollHeigts.length-2; i++) {
    if (currentHeight >= scrollHeigts[i].h && currentHeight < scrollHeigts[i+1].h) {
      if (currentlyActiveElementIndex===i) return

      // console.log(currentHeight+" "+scrollHeigts[i].h+" "+scrollHeigts[i+1].h)

      var li = scrollHeigts[i].li
      if (li.className!="product-menu-active") li.className="product-menu-active"
      if (currentlyActiveElementIndex!==null) scrollHeigts[currentlyActiveElementIndex].li.className=""
      currentlyActiveElementIndex = i

    }
  }
}
document.addEventListener("resize", recalculateHeights)
document.addEventListener("scroll", handleScroll)

// "product-menu-active"
