
jQuery(document).ready(function($) {


// ------------------------------------------------------------------------
// Function to find distance in km between 2 sets of longitude & latitude
// ------------------------------------------------------------------------
function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}


// ------------------------------------------------------------------------
// Add comma to thousand numbers
// ------------------------------------------------------------------------
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// ------------------------------------------------------------------------
// Get user's location and calculate distance from each theme park
// ------------------------------------------------------------------------
$.get("https://ipinfo.io/json", function (response) {
    var userLocOrig = response.loc;
    var userLoc = userLocOrig.split(',');

    //var userCity = "Kuala Lumpur";
    var userCity = response.city;

    // Theme Park Locations
    var parkLocs = [
    "3.142273,101.710610", // Berjaya Times Square Theme Park
    "3.157986,101.613771", // KidZania
    "1.426874,103.629742", // Legoland
    "3.069539,101.607285", // Sunway Lagoon
    "2.191799,102.250368", // A'Famosa
    "4.619781,101.146741", // Lost World of Tambun
    "3.707777,103.051480", // Bukit Gambang Resort City
    "5.457317,100.213573", // Escape Adventureplay
    "1.417110,103.656988", // Puteri Harbour Family Theme Park
    "1.462920,103.763344", // Angry Birds Activity Park
    "3.401046,101.782725"  // Genting
    ];

    // Loop through theme park location array
    var numOfParks = parkLocs.length;
    for (var i = 0; i < numOfParks; i++) {

        // Find distance between user and each theme park
        var parkLoc = parkLocs[i].split(',');
        var tpUgly = Math.round(distance(userLoc[0],userLoc[1],parkLoc[0],parkLoc[1]));
        var tp = numberWithCommas(tpUgly);
        $('.tp'+[i+1]).attr('data-dist', tpUgly);
        $('.dist'+[i+1]).text(tp);

        // Add Google Maps directions for each park
        var gmAPI = "AIzaSyBa-9gXhxW7MWRvr8YHMGncOUiFAbU5J6A";
        $('.tp-info:nth-child('+[i+1]+') iframe').attr("src", "https://www.google.com/maps/embed/v1/directions?origin="+userLocOrig+"&destination="+parkLocs[i]+"&key="+gmAPI);

        // Display user's distance from theme park in directions tab
        $('.park-info-popups > div:nth-of-type('+[i+1]+') .dist span').text(tp+'km');
        // Add user's town/city to Get Directions button
        $('.directions-btn span').text(userCity);
        // Add appropriate href value to Get Directions button
        $('.park-info-popups > div:nth-of-type('+[i+1]+') .directions-btn').attr('href', 'https://maps.google.com?saddr='+userLocOrig+'&daddr='+parkLocs[i]);

    }

}, "jsonp");


// ------------------------------------------------------------------------
// Reorder theme parks by distance
// ------------------------------------------------------------------------
window.onload = function () { 
    $(".theme-parks li").sort(sort_li) // sort elements
                      .appendTo('.theme-parks'); // append again to the list
    // sort function callback
    function sort_li(a, b){
        return ($(b).data('dist')) < ($(a).data('dist')) ? 1 : -1;    
    }
};


// ------------------------------------------------------------------------
// Filters
// ------------------------------------------------------------------------
$('.filters select').on('change', function() {

    var city     = $('.city-filter').val();
    var fee      = $('.fee-filter').val();
    var activity = $('.activity-filter').val();

    $('.theme-parks li').show();

    if(city == "kuala-lumpur") { $('.theme-parks li:not(.kuala-lumpur)').hide(); }
    else if(city == "johor") { $('.theme-parks li:not(.johor)').hide(); }
    else if(city == "selangor") { $('.theme-parks li:not(.selangor)').hide(); }
    else if(city == "malacca") { $('.theme-parks li:not(.malacca)').hide(); }
    else if(city == "perak") { $('.theme-parks li:not(.perak)').hide(); }
    else if(city == "pahang") { $('.theme-parks li:not(.pahang)').hide(); }
    else if(city == "teluk-bahang") { $('.theme-parks li:not(.teluk-bahang)').hide(); }
    else if(city == "nusajaya") { $('.theme-parks li:not(.nusajaya)').hide(); }

    if(fee == "20-40") { $('.theme-parks li:not(.a20-40)').hide(); }
    else if(fee == "40-60") { $('.theme-parks li:not(.a40-60)').hide(); }
    else if(fee == "60-80") { $('.theme-parks li:not(.a60-80)').hide(); }
    else if(fee == "80-100") { $('.theme-parks li:not(.a80-100)').hide(); }
    else if(fee == "100p") { $('.theme-parks li:not(.a100p)').hide(); }

    if(activity == "amusement-rides") { $('.theme-parks li:not(.amusement-rides)').hide(); }
    else if(activity == "new-age-tech") { $('.theme-parks li:not(.new-age-tech)').hide(); }
    else if(activity == "live-shows") { $('.theme-parks li:not(.live-shows)').hide(); }
    else if(activity == "role-play") { $('.theme-parks li:not(.role-play)').hide(); }
    else if(activity == "open-play") { $('.theme-parks li:not(.open-play)').hide(); }
    else if(activity == "water-slides") { $('.theme-parks li:not(.water-slides)').hide(); }
    else if(activity == "swim") { $('.theme-parks li:not(.swim)').hide(); }
    else if(activity == "surf") { $('.theme-parks li:not(.surf)').hide(); }
    else if(activity == "zoo") { $('.theme-parks li:not(.zoo)').hide(); }
    else if(activity == "gecko-tower") { $('.theme-parks li:not(.gecko-tower)').hide(); }
    else if(activity == "swing-trees") { $('.theme-parks li:not(.swing-trees)').hide(); }
    else if(activity == "aerobat") { $('.theme-parks li:not(.aerobat)').hide(); }
    else if(activity == "balance-beam") { $('.theme-parks li:not(.balance-beam)').hide(); }
    else if(activity == "go-karting") { $('.theme-parks li:not(.go-karting)').hide(); }
    else if(activity == "laser-maze") { $('.theme-parks li:not(.laser-maze)').hide(); }
    else if(activity == "shooting-range") { $('.theme-parks li:not(.shooting-range)').hide(); }
    else if(activity == "arcade-games") { $('.theme-parks li:not(.arcade-games)').hide(); }
    else if(activity == "snow") { $('.theme-parks li:not(.snow)').hide(); }
});


// ------------------------------------------------------------------------
// Show Theme Park Info Popups
// ------------------------------------------------------------------------
var NumTPs = $('.theme-parks li').length;

for (var i=0; i<=NumTPs; i++) {
    (function(i){
        $('.theme-parks li:nth-child('+i+') button').click(function() {
            $('.park-info-popups > div:nth-of-type('+i+')').addClass('show');
            $('.overlay').addClass('show');
        });
    })(i);
}

$('.close, .overlay').click(function() {
    $('.park-info-popups div').removeClass('show');
    $('.overlay').removeClass('show');
});

var windowWidth = $(window).width();
if (windowWidth < 1000) {
    $('.slide-trigger').click(function() {
        $(this).next().slideToggle();
        $(this).toggleClass('active');
    });
} else {
    $('.slide-trigger:first-of-type').addClass('active');
    $('.slide-trigger').click(function() {
        $(this).parent().find('> div').hide();
        $(this).parent().find('.slide-trigger').removeClass('active');
        $(this).next().show();
        $(this).toggleClass('active');
    });
}

// Disable Google Maps Zoom on Scroll
$('.map').click(function () {
    $('.map iframe').css("pointer-events", "auto");
});

$( ".map" ).mouseleave(function() {
  $('.map iframe').css("pointer-events", "none"); 
});




// ------------------------------------------------------------------------
// Image Slider
// ------------------------------------------------------------------------

$('.control_prev').click(function () {
    $(this).parent().find('ul li:first-child').appendTo($(this).parent().find('ul'));
});

$('.control_next').click(function () {
    $(this).parent().find('ul li:last-child').prependTo($(this).parent().find('ul'));
}); 



// ------------------------------------------------------------------------
// Make Facebook/Twitter buttons open in popup window
// ------------------------------------------------------------------------
$('.fb, .tweet').click(function (event) {
    if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }
    window.open($(this).attr("href"), "popupWindow", "width=600,height=600,scrollbars=yes");
});


});

