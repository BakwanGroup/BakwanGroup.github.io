const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('name');
var element = "";
var datatosort = [];

document.title = `${category} || Bakwan`;
$('#home_title_dest').html(`${category}`);

$.getJSON("data/data.json", function(result){
    var placeItem = result.places.place;
    var display;
    $.each(placeItem, function(i){
        display = false;
        placeCat = placeItem[i].category;
        if(Array.isArray(placeCat) == true)
            for(let j = 0; j < placeCat.length; j++) {
                if(placeCat[j] == category) display = true;
            }
        else
            if(placeCat == category) display = true;

        if(display == true) {
            datatosort.push(placeItem[i]);
            address = (typeof placeItem[i].loc.address === 'undefined') ? "Tidak ada informasi terkait alamat" : placeItem[i].loc.address;
            prov = (typeof placeItem[i].loc.prov === 'undefined') ? "Tidak ada" : placeItem[i].loc.prov;
            link = `https://bakwangroup.github.io/destination-detail.html?destination=${placeItem[i].name}`;
            if(typeof placeItem[i].reviewDistribution.oneStar === 'undefined') {
                reviewCount = 0;
            } else {
                reviewCount = placeItem[i].reviewDistribution.oneStar + placeItem[i].reviewDistribution.twoStar +
							placeItem[i].reviewDistribution.threeStar + placeItem[i].reviewDistribution.fourStar +
							placeItem[i].reviewDistribution.fiveStar;
            }
            if(placeItem[i].totalScore > 4) ratingTxt = "Best";
            else if(placeItem[i].totalScore > 3) ratingTxt = "Very Good";
            else ratingTxt = "Good";
            element +=
                    `<div class="offers_item rating_4">
                        <div class="row">
                            <div class="col-lg-1 temp_col"></div>
                            <div class="col-lg-3 col-1680-4">
                                <div class="offers_image_container">
                                    <div class="offers_image_background" style="background-image:url(images/place/${placeItem[i].filename})"></div>
                                    <div class="offer_name"><a href="${link}">${prov}</a></div>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="offers_content">
                                    <div class="offers_price">${(placeItem[i].name).substr(0,30)}</div>
                                    <div class="rating_r rating_r_${parseInt(placeItem[i].totalScore, 10)} offers_rating" data-rating="${parseInt(placeItem[i].totalScore, 10)}">
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                    </div>
                                    <p class="offers_text">
                                        ${address}
                                    </p>
                                    <div class="offers_icons">
                                        <ul class="offers_icons_list">
                                            <li class="offers_icons_item"><img src="images/post.png" alt=""></li>
                                            <li class="offers_icons_item"><img src="images/compass.png" alt=""></li>
                                            <li class="offers_icons_item"><img src="images/bicycle.png" alt=""></li>
                                            <li class="offers_icons_item"><img src="images/sailboat.png" alt=""></li>
                                        </ul>
                                    </div>
                                    <div class="button book_button"><a href="${link}">read more<span></span><span></span><span></span></a></div>
                                    <div class="offer_reviews">
                                        <div class="offer_reviews_content">
                                            <div class="offer_reviews_title">${ratingTxt}</div>
                                            <div class="offer_reviews_subtitle">${(reviewCount == 0) ? '-' : reviewCount} reviews</div>
                                        </div>
                                        <div class="offer_reviews_rating text-center">${(placeItem[i].totalScore == 0) ? '-' : placeItem[i].totalScore}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    });

    $('#destination_list').html(`${element}`);
});