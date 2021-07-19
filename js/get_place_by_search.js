const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const destination = urlParams.get('search');
var element = "";
var datatosort = [];

console.log(destination);
document.title = `Search: ${destination} || Bakwan`;

var expression = new RegExp(destination, "i");

$.getJSON('data/data.json', function(data) {
    var data = data.places.place;
    $.each(data, function(key, value){
        if(destination != null) {
            if (value.name.search(expression) != -1){
                datatosort.push(value);
                address = (typeof value.loc.address === 'undefined') ? "Tidak ada informasi terkait alamat" : value.loc.address;
                prov = (typeof value.loc.prov === 'undefined') ? "Tidak ada" : value.loc.prov;
                link = `https://bakwangroup.github.io/destination-detail.html?destination=${value.name}`;
                if(typeof value.reviewDistribution.oneStar === 'undefined') {
                    reviewCount = 0;
                } else {
                    reviewCount = value.reviewDistribution.oneStar + value.reviewDistribution.twoStar +
                                value.reviewDistribution.threeStar + value.reviewDistribution.fourStar +
                                value.reviewDistribution.fiveStar;
                }
                if(value.totalScore > 4) ratingTxt = "Best";
                else if(value.totalScore > 3) ratingTxt = "Very Good";
                else ratingTxt = "Good";
                element +=
                        `<div class="offers_item rating_4">
                            <div class="row">
                                <div class="col-lg-1 temp_col"></div>
                                <div class="col-lg-3 col-1680-4">
                                    <div class="offers_image_container">
                                        <div class="offers_image_background" style="background-image:url(images/place/${value.filename})"></div>
                                        <div class="offer_name"><a href="${link}">${prov}</a></div>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="offers_content">
                                        <div class="offers_price">${(value.name).substr(0,30)}</div>
                                        <div class="rating_r rating_r_${parseInt(value.totalScore, 10)} offers_rating" data-rating="${parseInt(value.totalScore, 10)}">
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
                                            <div class="offer_reviews_rating text-center">${(value.totalScore == 0) ? '-' : value.totalScore}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            }
        } else {
            datatosort.push(value);
            address = (typeof value.loc.address === 'undefined') ? "Tidak ada informasi terkait alamat" : value.loc.address;
            prov = (typeof value.loc.prov === 'undefined') ? "Tidak ada" : value.loc.prov;
            link = `https://bakwangroup.github.io/destination-detail.html?destination=${value.name}`;
            if(typeof value.reviewDistribution.oneStar === 'undefined') {
                reviewCount = 0;
            } else {
                reviewCount = value.reviewDistribution.oneStar + value.reviewDistribution.twoStar +
                            value.reviewDistribution.threeStar + value.reviewDistribution.fourStar +
                            value.reviewDistribution.fiveStar;
            }
            if(value.totalScore > 4) ratingTxt = "Best";
            else if(value.totalScore > 3) ratingTxt = "Very Good";
            else ratingTxt = "Good";
            element +=
                    `<div class="offers_item rating_4">
                        <div class="row">
                            <div class="col-lg-1 temp_col"></div>
                            <div class="col-lg-3 col-1680-4">
                                <div class="offers_image_container">
                                    <div class="offers_image_background" style="background-image:url(images/place/${value.filename})"></div>
                                    <div class="offer_name"><a href="${link}">${prov}</a></div>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="offers_content">
                                    <div class="offers_price">${(value.name).substr(0,30)}</div>
                                    <div class="rating_r rating_r_${parseInt(value.totalScore, 10)} offers_rating" data-rating="${parseInt(value.totalScore, 10)}">
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
                                        <div class="offer_reviews_rating text-center">${(value.totalScore == 0) ? '-' : value.totalScore}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    });

    $('#destination_list').html(`${element}`);
});