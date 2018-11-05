$(document).ready(function() {

    $('select').on('change', function(){
        var url = 'https://api.punkapi.com/v2/'+$('select').val()+'.json';
        url += '?' + $.param({
        'api-key': 'https://api.punkapi.com/v2/beers?page=1&per_page=6'
        });

        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(data) {
            $('.container').empty();
    
            for (var i=0; i < 12; i++) {
    
            if (data.results[i].multimedia.length < 4 ) {
                continue;
            }
    
            let title = data.results[i].abstract;
            let articleUrl = data.results[i].url;
            let imageUrl = data.results[i].multimedia[4].url;  
      
            $('#title').append(data.results[i].abstract);
            $('.container').append('<a target="_blank" href="'+ articleUrl +'" class="articleContainer"><section><h1 class="articleTitle">' + title + '</h1></section></a>');
            $('.articleContainer').last().css('background-image', 'url('+ imageUrl +')');
        }
      
      }).fail(function(err) {
        throw err;
      });
    })
    });
