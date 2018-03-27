
/*
 * Border Free Bees Interactive Map (Prototype)
 * borderfreebees.com
 * March 2018
 */



//////////////////////////////////////////////////// START GLOBAL VARIABLES
var map;
var watercolor, satellite;

// layer buttons
var projectsBtn, historicalBtn, ecologicalBtn, communityBtn;
var currentLayer = null; // currently no default layer

var opacityInterval = null;


var currentView = 0;
var MapViews = Object.freeze([
  {name: "city", type: 1, zoom: 7, group: null},
  {name: "site", type: 2, zoom: 11, group: null},
  {name: "feature", type: 3, zoom: 17, group: null},
  {name: "content", type: 4, zoom: 18, group: null}
]);

currentContentMarkerID = -1;

//////////////////////////////////////////////////// END GLOBAL VARIABLES


/*
 * Initialize the Leaflet map
 */
function initMap() {

  // init map
  map = new L.map('map', {
    center: [49.5, -121.499713],
    zoom: MapViews[currentView].zoom,
    maxZoom: MapViews[3].zoom,
    minZoom: MapViews[currentView].zoom,
    maxBoundsViscosity: 1.0 // prevent user from dragging outside bounds
  });


  // watercolor tile layer
  watercolor = L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
      maxZoom: 18
  }).addTo(map);

  // satellite tile layer
  satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      opacity: 0
  }).addTo(map);

  disableUserControl();

  // site background image
  backgroundImage = null;

  currentView = 0;

  // markers in a site
  for (view of MapViews) {
    view.group = L.layerGroup().addTo(map);
  }

  // log click locations
  map.on("contextmenu", function (event) {
    console.log("Coordinates: " + event.latlng.toString());
  });

  map.on('zoomend', zoomChanged);

  loadMarkersFromView(MapViews[0]);

  // uncomment to test and work on layer buttons without having to enter a site
  // initLayerButtons();
}

/*
 * Loads all markers at a specific view level. (i.e. city, site, feature)
 */
function loadMarkersFromView(view) {
  $.ajax({
      type: "post",
      url: "db/ajax_requests.php",
      data: {request: "get_markers", arg1: MapViews[currentView].type},
      success: function(result) {
        loadMarkers(result);
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(textStatus, errorThrown);
     }
  });
}

/*
 * Loads all markers which are children of a parent marker.
 */
function loadChildrenMarkers(parentID) {
  $.ajax({
      type: "post",
      url: "db/ajax_requests.php",
      data: {request: "get_child_markers", arg1: parentID},
      success: function(result) {
        loadMarkers(result);
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(textStatus, errorThrown);
     }
  });
}

/*
 * Used by layer functions. Should only be used for marker type=3.
 */
function loadMarkersFromViewAndLayer(view, layer) {
  $.ajax({
      type: "post",
      url: "db/ajax_requests.php",
      data: {request: "get_markers_from_layer", arg1: layer},
      success: function(result) {
        loadMarkers(result);
      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(textStatus, errorThrown);
     }
  });
}

/*
 * Generic marker loader function. Loads marker image, positions and sets up event handler for marker click.
 */
function loadMarkers(result) {

  for (let marker of result) {

    let markerImage = new Image();
    let markerIcon;
    markerImage.onload = function() {
        markerIcon = L.icon({
        iconUrl: this.src,
        iconSize: [this.width, this.height]
      });

      let markerPoint = L.marker([marker['latitude'], marker['longitude']], {icon: markerIcon}).addTo(MapViews[currentView].group);


      markerPoint.on("click", function() {

        opacityInterval = setInterval(updateOpacity, 200);
        map.flyTo(this.getLatLng(), MapViews[MapViews[currentView].type].zoom, {animate: true}); // center and zoom on marker


        // check for content
        loadContent(marker['name'], marker['id']);
      });
    }

    markerImage.src = "images/" + MapViews[currentView].name + "/" + marker['image'];

  }



}

/*
 * Checks database for content related to marker. If none is found, will supply default content for side bar.
 */
function loadContent(markerName, markerID) {
  $.ajax({
      type: "post",
      url: "db/ajax_requests.php",
      data: {request: "get_content_of_feature", arg1: markerID},
      success: function(result) {

        if (result.length > 0) {
          currentContentMarkerID = markerID;
          updateContent(markerName, result[0]);
        } else {

          // default side bar content
          updateContent("Welcome to the BFB Map!", {date_added:null, video: null, image: null, description: "This map records significant project activities and knowledge that has been produced at major sites of activity. Start by clicking on either Kelowna or Richmond, and then click an image for more information about it."});

        }

      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(textStatus, errorThrown);
     }
  });
}

