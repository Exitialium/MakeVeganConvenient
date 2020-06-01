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
        console.log(prop);
        geocoder.geocode({'address': prop}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
          }else {
            //alert('Geocode was not successful for the following reason: ' + status);
          }
        });
    }
})(window,google);





