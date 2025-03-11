document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      if (weatherData) {
        displayWeatherData(weatherData);
      } else {
        showError("No weather data found!");
      }
    } catch (err) {
      console.error(err);
      showError("Failed to fetch weather data!");
    }
  });

  // Fetch weather data
  async function fetchWeatherData(city) {
    const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; // Use environment variables in production
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json(); // ✅ Return the JSON response
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null; // Return null on failure
    }
  }

  // Display weather data
  function displayWeatherData(data) {
    if (!data || !data.main || !data.weather) {
      showError("Invalid weather data received!");
      return;
    }

    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  // Error handling/displaying
  function showError(message) {
    errorMessage.textContent = message;
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