/*
 * Called by the map zoomend event. Shows and hides marker layers.
 */
function zoomChanged() {
  updateOpacity();
  clearInterval(opacityInterval);

  if (map.getZoom() >= MapViews[0].zoom && map.getZoom() < MapViews[1].zoom) {
    // ensure project legend is NOT visible
    $("#projects-legend").css("display", "none");
    MapViews[2].group.clearLayers();
    MapViews[1].group.clearLayers();
    currentView = 0;
    loadMarkersFromView(currentView);
    removeBackButton();
    removeLayerButtons();
  } else if (map.getZoom() >= MapViews[1].zoom && map.getZoom() < MapViews[2].zoom) {
    // ensure project legend is NOT visible
    $("#projects-legend").css("display", "none");
    MapViews[2].group.clearLayers();
    MapViews[0].group.clearLayers();
    currentView = 1;
    loadMarkersFromView(currentView);
    addBackButton();
    removeLayerButtons();
  } else if (map.getZoom() == MapViews[2].zoom) {

    if (currentLayer !== null && projectsBtn !== null) {
      layerBtnClicked(currentLayer);
    } else {
      MapViews[1].group.clearLayers();
      MapViews[0].group.clearLayers();
      currentView = 2;
      loadMarkersFromView(currentView);
      addBackButton();
      initLayerButtons();
    }

  }

}

/*
 * Update the opacity of the map tile layers depending on the zoom level.
 */
function updateOpacity() {
  let opacity = 1;
  if (map.getZoom() > 15) {
    map.removeLayer(watercolor);
    opacity = 1; // TODO, fade instead of it dissappearing instantly
  } else {
    watercolor.addTo(map);
    watercolor.setZIndex(0);
    opacity = Math.pow(map.getZoom(), 3) / 7000;
  }
  satellite.options.opacity = opacity;
  watercolor.options.opacity = 1 - opacity; // TODO, fade instead of it dissappearing instantly

  // fixes issue where opacity not updated to 1 (unless panned or zoomed further)
  // if (map.getZoom() === 16) {
  //   satellite.redraw();
  // }

}


/*
 * Updates the HTML sidebar beside the map with some content.
 */
function updateContent(markerName, content) {
  $("#content-title").text(markerName);

  if (content.image !== null) {
    $("#content-image").attr("src", "images/content/" + content.image);
  } else {
    $("#content-image").attr("src", "");
  }

  if (content.description !== null) {
    $("#content-text").text(content.description);
  } else {
    $("#content-text").text("");
  }

  if (content.video !== null) {
    $("#content-video").attr("src", content.video);
    $("#content-video").css("display", "inline");
  } else {
    $("#content-video").attr("src", "");
    $("#content-video").css("display", "none");
  }

  if (content.date_added !== null) {
    $("#content-date").text("Date: " + content.date_added);
  } else {
    $("#content-date").text("");
  }
}

/*
 * Adds a back button to the side bar.
 */
function addBackButton() {
  $("#back-button").css("display", "inline");
}

/*
 * Removes back button from the side bar.
 */
function removeBackButton() {
  $("#back-button").css("display", "none");
}

/*
 * Called when the back button is clicked.
 */
function goBack() {

  if (map.getZoom() == MapViews[3].zoom) {
    map.setZoom(MapViews[2].zoom);
  } else {
    map.setZoom(MapViews[--currentView].zoom);
  }

  // check for parent content
  getParentMarker(currentContentMarkerID);
}

/*
 * Queries database to find parent marker of a marker. Loads the content of that marker to the side bar.
 * Used so that side bar content is correct when back button clicked.
 */
function getParentMarker(markerID) {
  $.ajax({
      type: "post",
      url: "db/ajax_requests.php",
      data: {request: "get_parent_marker", arg1: markerID},
      success: function(result) {

        loadContent(result[0].name, result[0].id);

      },
      error: function(jqXHR, textStatus, errorThrown){
        alert(textStatus, errorThrown);
     }
  });
}

/*
 * Adds the layer buttons to the map.
 */
