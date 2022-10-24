//Display current time on page header//

const currentDay = document.getElementById("currentDay"); //gets empty <p> tag //

var now = document.createTextNode(dayjs().format("dddd, MMMM DD")); //creates text node that includes dayjs format for current date//

currentDay.appendChild(now) //appends currentDay text to empty <p> tag//

//add search functionality

var newInput = document.querySelector('input');
newInput.addEventListener('search', updateCity)

// let searchText = document.getElementById('searchForm').value

var cityName = document.getElementById('cityName');

//variables for current day data
var currentTemp = document.getElementById("currentTemp")
var currentWind = document.getElementById("currentWind")
var currentHumidity = document.getElementById("currentHumidity")
var weatherIconCurrent = document.getElementById("weatherIconCurrent")

//updates cityName div with value inputted into search bar, calls API function
function updateCity(e){
  cityName.textContent = e.target.value;
  getAPI();
}


//Open Weather API call 
//my API Key = 2b5269240b8365eece7f67a1d5fe64d7


function getAPI(e){
//grabs trimmed value from search bar
  var searchInput = newInput.value.trim();
//places dynamic value into api call
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&units=imperial&appid=2b5269240b8365eece7f67a1d5fe64d7`
  fetch(requestUrl)
  .then(function (response) {
    return response.json();  
  })
  .then(function (data){
      console.log(data)

      var tempNow = data.list[0].main.feels_like
      console.log(tempNow)
      currentTemp.textContent = "Temp: " + tempNow + " F"
      

      

      var windNow = data.list[0].wind.speed
      console.log(windNow)
      currentWind.textContent = "Wind: " + windNow + " m/s"
      

      var humidNow = data.list[0].main.humidity
      console.log(humidNow)
      currentHumidity.textContent = "Humidity: " + humidNow + "%"


      var rainNow = data.list[0].rain
      console.log(data.list[0].rain3h)
      if(rainNow <= .2){
        weatherIconCurrent.removeClass = "fa-sun";
      }
      
      
      
  })
};

