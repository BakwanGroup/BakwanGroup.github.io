const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const destination = urlParams.get('destination');
var maps = "";

$.getJSON("data/data.json", function(result){
    var placeItem = result.places.place;
    var ratingTxt, reviewCount;

    for (var i=0; i<placeItem.length; i++){
        if (placeItem[i].name == destination){
            map = placeItem[i].loc.url.split('/');
            maps = map[5];
            $("#dest_gmap").attr("src",`https://maps.google.com/maps?width=100%&height=100%&hl=en&q=${maps}&t=&z=14&ie=UTF8&iwloc=B&output=embed`);
            document.title = placeItem[i].name + " || Bakwan";
            $("#destination_title").html(`${placeItem[i].name}`);
            $("#destination_rating").html(`
                                <div class="rating_r rating_r_${parseInt(placeItem[i].totalScore, 10)} hotel_rating">
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                </div>`);
            $("#destination_address").html(`${placeItem[i].loc.address}`);
            $("a[id='destination_urladdress'][href='#']").attr('href', `${placeItem[i].loc.url}`);
            $("#destination_image").attr("src",`images/place/${placeItem[i].filename}`);
            $("#dest_web").attr("href",`http://${placeItem[i].website}`);
            $("#dest_rating").html(`${placeItem[i].totalScore}`);
            if(placeItem[i].totalScore > 4) ratingTxt = "Best";
            else if(placeItem[i].totalScore > 3) ratingTxt = "Very Good";
            else ratingTxt = "Good"
            $("#dest_rating_stat").html(`${ratingTxt}`);

            reviewCount = placeItem[i].reviewDistribution.oneStar + placeItem[i].reviewDistribution.twoStar +
                        placeItem[i].reviewDistribution.threeStar + placeItem[i].reviewDistribution.fourStar +
                        placeItem[i].reviewDistribution.fiveStar;
            $("#dest_review").html(`${reviewCount} reviews`);
        }
    }
});