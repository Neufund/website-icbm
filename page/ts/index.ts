import "!style-loader!css-loader!vex-js/dist/css/vex-theme-os.css";
import "!style-loader!css-loader!vex-js/dist/css/vex.css";
import "bootstrap-sass/assets/javascripts/bootstrap.js";
import * as $ from "jquery";
import "owl.carousel";
import * as vexDialog from "vex-dialog";
import * as vex from "vex-js";
import "./effects.js";
import "./faqScroll";
import { getPersonModal } from "./personModal";
import "./scroll.js";
import scrollbarFix from "./scrollbarFix";

$("body").faqScroll({
  sidebarArea: "#sidebar",
  offset: 80,
  speed: 100,
});

vex.defaultOptions.className = "vex-theme-os";
vex.registerPlugin(vexDialog);

const getParticipateModal: any = (text: string) => {
  return {
    unsafeContent: `
      <div class="row">
        <div class="col-md-12">
          ${text}
        </div>
      </div>`,
  };
};
$(document).ready(() => {
  const seeMore: string = "+ More";
  const seeLess: string = "- Less";

  $(".person-block").click(function() {
    // ehh we should rewrite it later. Lets just bundle these data in js (not html blob).
    const name = $(this).find("h4.name").text().trim();
    const image = $(this).find("img").attr("src").trim();
    const title = $(this).find("h4.position").text().trim();
    const bio = $(this).find(".bio").text().trim();
    const preTitle = $(this).find("span.pre-title").text().trim();
    const rawLinks = $(this).find(".links").text().trim();
    const links = rawLinks ? JSON.parse(rawLinks) : {};
    const email = $(this).find("p.link").text().trim();

    vex.open(getPersonModal(name, image, preTitle, title, bio, links, email));
  });

  $(".team .see-more").click(function() {
    $(this).text().trim().toLowerCase() === seeMore.trim().toLowerCase()
      ? $(this).text(seeLess)
      : $(this).text(seeMore);
    $(".team .is-hidden").fadeToggle("slow", "linear");
  });

  $(".comming-soon").click(function(e) {
    e.preventDefault();
    const text = $(this).text();
    vex.open(getParticipateModal(`<h4>${text}</h4> <p class="slim">Coming soon</p>`));
  });
});

$(".show-answer").click(function(e) {
  e.preventDefault();
  const pTag: any = $(this).siblings(".answer")[0];
  const iconTag: any = $(this).find(".material-icons")[0];

  if ($(pTag).is(":visible")) {
    $(pTag).slideUp();
    $(iconTag).html("keyboard_arrow_down");
  } else {
    $(pTag).slideDown();
    $(iconTag).html("keyboard_arrow_up");
  }
});

$(window).scroll(() => {
  const scroll: number = $(window).scrollTop();
  const headerSelector: string = ".navbar.navbar-default.navbar-fixed-top";
  if (scroll < 20) {
    if ($(headerSelector).hasClass("border")) {
      $(headerSelector).removeClass("border");
    }
  } else {
    if (!$(headerSelector).hasClass("border")) {
      $(headerSelector).addClass("border");
    }
  }
});

function movePlatformButtonToAnotherColumn() {
  if ($(window).width() < 992) {
    $("#platform-btn").detach().appendTo("#platform-second-col");
  } else {
    $("#platform-btn").detach().appendTo("#platform-first-col");
  }
}
$(window).resize(movePlatformButtonToAnotherColumn);
movePlatformButtonToAnotherColumn();

// Smooth scrolling
$(document).ready(() => {
  $('a[href*="#commit"]').click(function(e) {
    e.preventDefault();
    // the destination id will be taken from the href attribute
    const dest = $(this).attr("href");
    if (dest === "#") {
      return;
    }
    const target = $(dest);
    $("html, body").stop().animate(
      {
        scrollTop: target.offset().top,
      },
      1000
    );
  });

  scrollbarFix();
});

$(document).ready(() => {
  $(".has-carousel").owlCarousel({
    navigation: true,
    loop: true,
    items: 1,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
  });
});
