const weather=document.querySelector(".js-weather");
const API_KEY="a25bed5757fbf1ce3ab7f83d5eaaf627";

const COORDS='coords';

function getWeather(lat,lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
  .then(function(response){
    return response.json();
})
  .then(function(json){
  const temperature=json.main.temp;
  const place=json.name;
  weather.innerText=`${temperature} @ ${place}`;
});
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
  const latitude=position.coords.latitude;
  const longitude=position.coords.longitude;
  const coordsObj={
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError() {

}

function askForcoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}
function loadCoords(){
  const loadedCoords=localStorage.getItem(COORDS);
  if(loadedCoords===null){
    askForcoords();
  }else{
    const parseCoords=JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);

  }
}

function init() {
  loadCoords();
}
init();
