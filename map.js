
// Global variables
var map;
var backButton;
var markerGroup;
var backgroundImage;

var DEFAULT_ZOOM = 11;


/*
 * Initialize the Leaflet map
 */
function initMap() {

  // init map
  map = new L.map('map', {
    center: [49.8880, -119.4960],
    zoom: DEFAULT_ZOOM,
    maxBoundsViscosity: 1.0 // prevent user from dragging outside bounds
  });

  // temp tile layer for now
  var tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic3VoZmYiLCJhIjoiY2plMGk3eWh1MHk0MDMzbW9scDhhaXpibiJ9.B32EslPErO5wtqwwa9vvyQ'
  }).addTo(map);

  // add all sites to the map
  getSites();

  // init the back button
  backButton = L.easyButton({
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

  // site background image
  backgroundImage = null;

  // markers in a site
  markerGroup = L.layerGroup().addTo(map);

  // log click locations
  map.on("contextmenu", function (event) {
    console.log("Coordinates: " + event.latlng.toString());
  });
}

/*
 * Query database for all sites and add them to the map.
 */
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
              loadSite(site['id'], site['longitude'], site['latitude'], site['background_image']);
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

/*
 * Called when a site is clicked. Loads the site background and all markers at the site.
 */
function loadSite(id, longitude, latitude, background) {

  // disableUserControl();
  map.setView([latitude, longitude], DEFAULT_ZOOM, {animate: false}); // set to long and lat of the site
  //map.setZoom(DEFAULT_ZOOM + 1);

  backgroundImage = L.imageOverlay("images/sites/" + background, [map.getBounds().getNorthWest(), map.getBounds().getSouthEast()]);
  backgroundImage.addTo(map); // add custom site background image

  map.setMaxBounds(backgroundImage.getBounds());

  // restrict zooming
  map._layersMaxZoom = 13;
  map._layersMinZoom = DEFAULT_ZOOM;

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
              markerIcon = L.icon({
              iconUrl: this.src,
              iconSize: [this.width, this.height]
            });

            let marker = L.marker([feature['latitude'], feature['longitude']], {icon: markerIcon}).addTo(markerGroup);

            // Show a pop up with information about the feature
            // let popup = L.popup({maxWidth: 500, minWidth: 500, maxHeight: 800, minHeight: 800, keepInView: true, className: 'custom'})
            //   .setContent("<h1>" + feature['name'] + '</h1><img height=300 width=500 src="images/content/' + feature['content_image'] + '"/><p>' + feature['content_text'] + '</p><p>Date added: ' + feature['date_added'] + '</p>')
            //   .setLatLng(map.getCenter());
            // marker.bindPopup(popup);


            marker.on("click", function() {
              $("#content-title").text(feature['name']);
              $("#content-image").attr("src", "images/content/" + feature['content_image']);
              $("#content-text").text(feature['content_text']);
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

/*
 * Called when the back button is clicked.
 */
function goBack() {
  // enableUserControl();
  map.removeControl(backButton);
  map.removeLayer(backgroundImage);
  markerGroup.clearLayers();
  map.setZoom(DEFAULT_ZOOM);
  map.setMaxBounds(null);
  getSites();
}

/*
 * Removes zoom buttons, disables dragging and zooming.
 */
function disableUserControl() {
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
  $(".leaflet-control-zoom").css("display", "none");
  map.dragging.disable();
}

/*
 * Adds zoom buttons, enables dragging and zooming
 */
function enableUserControl() {
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  map.scrollWheelZoom.enable();
  map.boxZoom.enable();
  map.keyboard.enable();
  $(".leaflet-control-zoom").css("display", "block");
  map.dragging.enable();
}
