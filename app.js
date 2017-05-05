$(document).ready(function() {
  $('select').material_select();
  $('.collapsible').collapsible();
  getLocation();
})

function getLocation() {
  $("#button").click(function(event){
    event.preventDefault();
    var city = $('#city').val();
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key=AIzaSyBeVvUWaX8RnJtKf4EERvDSJX0NFpiW6po")
    .then(function(response) {
      return response.json().then(function(json) {
        var lat = json.results[0].geometry.location.lat;
        var long = json.results[0].geometry.location.lng;
        getPrecip(lat, long);
      })
    })
  })
}


function getPrecip(lat, long) {
  var key = '5567e4950b5b3b4ea9088c5ac3639c6b';
  var day = findDay();
  fetch("https://api.darksky.net/forecast/"+key+"/"+lat+","+long+"")
  .then(function(response) {
    return response.json()
    .then(function(json) {
      var typeOf = json.daily.data[day].precipType;
      localStorage.setItem("type", typeOf);
      location.assign("drinks-text.html");
    })
  })
}


function findDay() {
  var dayOf = $("#day").val();
  return dayOf;
}


function forecast() {
  var typeOf = localStorage.getItem('type')
  if (typeOf === 'snow') {
    $('#drinkImg').attr("src", "img/snow.png")
  }
  else if (typeOf === 'rain') {
    $('#drinkImg').attr("src","img/rain.png")
  }
  else if (typeOf === 'hail') {
    $('#drinkImg').attr("src", "img/hail.png")
  }
  else {
    $('#drinkImg').attr("src", "img/sun-01.png")
  }
}
