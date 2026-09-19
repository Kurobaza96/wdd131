const temperature = 8;
const windSpeed = 12;

// Calculate the wind chill using Celsius and km/h
function calculateWindChill(temp, speed) {
    return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16));
}

// Get the wind chill element
const windChillElement = document.querySelector("#windchill");

// Only calculate wind chill when the conditions are appropriate
if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${windChill.toFixed(1)} °C`;
} else {
    windChillElement.textContent = "N/A";
}

// Display the current year
const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;

// Display the document's last modified date
document.querySelector("#lastmodified").textContent = document.lastModified;


