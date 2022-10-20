//Display current time on page header//

const currentDay = document.getElementById("currentDay"); //gets empty <p> tag //

var now = document.createTextNode(dayjs().format("dddd, MMMM DD")); //creates text node that includes dayjs format for current date//

currentDay.appendChild(now) //appends currentDay text to empty <p> tag//

//Open Weather API call 
//my API Key = 2b5269240b8365eece7f67a1d5fe64d7

function getAPI(){

var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=boston&appid=2b5269240b8365eece7f67a1d5fe64d7'
fetch(requestUrl)
.then(function (response) {
  return response.json();  
})
.then(function (data){
    console.log(data)
})
};

getAPI();
// console.log(getAPI);
// console.log(response.json())
