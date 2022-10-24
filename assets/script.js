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
var body = document.getElementById('fullPage')
//updates cityName div with value inputted into search bar, calls API function
function updateCity(e){
  
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

      //displays city name from data in cityName div
      console.log(data.city.name)
      var cityNameStyled = data.city.name
      cityName.textContent = cityNameStyled

      //displays current temp data
      var tempNow = data.list[0].main.feels_like
      console.log(tempNow + " f")
      currentTemp.textContent = "Temp: " + tempNow + " F"
      
      //displays current wind data
      var windNow = data.list[0].wind.speed
      console.log(windNow + " m/s")
      currentWind.textContent = "Wind: " + windNow + " m/s"
      
      //displays current humidity data
      var humidNow = data.list[0].main.humidity
      console.log(humidNow + " %")
      currentHumidity.textContent = "Humidity: " + humidNow + "%"

      var timeNow = data.city.sunset
      console.log(timeNow + " sunset time")
      //dynamically updates weather icon to display rain if rain data is > 40%
      var rainNow = data.list[0].rain['3h'];
      console.log(rainNow + " % chance of rain")
      if(rainNow > .40){
        weatherIconCurrent.classList.remove('fa-sun')
        weatherIconCurrent.classList.add("fa-cloud-rain");
        body.classList.remove("daySunny")
        body.classList.add("dayCloudy")
      }
      else{
        body.classList.remove("dayCloudy")
        body.classList.add("daySunny")
        weatherIconCurrent.classList.add('fa-sun');
        
      }

  })
};

