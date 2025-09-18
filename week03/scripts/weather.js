// Select HTML elements in the document
const myTown = document.querySelector("#town");
const myDescription = document.querySelector("#description");
const myTemperature = document.querySelector("#temperature");
const myGraphic = document.querySelector("#graphic");
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

// Create required variables for the url
const myKey = "1e08c4fc57a3294e16414fd0a18d8f33"
const myLat = "49.75"
const myLong = "6.64"

// Construct a full path using template literals
const myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

// Try to grab the current weather data
async function apiFetch() {
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Display the JSON data onto my web page
function displayResults(data) {
    // console.log(data.weather[0].icon);
    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;C`
    console.log("Icon code:", data.weather[0].icon);
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    console.log("Icon URL:", iconsrc);
    myGraphic.setAttribute("src", iconsrc)
    myGraphic.setAttribute("alt", data.weather[0].description)
    currentTemp.textContent = `${data.main.temp} °C`;
    weatherIcon.setAttribute("src", iconsrc)
    weatherIcon.setAttribute("alt", data.weather[0].description)
    captionDesc.textContent = data.weather[0].description;
}

apiFetch();