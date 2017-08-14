const $ = require('jquery');
import 'owl.carousel';

$(document).ready(function(){
    // $('.has-carousel').show();
    $('.has-carousel').owlCarousel(
        {   navigation: true, 
            items: 1,
            singleItem: true,
            lazyLoad: true,
            dots: true,
            autoPlay: 3000, //Set AutoPlay to 3 seconds
        }

    );
});