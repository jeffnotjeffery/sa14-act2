const form = document.getElementById('city-form');
const weatherInfo = document.getElementById('weather-info');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cityInput = document.getElementById('city-input').value;
    const apiKey = 'b9e23e3c4dec46ae8f220446240305';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            showError(data.error.message);
        }
    } catch (error) {
        showError('An error occurred. Please try again later.');
    }
});

function displayWeather(data) {
    const { location, current } = data;
    const { name } = location;
    const { temp_c, condition, humidity } = current;

    const weatherHtml = `
        <div class="weather-item">
            <img src="${condition.icon}" alt="${condition.text}">
            <span>${temp_c}°C</span>
            <span>${condition.text}</span>
        </div>
        <div class="weather-item">
            <span>Humidity: ${humidity}%</span>
        </div>
    `;

    weatherInfo.innerHTML = weatherHtml;
}

function showError(message) {
    weatherInfo.innerHTML = `<div class="error">${message}</div>`;
}