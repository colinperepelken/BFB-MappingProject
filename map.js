
// Global variables
var map;
var markerGroup;
var sitesGroup;
var backgroundImage;

var currentLocation;
var currentView;
var MapViews = Object.freeze({locations:1, sites:2, markers:3, content:4});

var siteName, siteDescription;

var ZoomLevels = Object.freeze({locations:7, sites:11, markers:11, content:12});


/*
 * Initialize the Leaflet map
 */
function initMap() {

  // init map
  map = new L.map('map', {
    center: [49.5, -121.499713],
    zoom: ZoomLevels.locations,
    maxZoom: ZoomLevels.locations,
    minZoom: ZoomLevels.locations,
    maxBoundsViscosity: 1.0 // prevent user from dragging outside bounds
  });


  // temp tile layer for now
  var tileLayer = L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
      //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
  }).addTo(map);

  // load kelowna and richmond locations (inital view)
  loadLocations();

  // site background image
  backgroundImage = null;

  currentView = MapViews.locations;

  // markers in a site
  markerGroup = L.layerGroup().addTo(map);

  // sites in a location
  sitesGroup = L.layerGroup().addTo(map);

  // locations on the map
  locationsGroup = L.layerGroup().addTo(map);

  // log click locations
  map.on("contextmenu", function (event) {
    console.log("Coordinates: " + event.latlng.toString());
  });
}

function loadLocations() {

  // restrict zooming
  map.options.maxZoom = ZoomLevels.locations;
  map.options.minZoom = ZoomLevels.locations;
  map.setView([49.5, -121.499713], ZoomLevels.locations, {animate: false});

  $.ajax({
      type: "post",
      url: "db/ajax_requests.php",
      data: {request: "get_locations"},
      success: function(result) {

        for (let location of result) {

          let markerImage = new Image();
          let locationIcon;
          markerImage.onload = function() {
            locationIcon = L.icon({
              iconUrl: this.src,
              iconSize: [this.width, this.height]
            });

            let marker = L.marker([location['latitude'], location['longitude']], {icon: locationIcon}).addTo(locationsGroup);

            marker.on("click", function() {
              map.removeLayer(this);
              // restrict zooming
              map.options.maxZoom = ZoomLevels.sites;
              map.options.minZoom = ZoomLevels.sites;
              map.setView([location['latitude'], location['longitude']], ZoomLevels.sites, {animate: false});
              getSites(location['id']);
              locationsGroup.clearLayers();
            });
          }
          markerImage.src = "images/locations/" + location['marker_image'];

        }

      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(textStatus, errorThrown);
     }
  });
}

/*
 * Query database for all sites and add them to the map.
 */
function getSites(locationID) {

  currentLocation = locationID;
  currentView = MapViews.sites;

  $.ajax({
      type: "post",
      url: "db/ajax_requests.php",
      data: {request: "get_sites", arg1: locationID},
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

            let marker = L.marker([site['latitude'], site['longitude']], {icon: siteIcon}).addTo(sitesGroup);

            marker.on("click", function() {
              map.removeLayer(this);
              loadSite(site['id'], site['longitude'], site['latitude'], site['background_image'], site['name'], site['description']);
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

function updateContent(title, text, image = null, video = null, date = null) {
  $("#content-title").text(title);
  $("#content-image").attr("src", image);
  $("#content-text").text(text);
  if (date !== null) {
    $("#content-date").text("Date: " + date);
  } else {
    $("#content-date").text("");
  }
}

/*
 * Called when a site is clicked. Loads the site background and all markers at the site.
 */
function loadSite(id, longitude, latitude, background, name, description) {

  currentView = MapViews.markers;

  siteName = name;
  siteDescription = description;

  updateContent(name, description);

  // add back button
  addBackButton();


  // disableUserControl();
  map.setView([latitude, longitude], ZoomLevels.markers, {animate: false}); // set to long and lat of the site
  //map.setZoom(DEFAULT_ZOOM + 1);

  backgroundImage = L.imageOverlay("images/sites/" + background, [map.getBounds().getNorthWest(), map.getBounds().getSouthEast()]);
  backgroundImage.addTo(map); // add custom site background image

  map.setMaxBounds(backgroundImage.getBounds());

  // restrict zooming
  map.options.maxZoom = ZoomLevels.content + 1;
  map.options.minZoom = ZoomLevels.markers;

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


            marker.on("click", function() {
              map.setView(this.getLatLng(), ZoomLevels.content, {animate: false}); // center and zoom on marker
              updateContent(feature['name'], feature['content_text'],  "images/content/" + feature['content_image'], null, feature['date_added']);
              currentView = MapViews.content;
            });


          }
          markerImage.src = "images/markers/" + feature['marker_image'];
        }

      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(textStatus, errorThrown);
     }
  });

  addBackButton();

}

function addBackButton() {
  $("#back-button").css("display", "inline");
}

function removeBackButton() {
  $("#back-button").css("display", "none");
}

/*
 * Called when the back button is clicked.
 */
function goBack() {


  if (currentView === MapViews.content) {

    // go back to view of markers at a site
    map.setZoom(ZoomLevels.markers);
    updateContent(siteName, siteDescription);
    currentView = MapViews.markers;

  } else if (currentView === MapViews.markers) {

    // go back to view of sites at a location
    currentView = MapViews.sites;
    map.removeLayer(backgroundImage);
    markerGroup.clearLayers();
    map.setMaxBounds(null);
    getSites(currentLocation);

  } else if (currentView === MapViews.sites) {

    // go back to view of locations (i.e. Kelowna, Richmond)
    sitesGroup.clearLayers();
    loadLocations();
    removeBackButton();



    updateContent("Welcome to the BFB Map!", "This map records significant project activities and knowledge that has been produced at major sites of activity. Start by clicking on either Kelowna or Richmond, and then click an image for more information about it.");

  } else {

  }
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
