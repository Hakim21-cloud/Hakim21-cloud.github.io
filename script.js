// Initialize empty data arrays
const waterLevelData = [];
const flowRateData = [[], [], [], []];
const pHData = [];
const labels = [];

// Update Charts
function updateChart(chart, data) {
  chart.data.labels = labels;
  chart.data.datasets.forEach((dataset, index) => {
    dataset.data = data[index];
  });
  chart.update();
}

// Fetch Data
async function fetchData() {
  const response = await fetch("../api/data.json");
  const data = await response.json();

  // Update labels and datasets
  labels.push(new Date().toLocaleTimeString());
  waterLevelData.push([data.waterLevel1, data.waterLevel2]);
  flowRateData[0].push(data.flowRate1);
  flowRateData[1].push(data.flowRate2);
  flowRateData[2].push(data.flowRate3);
  flowRateData[3].push(data.flowRate4);
  pHData.push([data.pH]);

  // Update HTML
  document.getElementById("totalFlow").innerText = `Total Flow: ${data.totalFlow} L`;
  document.getElementById("billing").innerText = `Estimated Bill: RM ${(data.totalFlow * 0.002).toFixed(2)}`;

  // Update Charts
  updateChart(waterLevelChart, waterLevelData);
  updateChart(flowRateChart, flowRateData);
  updateChart(pHChart, pHData);
}

// Initialize Charts
const waterLevelChart = new Chart(document.getElementById("waterLevelChart").getContext("2d"), { type: "line", data: { labels, datasets: [{ label: "Tank 1", borderColor: "blue" }, { label: "Tank 2", borderColor: "green" }] } });
const flowRateChart = new Chart(document.getElementById("flowRateChart").getContext("2d"), { type: "line", data: { labels, datasets: [{ label: "Sensor 1", borderColor: "red" }, { label: "Sensor 2", borderColor: "blue" }, { label: "Sensor 3", borderColor: "yellow" }, { label: "Sensor 4", borderColor: "green" }] } });
const pHChart = new Chart(document.getElementById("pHChart").getContext("2d"), { type: "line", data: { labels, datasets: [{ label: "pH Level", borderColor: "purple" }] } });

// Poll data every 5 seconds
setInterval(fetchData, 5000);
