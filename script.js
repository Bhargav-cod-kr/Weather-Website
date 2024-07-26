const apiKey = "73b5be82180c5f75d7bf5c1e689df6c4";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon");
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

async function fetchWeather(city) {
    //const fullUrl = `${apiUrl}${city}`;
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector('.error').style.display = 'block';
    }
    else {
        const result = await response.json();

        document.querySelector(".cityName").innerHTML = result.name;
        document.querySelector(".temp").innerHTML =
          Math.round(result.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = result.main.humidity + "%";
        document.querySelector(".wind").innerHTML = result.wind.speed + " km/h";
        console.log(result);
    
        if (result.weather[0].main == "Clouds") {
          weatherIcon.src = "clouds.png";
        }
        else if (result.weather[0].main == "Rain") {
          weatherIcon.src = "rain.png";
        }
        else if (result.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png";
          }
        else if (result.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png";
          }
        else if (result.weather[0].main == "Mist") {
            weatherIcon.src = "mist.png";
          }
        else if (result.weather[0].main == "Snow") {
            weatherIcon.src = "snow.png";
          }
        document.querySelector('.error').style.display = 'none';      
    }

}

function handleSearch() {
  const city = searchBox.value;
  if(city) {
     fetchWeather(city);
  }
  else {
    console.error("Please enter a valid city name");
  }
}


searchBtn.addEventListener("click", handleSearch);

searchBox.addEventListener('keydown' , (e) => {
  if(e.key == "Enter") {
    handleSearch();
  }
});


fetchWeather("Banswara");
