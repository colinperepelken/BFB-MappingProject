
var map = L.map('map').setView([49.8880, -119.4960], 11);

// temp tile layer for now
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1Ijoic3VoZmYiLCJhIjoiY2plMGk3eWh1MHk0MDMzbW9scDhhaXpibiJ9.B32EslPErO5wtqwwa9vvyQ'
}).addTo(map);

getSites();

var backButton = L.easyButton({
  id: 'back-btn',
  position: 'topleft',
  type: 'replace',
  leafletClasses: false,
  states: [{
    stateName: 'go-back',
    onClick: goBack,
    title: 'Go back',
    icon: '<img alt="back button" src="images/buttons/back.png"/>'
  }]
});

var backgroundImage = null;

var markerGroup = L.layerGroup().addTo(map);

function getSites() {
  $.ajax({
      type: "post",
      url: "db/ajax_requests.php",
      data: {request: "get_sites"},
      success: function(result) {
        console.log(result);

        for (let site of result) {

          let markerImage = new Image();
          let siteIcon;
          markerImage.onload = function() {
            siteIcon = L.icon({
              iconUrl: this.src,
              iconSize: [this.width, this.height]
            });

            let marker = L.marker([site['latitude'], site['longitude']], {icon: siteIcon}).addTo(map);

            marker.on("click", function() {
              map.removeLayer(this);
              loadSite(site['id']);
            });
          }
          markerImage.src = "images/sites/" + site['marker_image'];

        }

      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(textStatus, errorThrown);
     }
  });
}

function loadSite(id) {
  var bounds = map.getBounds();
  disableUserControl();
  backgroundImage = L.imageOverlay("images/sites/farm_background.jpg", [bounds.getNorthWest(), bounds.getSouthEast()]);
  backgroundImage.addTo(map);

  // get markers for the site
  $.ajax({
      type: "post",
      url: "db/ajax_requests.php",
      data: {request: "get_markers", arg1: id},
      success: function(result) {

        for (let feature of result) {

          let markerImage = new Image();
          let markerIcon;
          markerImage.onload = function() {
            alert(this.width);
            markerIcon = L.icon({
              iconUrl: this.src,
              iconSize: [this.width, this.height]
            });

            let marker = L.marker([feature['latitude'], feature['longitude']], {icon: markerIcon}).addTo(markerGroup);

            marker.on("click", function() {
              // custom pop up here
              alert("test");
            });
          }
          markerImage.src = "images/markers/" + feature['marker_image'];
        }

      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(textStatus, errorThrown);
     }
  });

  backButton.addTo(map);

}

function goBack() {
  enableUserControl();
  map.removeControl(backButton);
  map.removeLayer(backgroundImage);
  markerGroup.clearLayers();
  getSites();
}

function disableUserControl() {
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
  $(".leaflet-control-zoom").css("display", "none");
  map.dragging.disable();
}

function enableUserControl() {
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  map.scrollWheelZoom.enable();
  map.boxZoom.enable();
  map.keyboard.enable();
  $(".leaflet-control-zoom").css("display", "block");
  map.dragging.enable();
}
