// OpenWeatherMap Credentials and Location
const APIKey = "434d1a43740c015186a3d355806974c6"
const latitude = "14.554398820974072"
const longitude = "121.023873395248"

// API URL
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`;


// Get Weather
export async function getWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data unavailable");

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.querySelector("#weather-content").innerHTML =
            "<p>Unable to load weather data at this time.</p>";
    }
}

function displayResults(data) {
    const container = document.querySelector("#weather-content");
    container.innerHTML = "";

    // Weather Icon
    const weatherIcon = document.createElement("img");
    weatherIcon.id = "weather-icon";
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    weatherIcon.width = 50;
    weatherIcon.height = 50;


    // Description
    const description = document.createElement("p");
    description.textContent = capitalize(data.weather[0].description);

    // Current Temp
    const temp = document.createElement("p");
    temp.textContent = `Current: ${data.main.temp.toFixed(1)}°C`;

    // High
    const high = document.createElement("p");
    high.textContent = `High: ${data.main.temp_max.toFixed(1)}°C`;

    // Low
    const low = document.createElement("p");
    low.textContent = `Low: ${data.main.temp_min.toFixed(1)}°C`;

    // Humidity
    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    // Sunrise
    const sunrise = document.createElement("p");
    sunrise.textContent = `Sunrise: ${formatTime(data.sys.sunrise)}`;

    // Sunset
    const sunset = document.createElement("p");
    sunset.textContent = `Sunset: ${formatTime(data.sys.sunset)}`;

    // Append everything into #weather-content
    container.append(weatherIcon, description, temp, high, low, humidity, sunrise, sunset);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatTime(unixSeconds) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(unixSeconds * 1000).toLocaleTimeString([], options);
}

// Run on load
getWeather();