// Fetch and display data
async function fetchData() {
  try {
    const response = await fetch("http://your-backend-server/api/data");
    const data = await response.json();
    updateDashboard(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Update charts and display
function updateDashboard(data) {
  // Update charts
  updateChart(waterLevelChart, [data.waterLevel1, data.waterLevel2]);
  updateChart(flowRateChart, [data.flowRate1, data.flowRate2]);

  // Update summary
  const summaryDiv = document.getElementById("summary");
  summaryDiv.innerHTML = `
    <p>Total Liters: ${data.totalLiters} L</p>
    <p>pH Value: ${data.pHValue}</p>
  `;
}

// Initialize charts
const waterLevelChart = createChart("waterLevelChart", "Water Levels", ["Tank 1", "Tank 2"]);
const flowRateChart = createChart("flowRateChart", "Flow Rates", ["Sensor 1", "Sensor 2"]);

function createChart(elementId, label, labels) {
  return new Chart(document.getElementById(elementId), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: [],
        backgroundColor: ["blue", "green"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function updateChart(chart, data) {
  chart.data.datasets[0].data = data;
  chart.update();
}

// Poll data every 5 seconds
setInterval(fetchData, 5000);
