// Imports API Key
import { APIKey } from "./secret.mjs";

// Select HTML elements in the document
const weatherIcon = document.querySelector("#weather-icon");
const description = document.querySelector("#description");
const temperature = document.querySelector("#temperature");
const maxTemp = document.querySelector("#high");
const minTemp = document.querySelector("#low");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

// OpenWeatherMap Location
const latitude = "14.554398820974072"
const longitude = "121.023873395248"

// API URL
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric`;

// Fetch weather data
export async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Weather fetch error:", error);
    }
}

// Render data to DOM
function displayResults(data) {
    // Weather Icon
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherIcon.setAttribute("src", iconsrc)
    weatherIcon.setAttribute("alt", data.weather[0].description)

    // Current Weather Description
    description.textContent = capitalize(data.weather[0].description);

    // Current Temperature
    temperature.innerHTML = `<strong>Temperature:</strong> ${data.main.temp.toFixed(2)} °C`;
    
    // Maximum Temperature
    maxTemp.innerHTML = `<strong>High:</strong> ${data.main.temp_max.toFixed(2) } °C`;
    
    // Maximum Temperature
    minTemp.innerHTML = `<strong>Low:</strong> ${data.main.temp_min.toFixed(2) } °C`;

    // Current Humidity
    humidity.innerHTML = `<strong>Humidity:</strong> ${data.main.humidity}%`;

    // Sunrise
    sunrise.innerHTML = `<strong>Sunrise:</strong> ${formatTime(data.sys.sunrise)}`;

    // Sunset
    sunset.innerHTML = `<strong>Sunset:</strong> ${formatTime(data.sys.sunset)}`;
}

// Format Time
function formatTime(unixSeconds) {
    const date = new Date(unixSeconds * 1000);
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}


// Capitalize Text
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

apiFetch();