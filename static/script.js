function passValues() {
    var value = document.getElementById("dropdown").value;
    localStorage.setItem("optionsValue", value);
    return false;
}

function polyline(value) {
    L.marker(value[0], {title: "Start"}).bindPopup("Start Point").addTo(map);
    L.marker(value[value.length - 1], {title: "End"}).bindPopup("End Point").addTo(map);
    var polyline = L.polyline(value, {color: 'red'});
    polyline.addTo(map);
    map.fitBounds(polyline.getBounds());
}

function polygon(value) {
    var polygon = L.polygon(value, {color: 'red'});
    polygon.addTo(map);
    map.fitBounds(polygon.getBounds());
}

var map = L.map('map').setView([51.505, -0.09], 13);
var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
});
OSM.addTo(map);

var selectedOption = localStorage.getItem("optionsValue");
var y = document.getElementById("coordinates").value;
var coordinates = JSON.parse(y);

if (selectedOption === "polyline") {
    window.onload = polyline(coordinates);
}
else if (selectedOption === "polygon") {
    window.onload = polygon(coordinates);
}
else {
    console.error("Failed");
}