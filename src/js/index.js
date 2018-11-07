$(document).ready(() => {

// Getting DATA for the Beer Section

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

    class Ingredients {
        constructor (malt, hops, yeast) {
            this.malt = malt;
            this.hops = hops;
            this.yeast = yeast;
        }
        getIngredients() {
            return `<div class="pop-up">
                        <div class="pop-up-header">  
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
                                <li><span>Yeast</span></li>
                                <li>${this.yeast}</li>
                            </ul>
                        </div>
                    </div>`
                    }
                };


// API to get all the beers 

function loadPages(){ // Function to load beer pages when clicking on pagination
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

    for (let i = 0; i < data.length; i++) {
        let beer = new BeerData (data[i].image_url, data[i].name, data[i].description, data[i].abv, data[i].ibu, data[i].ph);
        $('.beers-wrapper').append(beer.getBeerData());   
    }
});

};

// PAGINATION 

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

// PICK A BEER SECTION - RANDOM API

     $.ajax({
        url: 'https://api.punkapi.com/v2/beers/random',
        method: 'GET',

    }).done(function(data) {

    for (let i = 0; i < data.length; i++) {
        let beer = new BeerData (data[i].image_url, data[i].name, data[i].description, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline);
        $('.find-wrapper').append(beer.getRandomBeer());   
    }

})
                    
    // FUNCTION TO RUN AT THE END OF THE FILE

    //   .fail(function(err) {
    //     throw err;
    //   });

    })



