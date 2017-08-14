var asteroidContainer = document.getElementById("asteroid-info");
var btn = document.getElementById("btn");
var url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-08-06&end_date=2017-08-12&detailed=true&api_key=Dk7ioJTU7BWr6wy6T5oG5K0XuaoTSC44UFS9Tn2D'
var theHazardousAsteroids = []; // array of potentially hazardous asteroids

// format input date to output yyyy-mm-dd
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

btn.addEventListener("click", function () {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', url);
  ourRequest.onload = function () {
    var data = JSON.parse(ourRequest.responseText);
    renderHTML(data);
  };
  ourRequest.send();
  btn.classList.add("hide-me");
});

var renderHTML = function(inData){
  var htmlString = "";
  var startDate = new Date(2017, 7, 6); // hard coded startDate (August 6, 2017)
  var endDate = new Date(2017, 7, 12); // hard coded endDate (August 12, 2017)

  for (var d = startDate ; d <= endDate ; d.setDate(d.getDate() + 1)){
    inputDate = formatDate(d);
    for (var i = 0 ; i < inData.near_earth_objects[`${inputDate}`].length ; i++){
      if (inData.near_earth_objects[`${inputDate}`][i]["is_potentially_hazardous_asteroid"] === true){
        htmlString += "<hr><p>" + "Asteroid Name: " + inData.near_earth_objects[`${inputDate}`][i]["name"] + "</p>";
        htmlString += "<p>" + "Speed : " + inData.near_earth_objects[`${inputDate}`][i]["close_approach_data"][0]["relative_velocity"]["miles_per_hour"] + "/mph.</p>";
        htmlString += "<p>" + "Max Diameter: " + inData.near_earth_objects[`${inputDate}`][i]["estimated_diameter"]["feet"]["estimated_diameter_max"] + " feet.</p>";
        htmlString += "<p>" + "Distance From Earth: " + inData.near_earth_objects[`${inputDate}`][i]["close_approach_data"][0]["miss_distance"]["miles"] + " miles.</p>";
      }
    }
  } asteroidContainer.insertAdjacentHTML('beforeend',htmlString) 
}