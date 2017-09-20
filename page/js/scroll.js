// scroll highlighting

function getScroll() {
  return window.scrollY || document.documentElement.scrollTop
}

var scrollHeights = []
function createProductMenu() {
  var ul = document.querySelector("#product-menu ul")
  if (!ul) {
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

  })
  handleScroll()
}

createProductMenu()

window.addEventListener("load", recalculateHeights)


function recalculateHeights() {
  scrollHeights.forEach(function(entry) {
    entry.h = document.getElementById(entry.id).getBoundingClientRect().top + getScroll()
  })
  handleScroll()
}
var currentlyActiveElementIndex = null
var res = 200 // lock offset in pixels
function handleScroll() {
  if (scrollHeights.length===0) {
    return
  }
  var currentHeight = getScroll()
  for (var i=0; i<scrollHeights.length; i++) {
    if (
      (i < scrollHeights.length-1 && currentHeight >= (scrollHeights[i].h)-res && currentHeight < (scrollHeights[i+1].h)-res) ||
      (i == scrollHeights.length-1 && currentHeight >= (scrollHeights[scrollHeights.length-1].h)-res) ||
      (i == 0 && scrollHeights.length>=2 && currentHeight<(scrollHeights[1].h)-res)
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
}
document.addEventListener("scroll", handleScroll)

window.addEventListener("resize", function(){
  createCarouselIfNecessary()
  recalculateHeights()
})

// YT API
var playerFullscreen
var playerRegular
function onYouTubeIframeAPIReady() {
  if (document.getElementById("product-video-fullscreen")===null) return
  playerRegular = new YT.Player("product-yt-iframe", {
    events: {
      onReady: forcePlay
    }
  })
  playerFullscreen = new YT.Player("product-yt-iframe-fullscreen", {})
  document.getElementById("product-header-button").addEventListener("click", function(){
    if(playerRegular) {
      playerRegular.playVideo(); // fallback for iOS, so that button will start playing
    }
    if (playerFullscreen) {
      document.getElementById("product-video-fullscreen").style.display="block"; // normally display: none
      playerFullscreen.playVideo();
    }
  })
  document.getElementById("product-video-fullscreen-close").addEventListener("click", function(){
    playerFullscreen.pauseVideo();
    document.getElementById("product-video-fullscreen").style.display="none";
  })
}
function forcePlay() {
  setTimeout(function(){
    if (playerRegular) playerRegular.playVideo()
  }, 200)
}
