// Set up chart data
let waterLevelChart, flowRateChart, pHChart;

document.addEventListener("DOMContentLoaded", () => {
  const ctx1 = document.getElementById("waterLevelChart").getContext("2d");
  waterLevelChart = new Chart(ctx1, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Tank 1 Water Level (%)",
          data: [],
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Tank 2 Water Level (%)",
          data: [],
          borderColor: "green",
          fill: false,
        },
      ],
    },
  });

  const ctx2 = document.getElementById("flowRateChart").getContext("2d");
  flowRateChart = new Chart(ctx2, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        { label: "Flow Sensor 1", data: [], borderColor: "red" },
        { label: "Flow Sensor 2", data: [], borderColor: "blue" },
        { label: "Flow Sensor 3", data: [], borderColor: "yellow" },
        { label: "Flow Sensor 4", data: [], borderColor: "green" },
      ],
    },
  });

  const ctx3 = document.getElementById("pHChart").getContext("2d");
  pHChart = new Chart(ctx3, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        { label: "pH Level", data: [], borderColor: "purple", fill: false },
      ],
    },
  });

  // Poll data every 5 seconds
  setInterval(fetchData, 5000);
});

async function fetchData() {
  const response = await fetch("./data.json");
  const data = await response.json();

  // Update water levels
  updateChart(waterLevelChart, [data.waterLevel1, data.waterLevel2]);

  // Update flow rates
  updateChart(flowRateChart, [
    data.flowRate1,
    data.flowRate2,
    data.flowRate3,
    data.flowRate4,
  ]);

  // Update pH
  updateChart(pHChart, [data.pH]);

  // Update billing
  document.getElementById("billing").innerText = `Total Flow: ${data.totalFlow}L, Total Bill: RM${(
    data.totalFlow * 0.002
  ).toFixed(2)}`;
}

function updateChart(chart, newData) {
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets.forEach((dataset, i) => {
    dataset.data.push(newData[i]);
  });
  chart.update();
}
