var mymap = L.map('mapid', { zoomControl:false }).locate({setView: true, maxZoom: 16});
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.run-bike-hike',
accessToken: 'pk.eyJ1IjoibGF1c2RpbyIsImEiOiJjanZidGtlMjMweTBpM3lxbWoyMmMyMWh3In0.a35eUVAB6Qw1JU94IWdy4w'
}).addTo(mymap);

var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [90, 90],
        iconAnchor:   [45, 75],
        popupAnchor:  [0, -60]
    }
});

var purpleIcon = new LeafIcon({iconUrl: 'public/images/marker-purple.png'}),
    orangeIcon = new LeafIcon({iconUrl: 'public/images/marker-orange.png'});

var userLocationIcon = L.icon({
    iconUrl: 'public/images/my-location.png',

      iconSize:     [90, 90],
      iconAnchor:   [45, 45],
      popupAnchor:  [0, -45]
});

L.icon = function (options) {
    return new L.Icon(options);
};

mymap.on('locationfound', onLocationFound);

var myLocation;
function onLocationFound(e) {
  myLocation = new L.marker(e.latlng,{icon: userLocationIcon}, {draggable:true});
  mymap.addLayer(myLocation);
}

function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationerror', onLocationError);
function locateUser() {
  mymap.removeLayer(myLocation);
  this.mymap.locate({setView: true, maxZoom: 16});
}