function initLayerButtons() {

  if (projectsBtn == null) {
    projectsBtn = L.easyButton({
      id: 'projects-btn',
      position: 'topleft',
      type: 'replace',
      leafletClasses: false,
      states: [{
        stateName: 'projects',
        onClick: function() { layerBtnClicked("projects") },
        title: 'Projects',
        icon: '<div>Projects</div>'
      },
      {
        stateName: 'selected',
        title: 'Projects',
        icon: '<div>Projects</div>'
      }]
    });
    projectsBtn.addTo(map);

    ecologicalBtn = L.easyButton({
      id: 'ecological-btn',
      position: 'topleft',
      type: 'replace',
      leafletClasses: false,
      states: [{
        stateName: 'ecological',
        onClick: function() { layerBtnClicked("ecological") },
        title: 'Ecological',
        icon: '<div>Ecological</div>'
      },
      {
        stateName: 'selected',
        title: 'Ecological',
        icon: '<div>Ecological</div>'
      }]
    });
    ecologicalBtn.addTo(map);

    historicalBtn = L.easyButton({
      id: 'historical-btn',
      position: 'topleft',
      type: 'replace',
      leafletClasses: false,
      states: [{
        stateName: 'historical',
        onClick: function() { layerBtnClicked("historical") },
        title: 'Historical',
        icon: '<div>Historical</div>'
      },
      {
        stateName: 'selected',
        title: 'Historical',
        icon: '<div>Historical</div>'
      }]
    });
    historicalBtn.addTo(map);

    communityBtn = L.easyButton({
      id: 'community-btn',
      position: 'topleft',
      type: 'replace',
      leafletClasses: false,
      states: [{
        stateName: 'community',
        onClick: function() { layerBtnClicked("community") },
        title: 'Community',
        icon: '<div>Community</div>'
      },
      {
        stateName: 'selected',
        title: 'Community',
        icon: '<div>Community</div>'
      }]
    });
    communityBtn.addTo(map);
  }


}

/*
 * Removes the layer buttons from the map window.
 */
function removeLayerButtons() {
  try {
    projectsBtn.remove(); ecologicalBtn.remove(); historicalBtn.remove(); communityBtn.remove();
    projectsBtn = ecologicalBtn = historicalBtn = communityBtn = null;
  } catch(err) {}
}

/*
 * Called when any layer button is clicked. Handles click and redirects to appropriate init function.
 */
function layerBtnClicked(layerName) {

  projectsBtn.state("projects");
  ecologicalBtn.state("ecological");
  historicalBtn.state("historical");
  communityBtn.state("community");

  if (layerName === "projects") {
    projectsBtn.state('selected');
    currentLayer = "projects";
    initProjectsLayer();
  } else if (layerName === "ecological") {
    ecologicalBtn.state('selected');
    currentLayer = "ecological";
    initEcologicalLayer();
  } else if (layerName === "historical") {
    historicalBtn.state('selected');
    currentLayer = "historical";
    initHistoricalLayer();
  } else if (layerName === "community") {
    communityBtn.state("selected");
    currentLayer = "community";
    initCommunityLayer();
  }
}

/*
 * Projects layer settings
 */
function initProjectsLayer() {

  // display legend of generic markers (workshops, community events, volunteer activities)
  $("#projects-legend").css("display", "inline");


  // reload markers and only show project ones
  MapViews[currentView].group.clearLayers();
  loadMarkersFromViewAndLayer(currentView, 3);
  loadMarkersFromViewAndLayer(currentView, 4);
  loadMarkersFromViewAndLayer(currentView, 5);

}

/*
 * Ecological layer settings
 */
function initEcologicalLayer() {
  // ensure project legend is NOT visible
  $("#projects-legend").css("display", "none");

  // reload markers and only show ecological ones
  MapViews[currentView].group.clearLayers();
  loadMarkersFromViewAndLayer(currentView, 1);
}

/*
 * Historical layer settings
 */
function initHistoricalLayer() {
  // ensure project legend is NOT visible
  $("#projects-legend").css("display", "none");

  updateContent("TODO", {description: "[ html slider to move through markers by date ]", video: null, image: null, date_added:null});
}

/*
 * Community Experiences layer settings
 */
function initCommunityLayer() {
  // ensure project legend is NOT visible
  $("#projects-legend").css("display", "none");

  // show form to add community experience

  updateContent("TODO", {description: "[ form to insert experience ]", video: null, image: null, date_added:null});
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
