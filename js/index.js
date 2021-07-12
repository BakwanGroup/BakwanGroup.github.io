$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    $('#search').keyup(function(){
        $('#resultlist').html('');
        var searchField = $('#search').val();
        var expression = new RegExp(searchField, "i");

        $.getJSON('data/data.json', function(data) {
        var data = data.places.place;
        $.each(data, function(key, value){
            if (value.name.search(expression) != -1){
            $('#resultlist').append(`
                <option value="`+ value.name +`">`+ value.name +`</option>`);
            }
        });   
        });
    });

    $('#resultlist').on('change', function() {
        let selected = $("#resultlist option:selected").val().replace(/[^a-zA-Z ]/g, "");
        $('#search').val(selected);
    });
});