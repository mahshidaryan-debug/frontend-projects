const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const cityNameLabel = document.getElementById('city-name');
const tempLabel = document.getElementById('temp');
const descLabel = document.getElementById('description');
const iconContainer = document.getElementById('weather-icon');
const body = document.body;
const rainContainer = document.getElementById('rain-container');

// Mock weather data
const mockWeatherData = {
    "Tehran": { temp: 28, description: "Sunny", main: "Clear", country: "IR" },
    "London": { temp: 16, description: "Cloudy", main: "Clouds", country: "GB" },
    "Paris": { temp: 22, description: "Rainy", main: "Rain", country: "FR" },
    "Tokyo": { temp: 20, description: "Snow", main: "Snow", country: "JP" }
};

// Icons and backgrounds
const icons = {
    "Clear":"fas fa-sun",
    "Clouds":"fas fa-cloud",
    "Rain":"fas fa-cloud-showers-heavy",
    "Drizzle":"fas fa-cloud-rain",
    "Thunderstorm":"fas fa-bolt",
    "Snow":"fas fa-snowflake",
    "Mist":"fas fa-smog"
};

const backgrounds = {
    "Clear":"linear-gradient(to right,#f39c12,#f1c40f)",
    "Clouds":"linear-gradient(to right,#bdc3c7,#2c3e50)",
    "Rain":"linear-gradient(to right,#3498db,#2980b9)",
    "Drizzle":"linear-gradient(to right,#5dade2,#2e86c1)",
    "Thunderstorm":"linear-gradient(to right,#616161,#2c3e50)",
    "Snow":"linear-gradient(to right,#e6e9f0,#eef2f3)",
    "Mist":"linear-gradient(to right,#7f8c8d,#95a5a6)"
};

// Clear previous effects
function clearEffects(){
    rainContainer.innerHTML = '';
}

// Add rain drops
function addRain(){
    for(let i=0;i<100;i++){
        const drop = document.createElement('div');
        drop.className='drop';
        drop.style.left = Math.random()*100+'%';
        drop.style.animationDuration = (0.5 + Math.random()*1)+'s';
        drop.style.animationDelay = Math.random()*2+'s';
        rainContainer.appendChild(drop);
    }
}

// Add snowflakes
function addSnow(){
    for(let i=0;i<50;i++){
        const snow = document.createElement('div');
        snow.className='snowflake';
        snow.style.left = Math.random()*100+'%';
        snow.style.width = snow.style.height = (3 + Math.random()*5)+'px';
        snow.style.animationDuration = (3 + Math.random()*3)+'s';
        snow.style.animationDelay = Math.random()*3+'s';
        rainContainer.appendChild(snow);
    }
}

// Event listener
searchBtn.addEventListener('click', ()=>{
    const cityInputValue = cityInput.value.trim().toLowerCase(); // Convert user input to lowercase

    // Find matching city in mock data (case-insensitive)
    const cityKey = Object.keys(mockWeatherData)
                     .find(key => key.toLowerCase() === cityInputValue);

    if(cityKey){
        const data = mockWeatherData[cityKey];

        cityNameLabel.textContent = `${cityKey}, ${data.country}`;
        tempLabel.textContent = `${data.temp}°C`;
        descLabel.textContent = data.description;
        iconContainer.innerHTML = `<i class="${icons[data.main]}"></i>`;
        body.style.background = backgrounds[data.main];
        weatherCard.style.display = "block";

        clearEffects();
        if(data.main==="Rain") addRain();
        if(data.main==="Snow") addSnow();

    } else {
        alert("City not found in mock data!");
        weatherCard.style.display = "none";
        clearEffects();
    }
});
