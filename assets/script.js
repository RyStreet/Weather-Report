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

var fiveDayCards = document.getElementById("fiveDayCards")

// var recentSearch = document.getElementById("recentSearch")






function updateCity(e){
  
   getAPI();
}


//Open Weather API call 
//my API Key = 2b5269240b8365eece7f67a1d5fe64d7



function getAPI(e){
//grabs trimmed value from search bar
  var searchInput = newInput.value.trim();
  console.log(searchInput)
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
      
      
      // console.log(cityNameStyled)
      cityName.textContent = data.city.name

      
      
      localStorage.setItem('searchedCity', JSON.stringify(searchInput))

     
      
      

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


    var fiveDayData = data.list
    console.log(fiveDayData.length)
      //function prints out the five day forecast
      function printFiveDays(){
        fiveDayCards.innerHTML=''
        for (let i=2; i < fiveDayData.length ; i=i+8){
        
        //creates elements for data variables
         var fiveDayCardsDiv = document.createElement("div");
         var fiveDayCardsDate = document.createElement('h2');
         var fiveDayCardsIcon =  document.createElement('i');
         var fiveDayCardsTemp = document.createElement('li');
         var fiveDayCardsWind = document.createElement('li');
         var fiveDayCardsHumid = document.createElement('li');

        //appends dynamic div to fiveDayCards section in html 
         fiveDayCards.appendChild(fiveDayCardsDiv);

         //appends various elements to the separate cards
         fiveDayCardsDiv.appendChild(fiveDayCardsDate);
         fiveDayCardsDiv.appendChild(fiveDayCardsIcon);
         fiveDayCardsDiv.appendChild(fiveDayCardsTemp);
         fiveDayCardsDiv.appendChild(fiveDayCardsWind);
         fiveDayCardsDiv.appendChild(fiveDayCardsHumid);

        //variables to collect data for date, temp, wind and humidity 
         var fiveDates = fiveDayData[i].dt_txt
         var fiveTemps = fiveDayData[i].main.feels_like 
         var fiveWinds = fiveDayData[i].wind.speed
         var fiveHumid = fiveDayData[i].main.humidity

        //appends data to text content 
         fiveDayCardsDate.textContent = fiveDates
         fiveDayCardsTemp.textContent = "Temp: " + fiveTemps + " F"
         fiveDayCardsWind.textContent = "Wind: " + fiveWinds + " m/s"
         fiveDayCardsHumid.textContent = "Humidity: " + fiveHumid + " %"
        
         //grabs data for weather condition
         var fiveDayWeatherStatus = data.list[i].weather[0].main
         
         //adds font awesome class fa-solid for icon display
         fiveDayCardsIcon.classList.add('fa-solid')

         //adds proper icon based off weather condition
         if(fiveDayWeatherStatus === "Rain" || weatherStatus === "Thunderstorm"){
          fiveDayCardsIcon.classList.remove('fa-sun')
          fiveDayCardsIcon.classList.remove('fa-cloud')
          fiveDayCardsIcon.classList.add("fa-cloud-rain")
          
        }
        else if(fiveDayWeatherStatus === "Clear") {
          fiveDayCardsIcon.classList.remove("fa-cloud-rain")
          fiveDayCardsIcon.classList.remove("fa-cloud")
          fiveDayCardsIcon.classList.add('fa-sun');
        }
  
        else if(fiveDayWeatherStatus === "Clouds") {
          fiveDayCardsIcon.classList.remove('fa-sun');
          fiveDayCardsIcon.classList.remove('fa-cloud-rain');
          fiveDayCardsIcon.classList.add("fa-cloud");
        }
        }
      }
     
      //dynamically updates weather icon depending on weather condition
     
        var weatherStatus = data.list[0].weather[0].main
        console.log(weatherStatus)

        if(weatherStatus === "Rain" || weatherStatus === "Thunderstorm"){
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
      printFiveDays()

  })
};

