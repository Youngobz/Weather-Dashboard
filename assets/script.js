const cordinate_API_url = "http://api.openweathermap.org/geo/1.0/direct";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "73aa1ebbf0b4dd4ac4e7f0ab5832b92d";


let selectedCityName = '';
const inputField = document.getElementById('searchCity');
const currentDateDetail = document.getElementById('current-date-details');
const cardViewDetail = document.getElementById("card-view-details");
const detailContainer = document.querySelector('.detail-container');
const searchedCityList = document.querySelector(".searched-city-list");

async function getWeatherData(searchedCity) {
    try {
        const cordinateResponse = await fetch(`${cordinate_API_url}?q=${searchedCity}&limit=1&appid=${API_KEY}`)
        const cordinatesData = await cordinateResponse.json();
        const { lat, lon, name } = cordinatesData[0];
        searchedCity = name;
        selectedCityName = name;
        const weatherResponse = await fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`);
        const weatherData = await weatherResponse.json();
        const updatedData = formatData(weatherData?.list);
        setCityDataInLS(searchedCity, updatedData);
        setListOfCity(searchedCity);
        renderWeatherDetails(updatedData);
    } catch (err) {
        console.error("Getting error while fetching the data", err);
    }
}

function onSearchSubmitted (event) {
    event.preventDefault();
    selectedCityName = inputField.value;
    getWeatherData(selectedCityName);
}

function formatData(data) {
    const fromattedData = [];
    for(let i=0; i<data.length; i+=8) {
        const curretnData = data[i];
        let createdData = {
            date: dateFormation(curretnData?.dt_txt),
            temp: curretnData?.main?.temp,
            wind: curretnData?.wind?.speed,
            humidity: curretnData?.main?.humidity
        };
        fromattedData.push(createdData);
    }
    return fromattedData;
}

function dateFormation(date) {
    const selectedDate = new Date(date);
    const formattedDate = `${selectedDate.getMonth()+1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
    return formattedDate;
}

// store city in localStorage
function setCityDataInLS(cityName, data) {
    const stringifyData = JSON.stringify(data);
    localStorage.setItem(cityName, stringifyData);
}

// get city from localStorage
function getCityDataInLS(cityName) {
    const stringifyData = localStorage.getItem(cityName);
    return JSON.parse(stringifyData);
}

function setListOfCity(searchedCityName='') {
    const listOfCity = 'listOfCity';
    let cityList = JSON.parse(localStorage.getItem(listOfCity)) || [];
    if (!cityList.includes(searchedCityName) && searchedCityName) {
        cityList.push(searchedCityName);
    }
    const stringifyCityList = JSON.stringify(cityList);
    localStorage.setItem(listOfCity, stringifyCityList);
    renderListOfCities(cityList);
}

function renderWeatherDetails(weatherData = []) {
    renderCurrentDateDetails(weatherData[0]);
    renderCardDetails(weatherData);
    detailContainer.classList.remove('hide');
}

function renderCurrentDateDetails(todaysData) {
    currentDateDetail.children[0].innerText = `${selectedCityName}(${todaysData.date})`;
    currentDateDetail.children[2].innerText = `Temp: ${todaysData.temp}°F`;
    currentDateDetail.children[3].innerText = `Wind: ${todaysData.wind} MPH`;
    currentDateDetail.children[4].innerText = `Humidity: ${todaysData.humidity} %`;
}

function renderCardDetails(weatherData) {
    for(let i=0; i<weatherData.length; i++) {
        const currentCardEle = cardViewDetail.children[i];
        const data = weatherData[i];
        currentCardEle.children[0].innerText = `(${data.date})`;
        currentCardEle.children[2].innerText = `Temp: ${data.temp}°F`;
        currentCardEle.children[3].innerText = `Wind: ${data.wind} MPH`;
        currentCardEle.children[4].innerText = `Humidity: ${data.humidity} %`;
    }
}

function renderListOfCities(cityList = []) {
    searchedCityList.innerHTML = '';
    const domFrag = new DocumentFragment();
    for(let i=0; i<cityList.length; i++) {
        const liEle = document.createElement('li');
        liEle.innerText = cityList[i];
        liEle.addEventListener('click', () => renderCityData(cityList[i]));
        domFrag.append(liEle);
    }
    searchedCityList.append(domFrag);
}

function renderCityData(cityName) {
    const updatedData = getCityDataInLS(cityName);
    selectedCityName = cityName;
    renderWeatherDetails(updatedData);
}

function initializePage() {
    setListOfCity();
}

initializePage();