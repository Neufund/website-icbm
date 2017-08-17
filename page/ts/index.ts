import * as $ from 'jquery';
import 'owl.carousel';
import * as vex from 'vex-js';
import * as vexDialog from 'vex-dialog';
import "!style-loader!css-loader!vex-js/dist/css/vex.css";
import "!style-loader!css-loader!vex-js/dist/css/vex-theme-os.css";

vex.defaultOptions.className = 'vex-theme-os'
vex.registerPlugin(vexDialog)

const getPersonModal: any = function(name: string, image: string, preTitle:string, title: string, bio:string){
    return {
        input: [
            '<a href="#" class="close-modal"></a>',
            '<div class="row">',
                '<div class="col-md-3 person-info-container">',
                    '<div class="person-info">',
                        `<img class="rounded-image" src="${image}"/>`,
                    '</div>',
                '</div>',
                '<div class="col-md-6">',
                    '<div class="person-details">',
                        `<h4 class="name">${name}</h4>`,
                        `<div class="title-container">`,
                            `<span>${preTitle}</span>`,
                            `<h4 class="title">${title}</h4>`,
                        `</div>`,
                        `<p class="bio">${bio}</p>`,
                        `<a class="link" href="#">domainname.com</a>`,
                        `<p class="handle">@testingdata</p>`,
                    '</div>',
                '</div>',
            '</div>'  
        ].join('')
    }    
}

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
    $('[id^=team_member_], [id^=advisor_]').click(function(){        
        console.log("Hey")
        const name: string = $(this).find('h4.name a').text();
        const image: string = $(this).find('img').attr('src');    
        const title: string = $(this).find('h4.title').text();;
        const bio: string = $(this).find('p.bio').text();    
        const preTitle: string = $(this).find('span.pre-title').text();

        vex.dialog.open(getPersonModal(name, image, preTitle, title, bio))
    });
    $('.team .see-more').click(function(){        
        $(this).text().trim().toLowerCase() == seeMore.trim().toLowerCase() ? $(this).text(seeLess) : $(this).text(seeMore);
        $('.team .is-hidden').fadeToggle("slow","linear");        
    });
});