document.addEventListener('DOMContentLoaded', () => {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            // Water Flow Sensor Chart
            const flowCtx = document.getElementById('waterFlowChart').getContext('2d');
            new Chart(flowCtx, {
                type: 'bar',
                data: {
                    labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4'],
                    datasets: [{
                        label: 'Water Flow (L/min)',
                        data: data.waterFlow,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                }
            });
            document.getElementById('waterBill').textContent = `Estimated Bill: $${data.waterBill}`;

            // Water Level Sensor Chart
            const levelCtx = document.getElementById('waterLevelChart').getContext('2d');
            new Chart(levelCtx, {
                type: 'pie',
                data: {
                    labels: ['Sensor 1', 'Sensor 2'],
                    datasets: [{
                        label: 'Water Level (%)',
                        data: data.waterLevel,
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                        borderWidth: 1
                    }]
                }
            });

            // pH Level Chart
            const phCtx = document.getElementById('pHChart').getContext('2d');
            new Chart(phCtx, {
                type: 'line',
                data: {
                    labels: ['Current'],
                    datasets: [{
                        label: 'pH Level',
                        data: data.pHLevel,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                }
            });
        });
});
