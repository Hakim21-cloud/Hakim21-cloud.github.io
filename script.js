document.addEventListener("DOMContentLoaded", () => {
  const waterLevelChart = setupChart("waterLevelChart", "Water Levels", ["Tank 1", "Tank 2"]);
  const flowRateChart = setupChart("flowRateChart", "Flow Rates", ["Flow 1", "Flow 2", "Flow 3", "Flow 4"]);
  const pHChart = setupChart("pHChart", "pH Levels", ["pH"]);

  const billingInfo = document.getElementById("billing-info");
  const toggleValveButton = document.getElementById("toggle-valve");

  toggleValveButton.addEventListener("click", () => {
    // Handle valve toggle request
    fetch("/api/toggle-valve", { method: "POST" })
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(err => console.error("Error toggling valve:", err));
  });

  setInterval(() => {
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        updateChart(waterLevelChart, [data.waterLevel1, data.waterLevel2]);
        updateChart(flowRateChart, [data.flowRate1, data.flowRate2, data.flowRate3, data.flowRate4]);
        updateChart(pHChart, [data.pH]);

        billingInfo.innerHTML = `
          <p>Total Water Usage: ${data.totalFlow.toFixed(2)} L</p>
          <p>Total Estimated Bill: RM ${(data.totalFlow * 0.002).toFixed(3)}</p>
        `;
      })
      .catch(err => console.error("Error fetching data:", err));
  }, 5000);
});

function setupChart(canvasId, label, datasetsLabels) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: datasetsLabels.map((label, idx) => ({
        label,
        data: [],
        borderColor: `hsl(${(idx * 360) / datasetsLabels.length}, 70%, 50%)`,
        fill: false,
      })),
    },
    options: { responsive: true, maintainAspectRatio: false },
  });
}

function updateChart(chart, data) {
  const now = new Date().toLocaleTimeString();
  chart.data.labels.push(now);
  chart.data.datasets.forEach((dataset, idx) => {
    dataset.data.push(data[idx]);
  });
  if (chart.data.labels.length > 10) chart.data.labels.shift();
  chart.update();
}
