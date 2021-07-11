$.getJSON("data/data.json", function(result){
    // console.log(result);
    var placeItem = result.places.place;
    var display;
    $.each(placeItem, function(i){
        display = false;
        if(placeItem[i].totalScore == 5) {
            display = true;
        }

        if(display == true) {
            document.getElementById("best-rated-place").innerHTML +=
                `<div class="col-lg-3 col-sm-6">
                    <div class="trending_item clearfix">
                        <div class="trending_image"><img width="82px" height="76px" src="images/place/${placeItem[i].filename}" alt=""></div>
                        <div class="trending_content">
                            <div class="trending_title"><a href="#">${placeItem[i].name}</a></div>
                            <div class="trending_price">${placeItem[i].loc.kabkot}</div>
                            <div class="trending_location">${placeItem[i].loc.prov}</div>
                            <div class="rating rating_${parseInt(placeItem[i].totalScore, 10)}">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
    });
});