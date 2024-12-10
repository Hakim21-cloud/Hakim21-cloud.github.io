const waterFlowChartCtx = document.getElementById('waterFlowChart').getContext('2d');
const waterLevelChartCtx = document.getElementById('waterLevelChart').getContext('2d');
const pHChartCtx = document.getElementById('pHChart').getContext('2d');

// Initialize charts
const waterFlowChart = new Chart(waterFlowChartCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Water Flow (L/min)', data: [], borderColor: 'blue' }] },
});
const waterLevelChart = new Chart(waterLevelChartCtx, {
    type: 'bar',
    data: { labels: ['Tank 1', 'Tank 2'], datasets: [{ label: 'Water Level (%)', data: [], backgroundColor: 'green' }] },
});
const pHChart = new Chart(pHChartCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'pH Levels', data: [], borderColor: 'purple' }] },
});

// Fetch and update charts
function updateCharts() {
    fetch('/get-data')
        .then(response => response.json())
        .then(data => {
            // Update Water Flow Chart
            waterFlowChart.data.labels = Array.from({ length: data.waterFlowSensors.length }, (_, i) => `Sensor ${i + 1}`);
            waterFlowChart.data.datasets[0].data = data.waterFlowSensors;
            waterFlowChart.update();

            // Update Water Flow Percentage
            const totalFlow = data.waterFlowSensors.reduce((a, b) => a + b, 0);
            document.getElementById('waterFlowPercentage').textContent = `Total Water Flow: ${totalFlow} L/min`;

            // Update Water Level Chart
            waterLevelChart.data.datasets[0].data = data.waterLevelSensors;
            waterLevelChart.update();

            // Update Water Level Percentage
            const avgLevel = (data.waterLevelSensors.reduce((a, b) => a + b, 0) / data.waterLevelSensors.length).toFixed(2);
            document.getElementById('waterLevelPercentage').textContent = `Average Water Level: ${avgLevel}%`;

            // Update pH Chart
            pHChart.data.labels = Array.from({ length: data.pHLevels.length }, (_, i) => `Reading ${i + 1}`);
            pHChart.data.datasets[0].data = data.pHLevels;
            pHChart.update();
        });
}

// Periodically fetch data
setInterval(updateCharts, 2000);
