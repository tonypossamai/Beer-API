$(document).ready(function() {

    $('.beers').on('click', function(){
        var url = 'https://api.punkapi.com/v2/'+$('.beers').val()+'.json';

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(data) {

            for (var i=0; i <= 6; i++) {
            
            let name = data.name;
            let tagline = data.tagline;

      
            $('#title').append(data.results[i].abstract);
            $('.container').append('<a target="_blank" href="'+ articleUrl +'" class="articleContainer"><section><h1 class="articleTitle">' + title + '</h1></section></a>');
            $('.articleContainer').last().css('background-image', 'url('+ imageUrl +')');
        }
      
      }).fail(function(err) {
        throw err;
      });
    })
    });
