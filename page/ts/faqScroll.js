/**
 *
 *  jQuery plugin that handles the smooth 
 *  scrolling for FAQ page
 * 
 *  This plugin should be written in typescript but due to the 
 *  nature of this plugin it would probably result with :any
 *  everywhere and thats why it's just JS
 * 
 */

// Detect the closest number from array of numbers
function closest(num, arr) {
    let curr = arr[0];
    let diff = Math.abs(num - curr);
    for (let val = 0; val < arr.length; val++) {
        let newdiff = Math.abs(num - arr[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[val];
        }
    }
    return curr;
}


$.fn.faqScroll = function (options) {

    // the options
    const settings = $.extend({
        sidebarArea: '#sidebar',
        offset: 80,
        speed: 500
    }, options);

    if( $(settings.sidebarArea).length == 0)
        return; 
    $(`${settings.sidebarArea} li:first`).addClass('active');
    // Handling the click event
    var isClicked = false;
    $(`${settings.sidebarArea} a`).click(function (e) {
        e.preventDefault();

        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');

        const dest = $(this).attr("href");
        if (dest === "#") {
            return;
        }
        isClicked = true;
        const target = $(dest);
        
        $("html, body").stop().animate(
            {
                scrollTop: target.offset().top - settings.offset,
            },
            settings.speed
        );
    });

    const scrollendDelay = settings.speed; // ms

    // Handling the scroll event
    $(window).scroll(function (e) {
        let positions = [];
        let sections = {};
        $.each($(`[data-target="${settings.sidebarArea}"]`).children(), (i, section) => {
            positions.push($(section).position().top);
            sections[$(section).position().top] = `#${$(section).attr('id')}`;
        });
        const activeMenue = closest($(window).scrollTop(), positions);

        if(!isClicked) {
            $(`a[href="${sections[activeMenue]}"]`).parent('li').siblings('li').removeClass('active');
            $(`a[href="${sections[activeMenue]}"]`).parent('li').addClass('active');
        }
        isClicked = false;
    });
}
