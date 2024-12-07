const mainMenu = document.getElementById('main-menu');
const outputSection = document.getElementById('output-section');
const contentArea = document.getElementById('content-area');
const sectionTitle = document.getElementById('section-title');

// Show main menu
function showMainMenu() {
    mainMenu.style.display = 'block';
    outputSection.style.display = 'none';
}

// Show specific section
function showSection(title, content) {
    sectionTitle.textContent = title;
    contentArea.innerHTML = content;
    mainMenu.style.display = 'none';
    outputSection.style.display = 'block';
}

// Fetch sensor data and display charts
function fetchSensorData() {
    return fetch('/get-data').then(response => response.json());
}

// Show Water Valve Control
function showWaterValve() {
    const content = `
        <h3>Water Valve Control</h3>
        <button onclick="controlValve('open')">Open Valve</button>
        <button onclick="controlValve('close')">Close Valve</button>
    `;
    showSection('Water Valve Control', content);
}

// Control Valve
function controlValve(action) {
    fetch('/control-valve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.status);
        });
}

// Show Water Flow Sensor Data
function showWaterFlow() {
    fetchSensorData().then(data => {
        const content = `
            <canvas id="waterFlowChart"></canvas>
            <p>Estimated Water Bill: $${data.waterBill.toFixed(2)}</p>
        `;
        showSection('Water Flow Sensor', content);
        drawChart('waterFlowChart', 'Water Flow (L/min)', data.waterFlow);
    });
}

// Show Water Level Sensor Data
function showWaterLevel() {
    fetchSensorData().then(data => {
        const content = `
            <canvas id="waterLevelChart"></canvas>
            <p>Water Levels: ${data.waterLevel.join('% and ')}%</p>
        `;
        showSection('Water Level Sensor', content);
        drawChart('waterLevelChart', 'Water Level (%)', data.waterLevel);
    });
}

// Show pH Level Data
function showPhLevel() {
    fetchSensorData().then(data => {
        const content = `
            <canvas id="pHChart"></canvas>
        `;
        showSection('pH Level', content);
        drawChart('pHChart', 'pH Levels', data.pHLevel);
    });
}

// Draw Chart
function drawChart(canvasId, label, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: data.length }, (_, i) => `Data ${i + 1}`),
            datasets: [{
                label: label,
                data: data,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false
            }]
        }
    });
}

// Initialize with main menu
showMainMenu();
