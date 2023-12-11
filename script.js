const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
const hamburgerButton = document.querySelector('#menu');

window.addEventListener('scroll', function(){
    header.classList.toggle('header-active', window.scrollY > 0);
})
// Header Show Up End

// Search Features 
const searchIcon = document.querySelector('.search-icon');
const searchWrapper = document.querySelector('.search-wrapper');
const searchInput = document.getElementById('search-input')
const menuListDropDown = document.querySelector('.menu-list-dropdown');
const bgDark = document.querySelector('.bg-dark')
const modalContainer = document.querySelector('.modal-container');
let modalWrapper = document.querySelector('.modal-wrapper');
let modalDesc = document.querySelector('.modal-desc');
const menuDropdown = document.querySelectorAll('.menu-dropdown')
const cartIcon = document.querySelector('.cart-icon');
const sidebarCart = document.querySelector('.sidebar-cart');

cartIcon.addEventListener('click', () => {
    sidebarCart.classList.toggle('active')
})


searchIcon.addEventListener('click', function(){
    searchWrapper.classList.toggle('search-active')
    if(menuListDropDown.classList.contains('active')){
        menuListDropDown.classList.remove('active');
    }
    if(bgDark.classList.contains('active')){
        bgDark.classList.remove('active');
    }
    searchInput.value = '';
})

searchInput.addEventListener('click', ()=> {
    menuListDropDown.classList.add('active');
    bgDark.classList.add('active');
    sidebarCart.classList.remove('active')
})


const productData = [
    {
        id: 1,
        name: 'Caramel Macchiato',
        desc: 'Character of espresso with the comforting embrace of steamed milk and the delectable sweetness of caramel',
        image: 'img/Coffee_Cup_Mockup_3.png',
        price: 24000
    },
    {
        id: 2,
        name: 'Matcha Latte',
        desc: 'This vibrant green powder is then blended with steamed milk, creating a captivating fusion of earthy and creamy notes.',
        image: './img/iced-matcha-green-tea-latte.png',
        price: 22000
    },
    {
        id: 3,
        name: 'Spaghetti Bolognese',
        desc: 'Spaghetti Bolognese is a classic Italian pasta dish celebrated for its rich and flavorful meat sauce, and be spaghetti noodles.',
        image: 'img/spaghetti bolognese.webp',
        price: 32000
    }
]

let dataList = [];

function rupiah(number){
    return new Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(number)
}

productData.forEach((value, key) => {
    updateProduct(value, key)
})

function updateProduct(product, key){
    menuListDropDown.innerHTML += productCard(product, key)
}

function productCard(product, key){
    return `<div class="menu-dropdown" onclick="showModal(${key})">
                <div class="menu-img-dropdown">
                    <img src="${product.image}" alt="">
                </div>
                <div class="menu-desc-dropdown">
                    <h1>${product.name}</h1>
                    <p>${rupiah(`${product.price}`)}</p>
                </div>
            </div>`
}

const search = () => {
    const menuDropdown = document.querySelectorAll('.menu-dropdown')
    const inputValue = searchInput.value.toUpperCase()
    const titleProduct = menuListDropDown.getElementsByTagName('h1')
    
    for(let i = 0; i < titleProduct.length; i++){
        let productIndex = menuDropdown[i].getElementsByTagName('h1')[0]

        if(productIndex){
            let matchValue = productIndex.innerHTML || productIndex.innerText

            if(matchValue.toUpperCase().indexOf(inputValue) > - 1){
                menuDropdown[i].style.display = 'flex'
            } else {
                menuDropdown[i].style.display = 'none'
            }
        }
    }
}

function showModal(key){
    if(dataList[key] == null){
        dataList[key] = productData[key]
    }
    updateModal()
    setTimeout(()=> {
        delete dataList[key]
    }, 0)
     menuListDropDown.classList.remove('active');
     bgDark.classList.remove('active');

}

function updateModal(){
    const modalContainer = document.querySelector('.modal-container');
    let modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.innerHTML = ""
    modalContainer.style.display = 'flex'
    dataList.forEach((value, key) => {
        if(value != null){
            modalWrapper.innerHTML = modalCard(value, key)
        }
    })
}

function modalCard(value, key){
    return `<div class="modal-card">
                <div class="close-modal" onclick="closeModal(${key})">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="modal-img">
                    <img src="${value.image}" alt="">
                </div>
                <div class="modal-desc-wrapper">
                    <div class="modal-desc">
                        <h1>${value.name}</h1>
                        <p>${value.desc}</p>
                    </div>
                    <div class="modal-extra">
                        <p>${rupiah(`${value.price}`)}</p>
                        <button class="modal-btn" onclick="addCart(${key})">
                            <i class="fa-solid fa-cart-shopping" style="color: white;"></i>
                            add to cart
                        </button>
                    </div>
                </div>
            </div>`
}

function closeModal(key){
    modalContainer.style.display = 'none';
}

const cartData = [];

function addCart(key){
    if(cartData[key] == null){
        cartData[key] = JSON.parse(JSON.stringify(productData[key]));
        cartData[key].quantity = 1
    }
    modalContainer.style.display = 'none'
    updateCart()
    delete dataList[key]
    sidebarCart.classList.add('active')
    searchInput.value = '';
}

function updateCart(){
    let cartList = document.querySelector('.cart-list')
    let totalPriceCart =document.querySelector('.total-price')
    let quantityCart = document.querySelector('.quantity-cart')
    cartList.innerHTML = ""
    let count = 0
    let totalPrice = 0

    cartData.forEach((value, key) => {
        totalPrice = totalPrice + value.price
        count = count + value.quantity

        if(value != null){
            cartList.innerHTML += productCart(value, key)
        }
    })
    totalPriceCart.innerHTML = rupiah(totalPrice)
    quantityCart.innerText = count
}

function productCart(value, key){
    return `
        <div class="cart-product">
            <div class="cart-img">
                <img src="${value.image}"/>
            </div>
            <div class="cart-desc">
                <div>
                    <h1>${value.name}</h1>
                    <p>${rupiah(`${value.price}`)}</p>
                </div>
                <div class="quantity-product">
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})"> - </button>
                        <div>${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})"> + </button>
                </div>
            </div>
        </div>
    `
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete cartData[key];
    } else {
        cartData[key].quantity = quantity
        cartData[key].price = quantity * productData[key].price
    }
    updateCart()
}

function checkout(key, quantity){
    if(quantity >= 1){
        delete cartData[key]      
    }
   updateCart()
}



// Search Features End


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

    

