// Element references
const outputSection = document.getElementById('output');
const mainMenuSection = document.getElementById('main-menu');
const outputContent = document.getElementById('output-content');
const backToMenuButton = document.getElementById('backToMenu');
const sectionTitle = document.getElementById('section-title');

// Show main menu
function showMainMenu() {
    mainMenuSection.style.display = 'block';
    outputSection.style.display = 'none';
}

// Show output section
function showOutput(title, content) {
    sectionTitle.innerText = title;
    mainMenuSection.style.display = 'none';
    outputSection.style.display = 'block';
    outputContent.innerHTML = content;
}

// Fetch and display sensor data
function fetchSensorData(endpoint) {
    fetch('/get-data')
        .then(response => response.json())
        .then(data => {
            if (endpoint === 'waterFlow') {
                const waterFlowContent = `
                    <h3>Water Flow Sensor</h3>
                    <canvas id="waterFlowChart"></canvas>
                    <p>Estimated Water Bill: $${data.waterBill.toFixed(2)}</p>
                `;
                showOutput('Water Flow Sensor', waterFlowContent);
                drawChart('waterFlowChart', 'Water Flow (L/min)', data.waterFlow);
            } else if (endpoint === 'waterLevel') {
                const waterLevelContent = `
                    <h3>Water Level Sensor</h3>
                    <canvas id="waterLevelChart"></canvas>
                    <p>Water Levels: ${data.waterLevel.join('% and ')}%</p>
                `;
                showOutput('Water Level Sensor', waterLevelContent);
                drawChart('waterLevelChart', 'Water Level (%)', data.waterLevel);
            } else if (endpoint === 'phLevel') {
                const phContent = `
                    <h3>pH Level</h3>
                    <canvas id="pHChart"></canvas>
                `;
                showOutput('pH Level', phContent);
                drawChart('pHChart', 'pH Levels', data.pHLevel);
            }
        });
}

// Draw chart
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

// Control water valve
function controlValve(action) {
    fetch('/control-valve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action })
    })
        .then(response => response.json())
        .then(data => {
            showOutput('Water Valve Control', `<p>${data.status}</p>`);
        });
}

// Add event listeners
document.getElementById('waterValve').addEventListener('click', () => {
    const valveContent = `
        <h3>Control Water Valve</h3>
        <button onclick="controlValve('open')">Open Valve</button>
        <button onclick="controlValve('close')">Close Valve</button>
    `;
    showOutput('Water Valve Control', valveContent);
});
document.getElementById('waterFlow').addEventListener('click', () => fetchSensorData('waterFlow'));
document.getElementById('waterLevel').addEventListener('click', () => fetchSensorData('waterLevel'));
document.getElementById('phLevel').addEventListener('click', () => fetchSensorData('phLevel'));
backToMenuButton.addEventListener('click', showMainMenu);

// Show the main menu initially
showMainMenu();
