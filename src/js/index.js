$(document).ready(() => {

// Getting DATA for the Beer Section and Quick Find Section

    class BeerData {
        constructor (image_url, name, description, abv, ibu, ph, tagline) {
            this.image_url = image_url;
            this.name = name;
            this.description = description;
            this.abv = abv;
            this.ibu = ibu;
            this.ph = ph;
            this.tagline = tagline;
    }
        getBeerData() {
            return `<div class="box1">
                        <img src="${this.image_url}">
                        <h1>${this.name}</h1>
                        <p>${this.description}</p>
                    <div class="info">
                        <ul>
                            <li>ABV</li>
                            <li><span>${this.abv}</span></li>
                        </ul>
                        <ul>
                            <li>IBU</li>
                            <li><span>${this.ibu}</span></li>
                        </ul>
                        <ul class="ph">
                            <li>pH</li>
                            <li><span>${this.ph}</span></li>
                        </ul>
                    </div>
                    </div>`
        }
        getRandomBeer() {
            return `<div class="find-wrapper">
                        <div class="box2">
                
                            <div>
                                <img src="${this.image_url}">
                            </div>
                
                            <div class="text">
                                <h2>${this.name}</h2>
                                <h3>${this.tagline}</h3>
                                <p>${this.description}</p>
                    
                                <div class="info">
                                    <ul>
                                    <li>ABV</li>
                                    <li><span>${this.abv}</span></li>
                                    </ul>
                                    <ul>
                                    <li>IBU</li>
                                    <li><span>${this.ibu}</span></li>
                                    </ul>
                                    <ul class="ph">
                                    <li>pH</li>
                                    <li><span>${this.ph}</span></li>
                                    </ul>
                                </div>

                                <button class="ingredients-button">INGREDIENTS</button>
                    
                            </div>  
                        </div>
                        <button class="give-button">GIVE ME ANOTHER BEER</button>
                    </div>`
        }
    };

// Getting DATA for the ingredients in the Pop-up box

    class Ingredients {
        constructor () {
            this.malt = "";
            this.hops = "";
            this.yeast = "";
        }
        getLastRandomBeerIngredients(data){
            this.malt = "";
            this.hops = "";
            this.yeast = "";
            data[0].ingredients.malt.forEach((malt, key, arr) => {
            this.malt += `${malt.name} (${malt.amount.value} ${malt.amount.unit})`;
                if(key !== arr.length - 1) {
                    this.malt += ', ';
                } 
            });
            data[0].ingredients.hops.forEach((hop, key, arr) => {
            this.hops += `${hop.name} (${hop.amount.value} ${hop.amount.unit})`;
                if(key !== arr.length - 1) {
                    this.hops += ', ';
                } 
            });
            this.yeast = `${data[0].ingredients.yeast}`;
        }
        getIngredients() {
            return `<div class="pop-up-header">  
                        <h2>INGREDIENTS</h2>
                        <h2 class="closing-button">X</h2>
                    </div>
                    <div class="ingredients">  
                        <ul class="malt">
                            <li><span>Malt:</span></li>
                            <li>${this.malt}</li>
                        </ul>
                        <ul class="hops">
                            <li><span>Hops:</span></li>
                            <li>${this.hops}</li>
                        </ul>
                        <ul class="yeast">
                            <li><span>Yeast:</span></li>
                            <li>${this.yeast}</li>
                        </ul>
                    </div>`
        }
    }

// Running the same API from the 'beer-wrapper' to create functions for each button on the nav menu

    $.ajax({
        url: "https://api.punkapi.com/v2/beers?page=1&per_page=6",
        method: 'GET',
    }).done(function(data) {
        let beer = []
        for (let i = 0; i < data.length; i++) {
            beer = new BeerData (data[i].image_url, data[i].name, data[i].description, data[i].abv, data[i].ibu, data[i].ph);
            $('.beers-wrapper').append(beer.getBeerData()); 
            $('.find-section').css('display', 'none');   
            $('.pick-a-beer').css('display', 'none');
            $('.pop-up').css('display', 'none');   
            $('.cover').css('display', 'none');
        }
    }).fail(function(err) {
        throw err;
      });

// Setting up Nav Menu Buttons 

    $('.beers-button').on('click', function() {
        $('.beers-section').css('display', 'grid');
        $('.find-section').css('display', 'none');
        $('.pick-a-beer').css('display', 'none');
        $('footer').css('display','flex');
        $('.pop-up').css('display', 'none'); 
    })

    $('.find-button').on('click', function() {
        $('.find-section').css('display', 'grid');
        $('.beers-section').css('display', 'none');
        $('.pick-a-beer').css('display', 'none');
        $('footer').css('display','none');
        $('.pop-up').css('display', 'none'); 
    })

    $('.pick-button').on('click', function() {
        $('.pick-a-beer').css('display', 'grid');
        $('.beers-section').css('display', 'none');
        $('.find-section').css('display', 'none');
        $('footer').css('display','none');
        $('.pop-up').css('display', 'none'); 
    })  

    $('body').on('click', '.ingredients-button', function() {
        $('.pop-up').css('display', 'grid');     
        $('.cover').css('display', 'grid'); 
        $('.pop-up').append(ingredientsRandomBeer.getIngredients());
    })

    $('body').on('click', '.closing-button', function() { 
        $('.pop-up').css('display', 'none');   
        $('.cover').css('display', 'none');  
        $('.pop-up').empty();
    })
    $('body').on('click', '.logo', function() { 
        $('.beers-section').css('display', 'grid');
        $('.find-section').css('display', 'none');
        $('.pick-a-beer').css('display', 'none');
        $('footer').css('display','flex');
        $('.pop-up').css('display', 'none'); 
    })

// API beer-wrapper to get all the beers 

function loadPages(){ // Function to load beer pages when clicking on page numbers

    var url = 'https://api.punkapi.com/v2/beers'
    url += '?' + $.param({
       'page': $('.active').text(),
       'per_page' : 6
    });

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(data) {
        $('.beers-wrapper').empty();
        let beerPages = []
  
        for (let i = 0; i < data.length; i++) {
            beerPages = new BeerData (data[i].image_url, data[i].name, data[i].description, data[i].abv, data[i].ibu, data[i].ph);
            $('.beers-wrapper').append(beerPages.getBeerData()); 
        }
    }).fail(function(err) {
        throw err;
    });
};

// Pagination button functions

    $('body').on('click', '.page-button', function(){ // Click function for page numbers 1 to 6.
        $('.page-button').removeClass('active');
        $(this).addClass("active");
        $('.beers-wrapper').empty();
        loadPages();
    })
    
    $('body').on('click', '.next', function(){ // Click function for 'next' page.
        if($('.active').next().hasClass('page-button')){
        $('.active').removeClass("active").next().addClass("active");}
        $('.beers-wrapper').empty();
        loadPages();
    })
    
    $('body').on('click', '.previous', function(){ // Click function for 'previous' page.
        if($('.active').prev().hasClass('page-number')){
        $('.active').removeClass('active').prev().addClass('active');}
        $('.beers-wrapper').empty();
        loadPages();
    })

// Function to run random beer API - RANDOM API 
    
    let ingredientsRandomBeer = new Ingredients()

    $.ajax({
        url: 'https://api.punkapi.com/v2/beers/random',
        method: 'GET',

    }).done(function(data) {
        let beerRandom = []
        let ingredients = []

        beerRandom = new BeerData (data[0].image_url, data[0].name, data[0].description, data[0].abv, data[0].ibu, data[0].ph, data[0].tagline);
        ingredientsRandomBeer.getLastRandomBeerIngredients(data);
        $('.find-wrapper').append(beerRandom.getRandomBeer());             
    }).fail(function(err) {
        throw err;
    });

// Function to run when clicking "give me another beer" button - RANDOM API

    $('body').on('click', '.give-button', function(){

        $.ajax({
        url: 'https://api.punkapi.com/v2/beers/random',
        method: 'GET',

        }).done(function(data) {
            $('.find-wrapper').empty();
            let beerRandom = []
            for (let i = 0; i < data.length; i++) {
                beerRandom = new BeerData (data[i].image_url, data[i].name, data[i].description, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline);
                $('.find-wrapper').append(beerRandom.getRandomBeer());   

                ingredientsRandomBeer.getLastRandomBeerIngredients(data);   
            }
        }).fail(function(err) { // Run at the end of done function data
            throw err;
        });
    })
})



