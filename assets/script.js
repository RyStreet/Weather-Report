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
var responseText = document.getElementById('responseText')
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
    if(response.status !== 200){
      responseText.textContent = "You must enter a valid city name"
    }
    if(response.status === 200){
    responseText.textContent = "" 
    return response.json();
    }
  })
  .then(function (data){
      console.log(data)

      //displays city name from data in cityName div
      
      var cityNameStyled = data.city.name
      console.log(cityNameStyled)
      cityName.textContent = cityNameStyled
      localStorage.setItem('Searched City', cityNameStyled)
      

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

     
      //dynamically updates weather icon to display rain if rain data is > 40%
      // var rainNow = data.list[0].rain['3h'];
      // console.log(rainNow + " % chance of rain")
      // if(rainNow > .40){

        var weatherStatus = data.list[0].weather[0].main
        console.log(weatherStatus)

        if(weatherStatus === "Rain"){
        weatherIconCurrent.classList.remove('fa-sun')
        weatherIconCurrent.classList.remove('fa-cloud')
        weatherIconCurrent.classList.add("fa-cloud-rain")
        body.classList.remove("daySunny")
        body.classList.add("dayCloudy")
      }
      else if(weatherStatus === "Clear") {
        weatherIconCurrent.classList.remove("fa-cloud-rain")
        weatherIconCurrent.classList.remove("fa-cloud")
        weatherIconCurrent.classList.add('fa-sun');

        body.classList.remove("dayCloudy")
        body.classList.add("daySunny")
      }

      else if(weatherStatus === "Clouds") {
        weatherIconCurrent.classList.remove('fa-sun');
        weatherIconCurrent.classList.remove('fa-cloud-rain');
        weatherIconCurrent.classList.add("fa-cloud");

        body.classList.remove("daySunny")
        body.classList.add("dayCloudy")
      }


  })
};

