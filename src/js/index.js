$(document).ready(function() {

    class getData {
        constructor (image_url, title, description, abv, ibu, ph) {
            this.image_url = image_url;
            this.title = title;
            this.description = description;
            this.abv = abv;
            this.ibu = ibu;
            this.ph = ph;
        }
        beerData() {
            return `div class="box">
                        <img src="${image_url}">
                        <h1>${title}</h1>
                        <p>${description}</p>
                    <div class="info">
                        <ul>
                            <li>ABV</li>
                            <li><span>${abv}</span></li>
                        </ul>
                        <ul>
                            <li>IBU</li>
                            <li><span>${ibu}</span></li>
                        </ul>
                        <ul class="ph">
                            <li>pH</li>
                            <li><span>${ph}</span></li>
                        </ul>
                    </div>
                    </div>`
        }
    }
        $('.page-button').on('click', function(){

        var url = 'https://api.punkapi.com/v2/beers?page='+ $(this).text()+'&per_page=6';
        console.log(url);

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(data) {

            for (let i=0; i <= 6; i++) {
                let beer = new Beer (data[i].name,)
                $('beers-wrapper').append(beer, beerData());
            

            let image = data[i].image_url;
            let title = data[i].title;
            let description = data[i].description;
            let abv = data[i].description;
            let ibu = data.ibu;
            let ph = data.ph;




        }
      }).fail(function(err) {
        throw err;
      });
    })
    });

    /*
       $('.page-button').on('click', function(){

        var url = 'https://api.punkapi.com/v2/beers?page='+$(this).text()+'&per_page=6';
        console.log(url);
        });

    */