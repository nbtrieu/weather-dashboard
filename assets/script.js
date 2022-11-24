let searchButton = document.getElementById('searchButton');
let searchResult = document.getElementById('search-result');
let citySpan = document.getElementById('city');
let iconSpan = document.getElementsByClassName('icon');

let dateSpan0 = document.getElementById('date0');
let tempSpan0 = document.getElementById('temp0');
let windSpan0 = document.getElementById('wind0');
let humiditySpan0 = document.getElementById('humidity0');

let dateSpan1 = document.getElementById('date1');
let tempSpan1 = document.getElementById('temp1');
let windSpan1 = document.getElementById('wind1');
let humiditySpan1 = document.getElementById('humidity1');

// let dateSpan0 = document.getElementById('date0');
let tempSpan2 = document.getElementById('temp2');
let windSpan2 = document.getElementById('wind2');
let humiditySpan2 = document.getElementById('humidity2');

// let dateSpan0 = document.getElementById('date0');
let tempSpan3 = document.getElementById('temp3');
let windSpan3 = document.getElementById('wind3');
let humiditySpan3 = document.getElementById('humidity3');

// let dateSpan0 = document.getElementById('date0');
let tempSpan4 = document.getElementById('temp4');
let windSpan4 = document.getElementById('wind4');
let humiditySpan4 = document.getElementById('humidity4');

// let dateSpan0 = document.getElementById('date0');
let tempSpan5 = document.getElementById('temp5');
let windSpan5 = document.getElementById('wind5');
let humiditySpan5 = document.getElementById('humidity5');

let fetchResult = null;
let weatherDataIndex = -1;


// let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a25fa154a84c9369ad1575488ecc950c`;

let currentTime = dayjs().unix();

function capitalizeName(string) {
    const capName = string
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    return capName;
  }

capitalizeName('san diego');

searchButton.addEventListener('click', function (event) {
    event.preventDefault();

    let cityName = document.getElementById('city-name').value;
    
    // let cityName = 'Irvine'; // for testing
    let geoApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a25fa154a84c9369ad1575488ecc950c`;

    citySpan.textContent = capitalizeName(cityName);
    dateSpan0.textContent = '(' + dayjs().format('M/D/YYYY') + ')';

    fetch(geoApiUrl)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        fetchResult = data;
        // The API automatically updates to the nearest time within each 3-hour block so always display the first object in the data array
        
        // TODAY FORECAST
        // iconSpan.textContent = data.list[weatherDataIndex].weather[0].icon; 
        let tempKelvin0 = data.list[0].main.temp;
        let tempFahrenheit0 = ((tempKelvin0 - 273.15) * 1.8 + 32).toFixed(2);
        tempSpan0.textContent = tempFahrenheit0;

        let windMeterPerSecond0 = data.list[0].wind.speed;
        let windMilesPerHour0 = (windMeterPerSecond0 * 2.237).toFixed(2);
        windSpan0.textContent = windMilesPerHour0;

        humiditySpan0.textContent = data.list[0].main.humidity;

        // NEXT 5 DAY FORECAST
        // Day 1
         let day1 = data.list[8].dt;
         dateSpan1.textContent = dayjs().format('M/D/YYYY');

        let tempKelvin1 = data.list[8].main.temp;
        let tempFahrenheit1 = ((tempKelvin1 - 273.15) * 1.8 + 32).toFixed(2);
        tempSpan1.textContent = tempFahrenheit1;

        let windMeterPerSecond1 = data.list[8].wind.speed;
        let windMilesPerHour1 = (windMeterPerSecond1 * 2.237).toFixed(2);
        windSpan1.textContent = windMilesPerHour1;

        humiditySpan1.textContent = data.list[8].main.humidity;

    })
    .catch(function (error) {
        console.log(error);
      })
    
    
    // unhide search result section
    searchResult.setAttribute('class', 'col-9 show');
})