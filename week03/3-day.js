// Replace with your OpenWeatherMap API key
const apiKey = '434d1a43740c015186a3d355806974c6'; // Use your updated API key
const city = 'Antipolo City'; // Replace with your city name

// Fetch weather data
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const forecastContainer = document.getElementById('forecast');
        const forecastList = data.list;

        // Get the current date
        const today = new Date();

        // Function to format a date as 'Sep 20, 2025 (Monday)'
        function formatDate(date) {
            const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }

        // Loop through the forecast data, starting from tomorrow
        for (let index = 1; index <= 3; index++) {
            const day = forecastList[index]; // Skip the first forecast which is today
            const forecastDate = new Date(today);
            forecastDate.setDate(today.getDate() + index); // Offset by 1, 2, or 3 days

            // Create a new div for each day
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');

            // Get the formatted date (e.g., "Sep 20, 2025 (Saturday)")
            const formattedDate = formatDate(forecastDate);

            // Get the temperature and description
            const temp = Math.round(day.main.temp) + '°C';
            const description = day.weather[0].description;

            // Add content to the div
            dayDiv.innerHTML = `
                <h3>${formattedDate}</h3>
                <p>${temp}</p>
                <p>${description}</p>
            `;

            // Append the day div to the forecast container
            forecastContainer.appendChild(dayDiv);
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Failed to load weather data.');
    });
