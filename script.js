// Blynk credentials
const BLYNK_AUTH_TOKEN = "YOUR_BLYNK_AUTH_TOKEN";
const BLYNK_API_URL = `https://blynk.cloud/external/api/`;

// Virtual pins for 4 water flow sensors
const FLOW_SENSORS = ["V1", "V2", "V3", "V4"];

// Fetch flow sensor data from Blynk
async function fetchSensorData() {
    try {
        const responses = await Promise.all(
            FLOW_SENSORS.map(pin => fetch(`${BLYNK_API_URL}get?token=${BLYNK_AUTH_TOKEN}&pin=${pin}`))
        );
        const data = await Promise.all(responses.map(response => response.json()));
        return data.map(value => parseFloat(value) || 0); // Ensure numerical data
    } catch (error) {
        console.error("Error fetching sensor data:", error);
        return [0, 0, 0, 0];
    }
}

// Update the chart with fetched data
function updateChart(chart, data) {
    chart.data.datasets[0].data = data;
    chart.update();

    const averageFlow = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2);
    document.getElementById('averageFlow').textContent = averageFlow;
}

// Initialize the water flow chart
function createFlowChart() {
    const ctx = document.getElementById('flowSensorChart').getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Sensor 1", "Sensor 2", "Sensor 3", "Sensor 4"],
            datasets: [{
                label: 'Water Flow (L/min)',
                data: [0, 0, 0, 0], // Initial data
                backgroundColor: ['#007BFF', '#00C853', '#FF5722', '#FFC107']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Flow (L/min)"
                    }
                }
            }
        }
    });
}

// Refresh data every 5 seconds
function startUpdating(chart) {
    fetchSensorData().then(data => updateChart(chart, data));
    setInterval(() => {
        fetchSensorData().then(data => updateChart(chart, data));
    }, 5000); // Update every 5 seconds
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    const flowChart = createFlowChart();
    startUpdating(flowChart);
});
