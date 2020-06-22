// Add your code here
/*eslint-env browser */
/* eslint-disable no-unused-vars */
/* eslint node: true */
"use strict";

(async function map(window, google) {
    var options = {
        center: {
          lat: 25.045097,
          lng: 121.513490
        },
        zoom: 15
    },
    element = document.getElementById('mapy'),
    map = new google.maps.Map(element,options);
    var geocoder = new google.maps.Geocoder();
    let response = await fetch('../restaurant.json');
    let res = await response.json();
    for( let prop in res.中山區){
        console.log(res.中山區[prop]['素種類']);
        geocoder.geocode({'address': prop}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              icon: '../img/vegan.png',
              map: map,
              position: results[0].geometry.location
            });
            marker.addListener('click', function() {
                var contentString = '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+'<h1 id="firstHeading" class="firstHeading">'+prop+'</h1>'+
                    '<div id="bodyContent">'+'<p><b>素種類：</b>'+res.中山區[prop]['素種類']+'<br><b>菜色：</b>'+res.中山區[prop]['菜色']+'<br><b>素食選擇：</b>'+res.中山區[prop]['素食選擇']+'</p>'+'</div>'+
                    '</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                infowindow.open(map, marker);
            });

          }else {
            //alert('Geocode was not successful for the following reason: ' + status);
          }
        });
    }
})(window,google);





