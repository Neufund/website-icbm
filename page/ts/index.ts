import * as $ from 'jquery';
import 'owl.carousel';

$(document).ready(function(){    
    
    $('.has-carousel').owlCarousel(
        {   navigation: true, 
            items: 1,
            singleItem: true,
            lazyLoad: true,
            dots: true,
            autoPlay: 3000, //Set AutoPlay to 3 seconds
        }

    );

    const seeMore: string = "+ More";
    const seeLess: string = "- Less"; 
    
    $('.team .see-more').click(function(){        
        $(this).text().trim().toLowerCase() == seeMore.trim().toLowerCase() ? $(this).text(seeLess) : $(this).text(seeMore);
        $('.team .person-info-container.is-hidden').fadeToggle("slow","linear");        
    });
});