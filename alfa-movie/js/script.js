$('#search-button').on('click',function(){
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
                let movies = data.Search;
            }else{
                $('#movie-list').html(`<div class="col">
                <h1 class="text-center">`+ data.Error +`</h1>
                </div>`)
            }
        }
    });
})