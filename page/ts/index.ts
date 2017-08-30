import "bootstrap-sass/assets/javascripts/bootstrap.js";
import * as $ from "jquery";
import "owl.carousel";
import * as vex from "vex-js";
import * as vexDialog from "vex-dialog";
import scrollbarFix from "./scrollbarFix";
import "!style-loader!css-loader!vex-js/dist/css/vex.css";
import "!style-loader!css-loader!vex-js/dist/css/vex-theme-os.css";

vex.defaultOptions.className = "vex-theme-os";
vex.registerPlugin(vexDialog);

const getPersonModal: any = function(
  name: string,
  image: string,
  preTitle: string,
  title: string,
  bio: string,
  domain: string,
  email: string
) {
  const preTitleMarkup = preTitle == "" ? preTitle : `<span>${preTitle}</span>`;

  let optionalElements = "";
  if (domain !== "") {
    optionalElements += `<a class="link" href="#">${domain}</a>`;
  }

  if (email !== "") {
    optionalElements += `<p class="handle">${email}</p>`;
  }

  return {
    unsafeContent: `
      <div class="row">
        <div class="col-md-3 person-info-container">
          <div class="person-info">
            <img class="rounded-image" src="${image}"/>
          </div>
        </div>
        <div class="col-md-6">
          <div class="person-details">
            <h4 class="name">${name}</h4>
            <div class="title-container">
              ${preTitleMarkup}
              <h4 class="position">${title}</h4>
            </div>
            <div class="bio">${bio}</div>
            ${optionalElements}
          </div>
        </div>
    </div>`,
  };
};

const getParticipateModal: any = function(text: string) {
  return {
    unsafeContent: `
      <div class="row">
        <div class="col-md-12">
          ${text}
        </div>
      </div>`,
  };
};

$(document).ready(function() {
  $(".has-carousel").owlCarousel({
    navigation: true,
    items: 1,
    singleItem: true,
    lazyLoad: true,
    dots: true,
    autoPlay: 3000, //Set AutoPlay to 3 seconds
  });

  const seeMore: string = "+ More";
  const seeLess: string = "- Less";
  $(".person-block a").click(function(e) {
    e.preventDefault();
  });

  $(".person-block").click(function() {
    const name = $(this).find("h4.name a").text().trim();
    const image = $(this).find("img").attr("src").trim();
    const title = $(this).find("h4.position").text().trim();
    const bio = $(this).find(".bio").text().trim();
    const preTitle = $(this).find("span.pre-title").text().trim();
    const domain = $(this).find("a.domain").text().trim();
    const email = $(this).find("p.link").text().trim();

    vex.open(getPersonModal(name, image, preTitle, title, bio, domain, email));
  });

  $(".team .see-more").click(function() {
    $(this).text().trim().toLowerCase() == seeMore.trim().toLowerCase()
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

$(window).scroll(function(e) {
  const scroll: number = $(window).scrollTop();
  const headerSelector: string = ".navbar.navbar-default.navbar-fixed-top";
  if (scroll > 20) {
    if ($(headerSelector).hasClass("navbar-no-border"))
      $(headerSelector).removeClass("navbar-no-border");
  } else {
    if (!$(headerSelector).hasClass("navbar-no-border"))
      $(headerSelector).addClass("navbar-no-border");
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

//Smooth scrolling
$(document).ready(function() {
  $('a[href*="#commit"]').click(function(e) {
    e.preventDefault();
    // the destination id will be taken from the href attribute
    const dest = $(this).attr("href");
    if (dest === "#") {
      return;
    }
    var target = $(dest);
    $("html, body").stop().animate(
      {
        scrollTop: target.offset().top,
      },
      1000
    );
  });

  scrollbarFix();
});
