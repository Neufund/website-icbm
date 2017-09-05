/**
 *
 *  jQuery plugin that handling the smooth 
 *  scrolling for FAQ page
 */

;(function ($) {

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

        // Handling the click event
        $(`${settings.sidebarArea} a`).click(function (e) {
            e.preventDefault();

            $(this).parent().siblings().removeClass('active');
            $(this).parent().addClass('active');

            const dest = $(this).attr("href");
            if (dest === "#") {
                return;
            }
            const target = $(dest);
            console.log(target);
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
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function () {
                let positions = [];
                let sections = {};                
                $.each($(`[data-target="${settings.sidebarArea}"]`).children(), (i, section) => {
                    positions.push($(section).position().top);
                    sections[$(section).position().top] = `#${$(section).attr('id')}`;
                });

                const activeMenue = closest($(window).scrollTop(), positions);
                $(`${settings.sidebarArea} > li`).removeClass('active');                
                $(`a[href="${sections[activeMenue]}"]`).parent('li').addClass('active');
            }, scrollendDelay/5));
        });
    }
}(jQuery));