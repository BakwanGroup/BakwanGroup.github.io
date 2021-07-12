$.getJSON("data/category.json", function(result){
    // console.log(result);
    var element = "";
    $.each(result, function(i){
        element += 
            `<li class="tag_item"><a href="https://pamudyaputra.github.io/bakwan/tubes/category.html?name=${result[i].name}">${result[i].name.toLowerCase()}</a></li>`;
    });

    document.getElementById("category-tag").innerHTML += element;
});