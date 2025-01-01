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
        { label: "Flow Rate", data: [], borderColor: "red" },
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

  document.getElementById("openValve").addEventListener("click", () => controlSolenoid("OPEN"));
  document.getElementById("closeValve").addEventListener("click", () => controlSolenoid("CLOSE"));

  setInterval(fetchData, 1000);
});

async function fetchData() {
  const response = await fetch("./data.json");
  const data = await response.json();

  updateChart(waterLevelChart, [data.waterLevel1, data.waterLevel2]);
  updateChart(flowRateChart, [data.totalFlow]);
  updateChart(pHChart, [data.pH]);

  document.getElementById("totalFlow").innerText = `Total Flow: ${data.totalFlow} L`;
  document.getElementById("totalBill").innerText = `Total Bill: RM ${data.totalBill.toFixed(2)}`;

  document.getElementById("solenoidState").innerText = `Solenoid State: ${data.solenoidState}`;
}

function updateChart(chart, newData) {
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets.forEach((dataset, i) => {
    dataset.data.push(newData[i]);
  });
  chart.update();
}

async function controlSolenoid(action) {
  await fetch("/api/solenoid", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
}
