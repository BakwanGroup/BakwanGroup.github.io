$.getJSON("data/data.json", function(result){
    // console.log(result);
    var placeItem = result.places.place;
    var display;
    var count = 0;
    var address, prov;
    $.each(placeItem, function(i){
        if(count > 11) {
            return false;
        }

        display = false;
        if((Math.floor(Math.random() * 30)) == 0) {
            display = true;
            count++;
        }

        if(display == true) {
            address = (typeof placeItem[i].loc.address === 'undefined') ? "Tidak ada informasi terkait alamat" : placeItem[i].loc.address;
            prov = (typeof placeItem[i].loc.prov === 'undefined') ? "Tidak ada" : placeItem[i].loc.prov;
            link = `https://pamudyaputra.github.io/bakwan/tubes/destination-detail.html?destination=${placeItem[i].name}`;
            document.getElementById("random_place").innerHTML +=
                `<div class="col-lg-6 offers_col">
                    <div class="offers_item">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="offers_image_container">
                                    <div class="offers_image_background" style="background-image:url(images/place/${placeItem[i].filename})"></div>
                                    <div class="offer_name"><a href="${link}">${prov}</a></div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="offers_content">
                                    <div class="offers_price">${(placeItem[i].name)}<span></span></div>
                                    <div class="rating_r rating_r_${parseInt(placeItem[i].totalScore, 10)} offers_rating">
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
                                    <div class="offers_link"><a href="${link}">read more</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
    });
});