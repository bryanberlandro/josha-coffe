const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
const hamburgerButton = document.querySelector('#menu');

window.addEventListener('scroll', function(){
    header.classList.toggle('header-active', window.scrollY > 0);
})
// Header Show Up End


// Menu
hamburgerButton.addEventListener('click', function(){
    navbar.classList.toggle('navbar-reveal');
});
// Menu


// Header-End

// Home Reveal 
const homeReveal = document.querySelector('.home-section');
const sliderReveal = document.querySelector('.slider-section');

setTimeout(() => {
    homeReveal.classList.add('home-reveal');
    sliderReveal.classList.add('slider-reveal');
}, 700)


// Slider
let counter = 1;
setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
        counter = 1;
    }
}, 4000);


// Utility Reveal
let utilityOne = document.querySelector('.utility-1');
let utilitySecond = document.querySelector('.utility-2');
let utilityThird = document.querySelector('.utility-3');

setTimeout(function utilityReveal(){
    utilityOne.classList.add('utility-active1');
    utilitySecond.classList.add('utility-active2');
    utilityThird.classList.add('utility-active3');
}, 700);

window.addEventListener('scroll', function(){
    if(this.window.scrollY > 200 ){
        utilityOne.classList.remove('utility-active1');
        utilitySecond.classList.remove('utility-active2');
        utilityThird.classList.remove('utility-active3');
    } else {
        utilityOne.classList.add('utility-active1');
        utilitySecond.classList.add('utility-active2');
        utilityThird.classList.add('utility-active3');   
    }
});
// Utility Reveal



// About Us
let aboutUsImgOne = document.querySelector('.about-us-img-1');
let aboutUsImgSecond = document.querySelector('.about-us-img-2');

window.addEventListener('scroll', function(){
    aboutUsImgOne.classList.toggle('about-us-img-active-1', window.scrollY > 400);
    aboutUsImgSecond.classList.toggle('about-us-img-active-2', window.scrollY > 500);
});
// About Us



// Product
let imgProduct = document.querySelector('.featured-img-1');
let imgProduct2 = document.querySelector('.featured-img-2');
let imgProduct3 = document.querySelector('.featured-img-3');
let featuredProduct = document.querySelector('.featured-card-1');
let featuredProduct2 = document.querySelector('.featured-card-2');
let featuredProduct3 = document.querySelector('.featured-card-3');

window.addEventListener('scroll',  function(){
        imgProduct.classList.toggle('featured-img-active-1', window.scrollY > 1200);
        imgProduct2.classList.toggle('featured-img-active-2', window.scrollY > 1200);
        imgProduct3.classList.toggle('featured-img-active-3', window.scrollY > 1200);
        featuredProduct.classList.toggle('featured-card-active-1', window.scrollY > 1200);
        featuredProduct2.classList.toggle('featured-card-active-2', window.scrollY > 1200);
        featuredProduct3.classList.toggle('featured-card-active-3', window.scrollY > 1200);
});
// Product


// Maps
let mapsImg1 = document.querySelector('.maps-card-1');
let mapsImg2 = document.querySelector('.maps-card-2');
let mapsImg3 = document.querySelector('.maps-card-3');
let mapsImg4 = document.querySelector('.maps-card-4');
let mapsImg5 = document.querySelector('.maps-card-5');


window.addEventListener('scroll', function(){
    mapsImg1.classList.toggle('maps-card-active-1', window.scrollY > 2000);
    mapsImg2.classList.toggle('maps-card-active-2', window.scrollY > 2000);
    mapsImg3.classList.toggle('maps-card-active-3', window.scrollY > 2000);
    mapsImg4.classList.toggle('maps-card-active-4', window.scrollY > 2000);
    mapsImg5.classList.toggle('maps-card-active-5', window.scrollY > 2000);
});

let [cust, satisfy, rate, rates] = [0, 0, 0, 0];
let customers = document.querySelector('#customers');
let satisfication = document.querySelector('#satisfication');
let rating = document.querySelector('#rating');

function glassyCardMethod(){
    function customersMethod(){
        cust < 74 ? cust += 1 : cust;
        customers.innerHTML = `${cust}K +`
    }
    setInterval(()=> {
        customersMethod();
    }, 200)

    function satisficationMethod(){
        satisfy < 89 ? satisfy += 1 : satisfy;
        satisfication.innerHTML = `${satisfy} %`
    }
    setInterval(()=> {
        satisficationMethod();
    }, 300)

    function ratingMethod(){
        rate < 4 ? rate += 1 : rate;
        rates < 84 ? rates += 1 : rates;
        rating.innerHTML = `${rate}.${rates}`
    }
    setInterval(()=> {
        ratingMethod();
    }, 500)
}


document.addEventListener('DOMContentLoaded', init)

function init(){
    let mediaPhone = window.matchMedia("(max-width: 480px)");
    if(mediaPhone.matches){
        window.addEventListener('scroll', function(){
            if(this.window.scrollY > 2600){
                glassyCardMethod();
            }
        })
    } else {
        window.addEventListener('scroll', function(){
            if(this.window.scrollY > 2000){
                glassyCardMethod();
            }
        })
    }
}



// Maps

// Show Up

    

