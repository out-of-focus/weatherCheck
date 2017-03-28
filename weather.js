var tem = 0;
var unit = 0;
/*$("#tempBtn").on("click", getLocation);
$("#tempBtn2").on("click", getWeather2);*/
$(document).ready(getLocation);
var x = document.getElementById("p2");

function getLocation() {
  if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(getCoords, getWeather2, {timeout:6000});
  } else {
 getWeather2();
  }
}

function getCoords(position) {
  var lat = position.coords.latitude.toFixed(1);
  var lon = position.coords.longitude.toFixed(1);
  var adress = "https://simple-weather.p.mashape.com/weatherdata?lat=" + lat + "&lng=" + lon;
  getWeather(adress);
}

function getWeather(adress) {
  $.ajax({
    url: adress,
    type: 'GET',
    dataType: 'json',
    success: showWeather,
    error: function(err) {
      alert(err);
      console.log(err);
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "3gD9LkfFzVmshfTH6DJtbo0AX4sUp1DCQfjjsn3UWo6HorVKqu");
    }
  })
}

function showWeather(object) {
  document.getElementById("pTemp").style.display = ("initial");
  document.getElementById("temp").innerHTML = object.query.results.channel.item.condition.temp;
  document.getElementById("loc").innerHTML = object.query.results.channel.title.replace("Yahoo! Weather - ", "");
  tem = parseInt(object.query.results.channel.item.condition.temp);
  document.getElementById("cond").innerHTML = object.query.results.channel.item.condition.text;
  document.getElementById("pres").innerHTML = Math.round(object.query.results.channel.atmosphere.pressure) + " mb";
  document.getElementById("wind").innerHTML = Math.round(object.query.results.channel.wind.speed) + " km/h";
  getBackground();
  console.log(object);
}

function getBackground() {
  var backgr = "";
  if (tem < -10) {
    backgr = "files/landscape-wallpaper-hd-14.jpg"
  } else if (tem <= 0) {
    backgr = "files/winter.jpg"
  } else if (tem <= 5) {
    backgr = "files/winter-spring.jpg"
  } else if (tem <= 12) {
    backgr = "files/spring.jpg"
  } else if (tem <= 17) {
    backgr = "files/spring_summer.jpg"
  } else if (tem <= 22) {
    backgr = "files/cool_summe.jpg"
  } else if (tem <= 28) {
    backgr = "files/summer.jpg"
  } else {
    backgr = "files/tooHot.jpg"
  }
  document.getElementById("view").style.backgroundImage = "url(" + backgr + ")"
}

function getWeather2() {
  var lat = geoplugin_latitude();
  var lon = geoplugin_longitude();
  var apikey = "7bd96d0bda6baac6f5950dc6b2758017";
  var adres = "http://api.openweathermap.org/data/2.5/find?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=" + apikey;
  $.ajax({
    url: adres,
    dataType: 'jsonp',
    success: showWeather2
  })
}

function showWeather2(object) {
  document.getElementById("pTemp").style.display = ("initial");
  document.getElementById("p2").innerHTML = "For more accurate results enable geolocation in your browser.";
  document.getElementById("p2").style.display = "block";
  document.getElementById("temp").innerHTML = Math.round(object.list[0].main.temp);
  document.getElementById("loc").innerHTML = object.list[0].name;
  tem = parseInt(object.list[0].main.temp);
  document.getElementById("cond").innerHTML = object.list[0].weather[0].description;
  document.getElementById("pres").innerHTML = object.list[0].main.pressure + " hPa";
  document.getElementById("wind").innerHTML = object.list[0].wind.speed + " km/h";
  getBackground();
  console.log(object);
}

$("#fahrenheit").on("click", changeToFahr);

function changeToFahr() {
  if (unit == 0) {
    unit += 1;
    document.getElementById("fahrenheit").style.color = "black";
    document.getElementById("celsius").style.color = "gray";
    tem *= 9 / 5;
    tem += 32;
    document.getElementById("temp").innerHTML = Math.round(tem);
  }
}

$("#celsius").on("click", changeToCels);

function changeToCels() {
  if (unit == 1) {
    unit -= 1;
    document.getElementById("celsius").style.color = "black";
    document.getElementById("fahrenheit").style.color = "gray";
    tem -= 32;
    tem *= 5 / 9;
    document.getElementById("temp").innerHTML = Math.round(tem);
  }
}