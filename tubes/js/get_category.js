$.getJSON("data/category.json", function(result){
    // console.log(result);
    var element = "";
    var count = 1;
    $.each(result, function(i){
        link = `http://localhost/TravelixTemplate/category.html?name=${result[i].name}`;
        if(count == 1) {
            element += `<div class="row intro_items">`;
        }
        element += 
            `<div class="col-lg-4 intro_col">
                <div class="intro_item">
                    <div class="intro_item_overlay"></div>
                    <div class="intro_item_background" style="background-image:url(images/unsplash/indonesia-beach.jpg)"></div>
                    <div class="intro_item_content d-flex flex-column align-items-center justify-content-center">
                        <div class="intro_date">${result[i].totalPlace} destination</div>
                        <div class="button intro_button"><div class="button_bcg"></div><a href="${link}">see more<span></span><span></span><span></span></a></div>
                        <div class="intro_center text-center">
                            <h1>${result[i].name}</h1>
                        </div>
                    </div>
                </div>
            </div>`;
        if(count == 3) {
            element += `</div>`;
        }
        count++;
        if(count == 4) {
            count = 1;
        }
    });

    document.getElementById("category-place").innerHTML += element;
});