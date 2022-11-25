let searchButton = document.getElementById('searchButton');
let searchResult = document.getElementById('search-result');
let historyList = document.getElementById('history');
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

let dateSpan2 = document.getElementById('date2');
let tempSpan2 = document.getElementById('temp2');
let windSpan2 = document.getElementById('wind2');
let humiditySpan2 = document.getElementById('humidity2');

let dateSpan3 = document.getElementById('date3');
let tempSpan3 = document.getElementById('temp3');
let windSpan3 = document.getElementById('wind3');
let humiditySpan3 = document.getElementById('humidity3');

let dateSpan4 = document.getElementById('date4');
let tempSpan4 = document.getElementById('temp4');
let windSpan4 = document.getElementById('wind4');
let humiditySpan4 = document.getElementById('humidity4');

let dateSpan5 = document.getElementById('date5');
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
    
    let searchArray = JSON.parse(window.localStorage.getItem('searchArray')) || [];
    let newSearch = cityName;
    searchArray.push(newSearch);
    window.localStorage.setItem('searchArray', JSON.stringify(searchArray));
    let historyButton = document.createElement('button');
    historyButton.setAttribute('class', 'btn btn-secondary');
    historyButton.setAttribute('type', 'button');
    historyButton.style.marginBottom = '20px';
    historyButton.innerHTML = newSearch;
    historyList.appendChild(historyButton);
    historyButton.addEventListener('click', function (event) {
        event.preventDefault();
        
    })
    
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

        let wiconSrc0 = 'http://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '.png';
        document.getElementById('wicon0').src = wiconSrc0;

        // NEXT 5 DAY FORECAST
        // Day 1
        let day1 = data.list[8].dt;
        // console.log(data.list[8]); // correct index and unix timestamp!
        // console.log('tomorrow date in unix:')
        // console.log(day1);
        // console.log(typeof day1);
        // console.log(dayjs.unix(day1).format('M/D/YYYY'));
        dateSpan1.textContent = dayjs.unix(day1).format('M/D/YYYY');

        let tempKelvin1 = data.list[8].main.temp;
        let tempFahrenheit1 = ((tempKelvin1 - 273.15) * 1.8 + 32).toFixed(2);
        tempSpan1.textContent = tempFahrenheit1;

        let windMeterPerSecond1 = data.list[8].wind.speed;
        let windMilesPerHour1 = (windMeterPerSecond1 * 2.237).toFixed(2);
        windSpan1.textContent = windMilesPerHour1;

        humiditySpan1.textContent = data.list[8].main.humidity;

        let wiconSrc1 = 'http://openweathermap.org/img/wn/' + data.list[8].weather[0].icon + '.png';
        document.getElementById('wicon1').src = wiconSrc1;

        // Day 2
        let day2 = data.list[16].dt;
        dateSpan2.textContent = dayjs.unix(day2).format('M/D/YYYY');

        let tempKelvin2 = data.list[16].main.temp;
        let tempFahrenheit2 = ((tempKelvin2 - 273.15) * 1.8 + 32).toFixed(2);
        tempSpan2.textContent = tempFahrenheit2;

        let windMeterPerSecond2 = data.list[16].wind.speed;
        let windMilesPerHour2 = (windMeterPerSecond2 * 2.237).toFixed(2);
        windSpan2.textContent = windMilesPerHour2;

        humiditySpan2.textContent = data.list[16].main.humidity;

        let wiconSrc2 = 'http://openweathermap.org/img/wn/' + data.list[16].weather[0].icon + '.png';
        document.getElementById('wicon2').src = wiconSrc2;

        // Day 3
        let day3 = data.list[24].dt;
        dateSpan3.textContent = dayjs.unix(day3).format('M/D/YYYY');

        let tempKelvin3 = data.list[24].main.temp;
        let tempFahrenheit3 = ((tempKelvin3 - 273.15) * 1.8 + 32).toFixed(2);
        tempSpan3.textContent = tempFahrenheit3;

        let windMeterPerSecond3 = data.list[24].wind.speed;
        let windMilesPerHour3 = (windMeterPerSecond3 * 2.237).toFixed(2);
        windSpan3.textContent = windMilesPerHour3;

        humiditySpan3.textContent = data.list[24].main.humidity;

        let wiconSrc3 = 'http://openweathermap.org/img/wn/' + data.list[24].weather[0].icon + '.png';
        document.getElementById('wicon3').src = wiconSrc3;

        // Day 4
        let day4 = data.list[32].dt;
        dateSpan4.textContent = dayjs.unix(day4).format('M/D/YYYY');

        let tempKelvin4 = data.list[32].main.temp;
        let tempFahrenheit4 = ((tempKelvin4 - 273.15) * 1.8 + 32).toFixed(2);
        tempSpan4.textContent = tempFahrenheit4;

        let windMeterPerSecond4 = data.list[32].wind.speed;
        let windMilesPerHour4 = (windMeterPerSecond4 * 2.237).toFixed(2);
        windSpan4.textContent = windMilesPerHour4;

        humiditySpan4.textContent = data.list[32].main.humidity;

        let wiconSrc4 = 'http://openweathermap.org/img/wn/' + data.list[32].weather[0].icon + '.png';
        document.getElementById('wicon4').src = wiconSrc4;

        // Day 5
        let day5 = data.list[39].dt;
        dateSpan5.textContent = dayjs.unix(day5).format('M/D/YYYY');

        let tempKelvin5 = data.list[39].main.temp;
        let tempFahrenheit5 = ((tempKelvin5 - 273.15) * 1.8 + 32).toFixed(2);
        tempSpan5.textContent = tempFahrenheit5;

        let windMeterPerSecond5 = data.list[39].wind.speed;
        let windMilesPerHour5 = (windMeterPerSecond5 * 2.237).toFixed(2);
        windSpan5.textContent = windMilesPerHour5;

        humiditySpan5.textContent = data.list[39].main.humidity;

        let wiconSrc5 = 'http://openweathermap.org/img/wn/' + data.list[39].weather[0].icon + '.png';
        document.getElementById('wicon5').src = wiconSrc5;
    })
    .catch(function (error) {
        console.log(error);
      })
    
    
    // unhide search result section
    searchResult.setAttribute('class', 'col-9 show');
})