const serverUrl = "http://your-server-address/get-data";

// Function to fetch and update data
async function fetchData() {
    const response = await fetch(serverUrl);
    const data = await response.json();

    updateCharts(data);
}

// Chart instances
let waterFlowChart, waterLevelChart, pHChart;

function updateCharts(data) {
    if (!waterFlowChart) {
        const ctx1 = document.getElementById('waterFlowChart').getContext('2d');
        waterFlowChart = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4'],
                datasets: [{
                    label: 'Water Flow (L/min)',
                    data: data.waterFlow,
                    borderColor: 'blue',
                    fill: false
                }]
            }
        });
    } else {
        waterFlowChart.data.datasets[0].data = data.waterFlow;
        waterFlowChart.update();
    }

    if (!waterLevelChart) {
        const ctx2 = document.getElementById('waterLevelChart').getContext('2d');
        waterLevelChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Sensor 1', 'Sensor 2'],
                datasets: [{
                    label: 'Water Level (%)',
                    data: data.waterLevel,
                    backgroundColor: ['blue', 'green']
                }]
            }
        });
    } else {
        waterLevelChart.data.datasets[0].data = data.waterLevel;
        waterLevelChart.update();
    }

    if (!pHChart) {
        const ctx3 = document.getElementById('pHChart').getContext('2d');
        pHChart = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: ['pH Reading'],
                datasets: [{
                    label: 'pH Level',
                    data: [data.pHLevel],
                    borderColor: 'red',
                    fill: false
                }]
            }
        });
    } else {
        pHChart.data.datasets[0].data = [data.pHLevel];
        pHChart.update();
    }
}

// Fetch data every 5 seconds
setInterval(fetchData, 5000);
