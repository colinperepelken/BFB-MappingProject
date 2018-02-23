
var map = L.map('map').setView([49.8880, -119.4960], 11);

// temp tile layer for now
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1Ijoic3VoZmYiLCJhIjoiY2plMGk3eWh1MHk0MDMzbW9scDhhaXpibiJ9.B32EslPErO5wtqwwa9vvyQ'
}).addTo(map);

var marker = L.marker([49.868804, -119.338829]).addTo(map);

marker.bindPopup("<b>Title</b><br>Some info about this!").openPopup();
