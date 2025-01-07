const esp32Url = 'http://<ESP32-IP-ADDRESS>/'; // Replace with your ESP32's IP

async function fetchData() {
    try {
        const response = await fetch(esp32Url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('water-level').innerText = `Water Level: ${data.waterLevel1}%`;
        document.getElementById('flow-rate').innerText = `Flow Rate: ${data.flowRate1} L/min`;
        document.getElementById('error-message').innerText = ''; // Clear error message
    } catch (error) {
        document.getElementById('error-message').innerText = `Error fetching data: ${error.message}`;
    }
}

// Fetch data initially and refresh every 2 seconds
fetchData();
setInterval(fetchData, 2000);
