// Fetch simulated data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Water Flow Chart
        const waterFlowCtx = document.getElementById('waterFlowChart').getContext('2d');
        new Chart(waterFlowCtx, {
            type: 'line',
            data: {
                labels: Array.from({ length: data.waterFlow.length }, (_, i) => `Day ${i + 1}`),
                datasets: [{
                    label: 'Water Flow (L/min)',
                    data: data.waterFlow,
                    borderColor: 'blue',
                    borderWidth: 2,
                    fill: false
                }]
            }
        });
        document.getElementById('waterBill').textContent = data.waterBill.toFixed(2);
        const avgWaterFlow = (data.waterFlow.reduce((a, b) => a + b, 0) / data.waterFlow.length).toFixed(2);
        document.getElementById('waterFlowPercentage').textContent = avgWaterFlow;

        // Water Level Chart
        const waterLevelCtx = document.getElementById('waterLevelChart').getContext('2d');
        new Chart(waterLevelCtx, {
            type: 'bar',
            data: {
                labels: ['Sensor 1', 'Sensor 2'],
                datasets: [{
                    label: 'Water Level (%)',
                    data: data.waterLevel,
                    backgroundColor: ['#007BFF', '#00C853']
                }]
            }
        });
        const avgWaterLevel = (data.waterLevel.reduce((a, b) => a + b, 0) / data.waterLevel.length).toFixed(2);
        document.getElementById('waterLevelPercentage').textContent = avgWaterLevel;

        // pH Level Chart
        const phLevelCtx = document.getElementById('phLevelChart').getContext('2d');
        new Chart(phLevelCtx, {
            type: 'line',
            data: {
                labels: Array.from({ length: data.pHLevel.length }, (_, i) => `Sample ${i + 1}`),
                datasets: [{
                    label: 'pH Level',
                    data: data.pHLevel,
                    borderColor: 'green',
                    borderWidth: 2,
                    fill: false
                }]
            }
        });
    });
