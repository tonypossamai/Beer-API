(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(document).ready(function () {

    // Getting DATA for the Beer Section and Quick Find Section

    var BeerData = function () {
        function BeerData(image_url, name, description, abv, ibu, ph, tagline) {
            _classCallCheck(this, BeerData);

            this.image_url = image_url;
            this.name = name;
            this.description = description;
            this.abv = abv;
            this.ibu = ibu;
            this.ph = ph;
            this.tagline = tagline;
        }

        _createClass(BeerData, [{
            key: "getBeerData",
            value: function getBeerData() {
                return "<div class=\"box1\">\n                        <img src=\"" + this.image_url + "\">\n                        <h1>" + this.name + "</h1>\n                        <p>" + this.description + "</p>\n                    <div class=\"info\">\n                        <ul>\n                            <li>ABV</li>\n                            <li><span>" + this.abv + "</span></li>\n                        </ul>\n                        <ul>\n                            <li>IBU</li>\n                            <li><span>" + this.ibu + "</span></li>\n                        </ul>\n                        <ul class=\"ph\">\n                            <li>pH</li>\n                            <li><span>" + this.ph + "</span></li>\n                        </ul>\n                    </div>\n                    </div>";
            }
        }, {
            key: "getRandomBeer",
            value: function getRandomBeer() {
                return "<div class=\"find-wrapper\">\n                        <div class=\"box2\">\n                \n                            <div>\n                                <img src=\"" + this.image_url + "\">\n                            </div>\n                \n                            <div class=\"text\">\n                                <h2>" + this.name + "</h2>\n                                <h3>" + this.tagline + "</h3>\n                                <p>" + this.description + "</p>\n                    \n                                <div class=\"info\">\n                                    <ul>\n                                    <li>ABV</li>\n                                    <li><span>" + this.abv + "</span></li>\n                                    </ul>\n                                    <ul>\n                                    <li>IBU</li>\n                                    <li><span>" + this.ibu + "</span></li>\n                                    </ul>\n                                    <ul class=\"ph\">\n                                    <li>pH</li>\n                                    <li><span>" + this.ph + "</span></li>\n                                    </ul>\n                                </div>\n\n                                <button class=\"ingredients-button\">INGREDIENTS</button>\n                    \n                            </div>  \n                        </div>\n                        <button class=\"give-button\">GIVE ME ANOTHER BEER</button>\n                    </div>";
            }
        }]);

        return BeerData;
    }();

    ;

    // Getting DATA for the ingredients in the Pop-up box

    var Ingredients = function () {
        function Ingredients() {
            _classCallCheck(this, Ingredients);

            this.malt = "";
            this.hops = "";
            this.yeast = "";
        }

        _createClass(Ingredients, [{
            key: "getLastRandomBeerIngredients",
            value: function getLastRandomBeerIngredients(data) {
                var _this = this;

                this.malt = "";
                this.hops = "";
                this.yeast = "";
                data[0].ingredients.malt.forEach(function (malt, key, arr) {
                    _this.malt += malt.name + " (" + malt.amount.value + " " + malt.amount.unit + ")";
                    if (key !== arr.length - 1) {
                        _this.malt += ', ';
                    }
                });
                data[0].ingredients.hops.forEach(function (hop, key, arr) {
                    _this.hops += hop.name + " (" + hop.amount.value + " " + hop.amount.unit + ")";
                    if (key !== arr.length - 1) {
                        _this.hops += ', ';
                    }
                });
                this.yeast = "" + data[0].ingredients.yeast;
            }
        }, {
            key: "getIngredients",
            value: function getIngredients() {
                return "<div class=\"pop-up-header\">  \n                        <h2>INGREDIENTS</h2>\n                        <h2 class=\"closing-button\">X</h2>\n                    </div>\n                    <div class=\"ingredients\">  \n                        <ul class=\"malt\">\n                            <li><span>Malt:</span></li>\n                            <li>" + this.malt + "</li>\n                        </ul>\n                        <ul class=\"hops\">\n                            <li><span>Hops:</span></li>\n                            <li>" + this.hops + "</li>\n                        </ul>\n                        <ul class=\"yeast\">\n                            <li><span>Yeast:</span></li>\n                            <li>" + this.yeast + "</li>\n                        </ul>\n                    </div>";
            }
        }]);

        return Ingredients;
    }();

    // Running the same API from the 'beer-wrapper' to create functions for each button on the nav menu

    $.ajax({
        url: "https://api.punkapi.com/v2/beers?page=1&per_page=6",
        method: 'GET'
    }).done(function (data) {
        var beer = [];
        for (var i = 0; i < data.length; i++) {
            beer = new BeerData(data[i].image_url, data[i].name, data[i].description, data[i].abv, data[i].ibu, data[i].ph);
            $('.beers-wrapper').append(beer.getBeerData());
            $('.find-section').css('display', 'none');
            $('.pick-a-beer').css('display', 'none');
            $('.pop-up').css('display', 'none');
            $('.cover').css('display', 'none');
        }
    }).fail(function (err) {
        throw err;
    });

    // Setting up Nav Menu Buttons 

    $('.beers-button').on('click', function () {
        $('.beers-section').css('display', 'grid');
        $('.find-section').css('display', 'none');
        $('.pick-a-beer').css('display', 'none');
        $('footer').css('display', 'flex');
        $('.pop-up').css('display', 'none');
    });

    $('.find-button').on('click', function () {
        $('.find-section').css('display', 'grid');
        $('.beers-section').css('display', 'none');
        $('.pick-a-beer').css('display', 'none');
        $('footer').css('display', 'none');
        $('.pop-up').css('display', 'none');
    });

    $('.pick-button').on('click', function () {
        $('.pick-a-beer').css('display', 'grid');
        $('.beers-section').css('display', 'none');
        $('.find-section').css('display', 'none');
        $('footer').css('display', 'none');
        $('.pop-up').css('display', 'none');
    });

    $('body').on('click', '.ingredients-button', function () {
        $('.pop-up').css('display', 'grid');
        $('.cover').css('display', 'grid');
        $('.pop-up').append(ingredientsRandomBeer.getIngredients());
    });

    $('body').on('click', '.closing-button', function () {
        $('.pop-up').css('display', 'none');
        $('.cover').css('display', 'none');
        $('.pop-up').empty();
    });
    $('body').on('click', '.logo', function () {
        $('.beers-section').css('display', 'grid');
        $('.find-section').css('display', 'none');
        $('.pick-a-beer').css('display', 'none');
        $('footer').css('display', 'flex');
        $('.pop-up').css('display', 'none');
    });

    // API beer-wrapper to get all the beers 

    function loadPages() {
        // Function to load beer pages when clicking on page numbers

        var url = 'https://api.punkapi.com/v2/beers';
        url += '?' + $.param({
            'page': $('.active').text(),
            'per_page': 6
        });

        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (data) {
            $('.beers-wrapper').empty();
            var beerPages = [];

            for (var i = 0; i < data.length; i++) {
                beerPages = new BeerData(data[i].image_url, data[i].name, data[i].description, data[i].abv, data[i].ibu, data[i].ph);
                $('.beers-wrapper').append(beerPages.getBeerData());
            }
        }).fail(function (err) {
            throw err;
        });
    };

    // Pagination button functions

    $('body').on('click', '.page-button', function () {
        // Click function for page numbers 1 to 6.
        $('.page-button').removeClass('active');
        $(this).addClass("active");
        $('.beers-wrapper').empty();
        loadPages();
    });

    $('body').on('click', '.next', function () {
        // Click function for 'next' page.
        if ($('.active').next().hasClass('page-button')) {
            $('.active').removeClass("active").next().addClass("active");
        }
        $('.beers-wrapper').empty();
        loadPages();
    });

    $('body').on('click', '.previous', function () {
        // Click function for 'previous' page.
        if ($('.active').prev().hasClass('page-number')) {
            $('.active').removeClass('active').prev().addClass('active');
        }
        $('.beers-wrapper').empty();
        loadPages();
    });

    // Function to run random beer API - RANDOM API 

    var ingredientsRandomBeer = new Ingredients();

    $.ajax({
        url: 'https://api.punkapi.com/v2/beers/random',
        method: 'GET'

    }).done(function (data) {
        var beerRandom = [];
        var ingredients = [];

        beerRandom = new BeerData(data[0].image_url, data[0].name, data[0].description, data[0].abv, data[0].ibu, data[0].ph, data[0].tagline);
        ingredientsRandomBeer.getLastRandomBeerIngredients(data);
        $('.find-wrapper').append(beerRandom.getRandomBeer());
    }).fail(function (err) {
        throw err;
    });

    // Function to run when clicking "give me another beer" button - RANDOM API

    $('body').on('click', '.give-button', function () {

        $.ajax({
            url: 'https://api.punkapi.com/v2/beers/random',
            method: 'GET'

        }).done(function (data) {
            $('.find-wrapper').empty();
            var beerRandom = [];
            for (var i = 0; i < data.length; i++) {
                beerRandom = new BeerData(data[i].image_url, data[i].name, data[i].description, data[i].abv, data[i].ibu, data[i].ph, data[i].tagline);
                $('.find-wrapper').append(beerRandom.getRandomBeer());

                ingredientsRandomBeer.getLastRandomBeerIngredients(data);
            }
        }).fail(function (err) {
            // Run at the end of done function data
            throw err;
        });
    });
});

},{}]},{},[1]);
