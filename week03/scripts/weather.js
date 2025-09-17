// Select HTML elements in the document
const myTown = document.querySelector("#town");
const myDescription = document.querySelector("#description");
const myTemperature = document.querySelector("#temperature");
const myGraphic = document.querySelector("#graphic");
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

// Create required variables for the url
const myKey = "8893a5dadc9d4b3a60cbbc6ff42e6c1d9"
const myLat = "49.75"
const myLong = "6.64"

// Construct a full path using template literals
const myUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

// Try to grab the current weather data
async function apiFetch() {
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();
            // console.log(data); // testing only
            // displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Display the JSON data onto my web page
function displayResults(data) {
    // console.log("hello")
    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&def;C`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute("src", iconsrc)
    myGraphic.setAttribute("alt", data.weather[0].description)
    weatherIcon.setAttribute("src", iconsrc)
    weatherIcon.setAttribute("alt", data.weather[0].description)
}

apiFetch();