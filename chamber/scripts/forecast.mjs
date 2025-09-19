// Imports API Key
import { APIKey } from "./secret.mjs";

// OpenWeatherMap Location
const latitude = "14.554398820974072";
const longitude = "121.023873395248";

// API URL - get more data points for better daily selection (use 40 for 5 days)
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=metric&cnt=40`;

// Fetch forecast data
export async function fetchForecast() {
    // Select the container where the forecast will be rendered
    const forecastContainer = document.querySelector("#forecast-container");
    console.log("Forecast container found?:", forecastContainer); // for debugging purposes

    if (!forecastContainer) {
        console.error("No forecast container found");
        return;
    }

    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data, forecastContainer);
        } else {
            throw Error("Failed to fetch forecast data");
        }
    } catch (error) {
        console.error("Forecast fetch error:", error);
    }
}

// Render the 3-day forecast
function displayForecast(data, forecastContainer) {
    console.log("Forecast data:", data); // for debugging purposes
    var today = new Date();

    // Clear previous forecast (optional)
    forecastContainer.innerHTML = "";

    // Format date helper
    function formatDate(date) {
        var options = {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
        };
        return date.toLocaleDateString("en-US", options);
    }

    // Loop for the next 3 days (starting tomorrow)
    for (var dayOffset = 1; dayOffset <= 3; dayOffset++) {
        var targetDate = new Date(today);
        targetDate.setDate(today.getDate() + dayOffset);
        var targetDay = targetDate.getDate();

        // Find forecast entry closest to 12:00 PM for this day
        var forecastDay = null;
        for (var i = 0; i < data.list.length; i++) {
            var forecastDate = new Date(data.list[i].dt * 1000);
            if (forecastDate.getDate() === targetDay && forecastDate.getHours() === 12) {
                forecastDay = data.list[i];
                break;
            }
        }

        // If no exact 12:00 PM entry found, fallback to first entry of that day
        if (!forecastDay) {
            for (var i = 0; i < data.list.length; i++) {
                var forecastDate = new Date(data.list[i].dt * 1000);
                if (forecastDate.getDate() === targetDay) {
                    forecastDay = data.list[i];
                    break;
                }
            }
        }

        if (!forecastDay) continue; // No data for this day, skip it

        var formattedDate = formatDate(targetDate);
        var temperature = Math.round(forecastDay.main.temp) + "°C";
        var description = forecastDay.weather[0].description;
        var iconCode = forecastDay.weather[0].icon;
        var iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Capitalize first letter of description
        description = description.charAt(0).toUpperCase() + description.slice(1);

        // Create day div
        var dayDiv = document.createElement("div");
        dayDiv.classList.add("day");

        dayDiv.innerHTML =
            "<h3>" + formattedDate + "</h3>" +
            "<img src='" + iconUrl + "' alt='" + description + "' />" +
            "<p>" + temperature + "</p>" +
            "<p>" + description + "</p>";

        forecastContainer.appendChild(dayDiv);
    }
}
