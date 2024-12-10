const apiUrl = "https://hakim21-cloud.github.io/esp32/esp32_data.json"; // URL to ESP32 data

// Fetch data from ESP32
async function fetchESP32Data() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    updateDashboard(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Update the dashboard with live data
function updateDashboard(data) {
  // Update Flow Sensor Chart
  updateChart(flowChart, [data.flow1, data.flow2, data.flow3, data.flow4]);
  document.getElementById("flowPercent").textContent =
    `${calculatePercentage(data.flow1, data.flow2, data.flow3, data.flow4)}%`;

  // Update Water Level Chart
  updateChart(levelChart, [data.level1, data.level2]);
  document.getElementById("tank1Level").textContent = data.level1;
  document.getElementById("tank2Level").textContent = data.level2;

  // Update pH Level Chart
  updateChart(pHChart, [data.pH]);
  document.getElementById("pHValue").textContent = data.pH.toFixed(2);
}

// Helper to calculate percentage for flow sensors
function calculatePercentage(...flows) {
  const total = flows.reduce((sum, flow) => sum + flow, 0);
  return flows.map(flow => ((flow / total) * 100).toFixed(2)).join(", ");
}

// Helper to update a chart
function updateChart(chart, newData) {
  chart.data.datasets[0].data = newData;
  chart.update();
}

// Initialize Charts
const flowChart = new Chart(document.getElementById("flowChart"), {
  type: "bar",
  data: {
    labels: ["Flow 1", "Flow 2", "Flow 3", "Flow 4"],
    datasets: [{
      label: "Flow Rates (L/min)",
      backgroundColor: ["blue", "green", "orange", "red"],
      data: []
    }]
  }
});

const levelChart = new Chart(document.getElementById("levelChart"), {
  type: "bar",
  data: {
    labels: ["Tank 1", "Tank 2"],
    datasets: [{
      label: "Water Levels (%)",
      backgroundColor: ["blue", "green"],
      data: []
    }]
  }
});

const pHChart = new Chart(document.getElementById("pHChart"), {
  type: "line",
  data: {
    labels: ["pH"],
    datasets: [{
      label: "pH Levels",
      borderColor: "purple",
      data: []
    }]
  }
});

// Fetch data every second
setInterval(fetchESP32Data, 1000);
