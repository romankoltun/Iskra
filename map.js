var mymap = L.map('mapid', { zoomControl:false }).locate({setView: true, maxZoom: 16});
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.satellite',
accessToken: 'pk.eyJ1IjoibGF1c2RpbyIsImEiOiJjanZidGtlMjMweTBpM3lxbWoyMmMyMWh3In0.a35eUVAB6Qw1JU94IWdy4w'
}).addTo(mymap);
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(mymap);
}

mymap.on('locationfound', onLocationFound);
function onLocationError(e) {
    alert(e.message);
}

mymap.on('locationerror', onLocationError);
