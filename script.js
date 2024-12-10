async function fetchData() {
  try {
    const response = await fetch('https://hakim21-cloud.github.io/backend/database.json');
    const data = await response.json();

    updateCharts(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateCharts(data) {
  // Water Flow Chart
  const flowCtx = document.getElementById('flowChart').getContext('2d');
  new Chart(flowCtx, {
    type: 'line',
    data: {
      labels: ['Flow 1', 'Flow 2', 'Flow 3', 'Flow 4'],
      datasets: [{
        label: 'Flow Rates (L/min)',
        data: [data.flow1, data.flow2, data.flow3, data.flow4],
        borderColor: 'blue',
        fill: false
      }]
    }
  });

  // Water Level Chart
  const levelCtx = document.getElementById('levelChart').getContext('2d');
  new Chart(levelCtx, {
    type: 'bar',
    data: {
      labels: ['Tank 1', 'Tank 2'],
      datasets: [{
        label: 'Water Levels (%)',
        data: [data.level1, data.level2],
        backgroundColor: ['green', 'yellow']
      }]
    }
  });

  // pH Level Chart
  const pHCtx = document.getElementById('pHChart').getContext('2d');
  new Chart(pHCtx, {
    type: 'line',
    data: {
      labels: ['Time'],
      datasets: [{
        label: 'pH Levels',
        data: [data.pH],
        borderColor: 'red',
        fill: false
      }]
    }
  });
}

// Fetch and update data every second
setInterval(fetchData, 1000);
