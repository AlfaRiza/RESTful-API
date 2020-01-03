function Search(){
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '67509197',
            's': $('#search-input').val()
        },
        success: function(data){
            if(data.Response == "True"){
                $('#movie-list').html('');
                let movies = data.Search;

                $.each(movies, function(i, data){
                    $('#movie-list').append(`<div class="col-sm-4"><div class="card">
                    <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">`+ data.Title +`</h5>
                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                    <p class="card-text"></p>
                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal"data-id=`+ data.imdbID +`>See Detail</a>
                    </div>
                </div></div>`)
                })
                $('#search-input').val('');
            }else{
                $('#movie-list').html(`<div class="col">
                <h1 class="text-center">`+ data.Error +`</h1>
                </div>`)
            }
        }
    });
}

$('#search-button').on('click',function(){
    Search();
});
$('#search-input').on('keyup', function(e){
    if(e.keyCode === 13){
        Search();
    }
});

$('#movie-list').on('click', '.see-detail', function(){
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '67509197',
            'i': $(this).data('id')
        },
        success: function(movie){
            if(movie.Response == "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-4">
                                <img src="`+movie.Poster+`" class="img-fluid">
                            </div>
                            <div class="col-sm-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                    <li class="list-group-item"><h6>Released : `+ movie.Released +`</h6></li>
                                    <li class="list-group-item"><h6>Duration : `+ movie.Runtime +`</h6></li>
                                    <li class="list-group-item"><h6>Genre : `+ movie.Genre +`</h6></li>
                                    <li class="list-group-item"><h6>Director : `+ movie.Director +`</h6></li>
                                    <li class="list-group-item"><h6>Writer : `+ movie.Writer +`</h6></li>
                                    <li class="list-group-item"><h6>Actor : `+ movie.Actors +`</h6></li>
                                    <li class="list-group-item"><h6>Sinopsis : `+ movie.Plot +`</h6></li>
                                    <li class="list-group-item"><h6>Rating : `+ movie.imdbRating +`</h6></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});