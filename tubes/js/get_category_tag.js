$.getJSON("data/category.json", function(result){
    // console.log(result);
    var element = "";
    $.each(result, function(i){
        element += 
            `<li class="tag_item"><a href="http://localhost/TravelixTemplate/category.html?name=${result[i].name}">${result[i].name.toLowerCase()}</a></li>`;
    });

    document.getElementById("category-tag").innerHTML += element;
});