import * as $ from "jquery";

function getScrollbarWidth() {
  const scrollDiv = $(
    '<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; left: -99999px;"></div>'
  );
  $("body").append(scrollDiv);
  const scrollbarWidth = scrollDiv[0].offsetWidth - scrollDiv[0].clientWidth;
  scrollDiv.remove();
  return scrollbarWidth;
}

// this fixes flickering while opening vex popups
export default function scrollbarFix() {
  const scrollWidth = getScrollbarWidth();
  $("body").append(
    `<style>
            html body.vex-open { padding-right: ${scrollWidth}px; }
            html body.vex-open .navbar.navbar-default.navbar-fixed-top { padding-right: ${scrollWidth}px; }
          </style>`
  );
}
