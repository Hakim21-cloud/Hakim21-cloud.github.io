// Initialize charts
let waterLevelChart, flowRateChart, pHChart;

document.addEventListener("DOMContentLoaded", () => {
  const ctx1 = document.getElementById("waterLevelChart").getContext("2d");
  const ctx2 = document.getElementById("flowRateChart").getContext("2d");
  const ctx3 = document.getElementById("pHChart").getContext("2d");

  // Water Level Chart
  waterLevelChart = new Chart(ctx1, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        { label: "Tank 1", data: [], borderColor: "blue", fill: false },
        { label: "Tank 2", data: [], borderColor: "green", fill: false },
      ],
    },
  });

  // Flow Rate Chart
  flowRateChart = new Chart(ctx2, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        { label: "Bathroom 1", data: [], borderColor: "red", fill: false },
        { label: "Bathroom 2", data: [], borderColor: "orange", fill: false },
        { label: "Bathroom 3", data: [], borderColor: "yellow", fill: false },
        { label: "Car Wash", data: [], borderColor: "purple", fill: false },
      ],
    },
  });

  // pH Level Chart
  pHChart = new Chart(ctx3, {
    type: "line",
    data: {
      labels: [],
      datasets: [{ label: "pH Level", data: [], borderColor: "violet", fill: false }],
    },
  });

  // Fetch and update data every 5 seconds
  setInterval(fetchAndUpdateData, 5000);
});

// Fetch data from backend or Ubidots
async function fetchAndUpdateData() {
  try {
    const response = await fetch("https://your-dynamic-server/api/data"); // Replace with backend URL
    const data = await response.json();

    // Update water levels
    updateChart(waterLevelChart, [data.waterLevel1, data.waterLevel2]);

    // Update flow rates
    updateChart(flowRateChart, [data.flowRate1, data.flowRate2, data.flowRate3, data.flowRate4]);

    // Update pH levels
    updateChart(pHChart, [data.pH]);

    // Update total water used and bill
    document.getElementById("totalWaterUsed").textContent = data.totalFlow.toFixed(2);
    document.getElementById("totalBill").textContent = (data.totalFlow * 0.002).toFixed(2);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Update chart data
function updateChart(chart, newData) {
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets.forEach((dataset, index) => {
    dataset.data.push(newData[index]);
  });
  chart.update();
}
