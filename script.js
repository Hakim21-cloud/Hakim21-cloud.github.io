// Sample data simulation
const data = {
    flow: [10, 20, 15, 25],
    level: [60, 70],
    pH: [7.2, 7.4, 6.8, 7.1],
    bill: 250.75 // Example water bill
};

// Utility to create charts
function createChart(ctxId, label, data, color) {
    const ctx = document.getElementById(ctxId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map((_, i) => `Data ${i + 1}`),
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                borderWidth: 2,
                fill: false
            }]
        }
    });
}

// Display graphs and details
document.addEventListener("DOMContentLoaded", () => {
    // Water Flow Chart
    createChart("flowChart", "Water Flow (L/min)", data.flow, "blue");
    const totalFlow = data.flow.reduce((sum, value) => sum + value, 0);
    const flowPercentage = (totalFlow / (data.flow.length * 30)) * 100; // Example calculation
    document.getElementById("flowDetails").textContent = `Total Flow: ${totalFlow} L, Percentage: ${flowPercentage.toFixed(1)}%, Estimated Bill: $${data.bill.toFixed(2)}`;

    // Water Level Chart
    createChart("levelChart", "Water Level (%)", data.level, "green");
    const levelAverage = (data.level.reduce((sum, value) => sum + value, 0) / data.level.length).toFixed(1);
    document.getElementById("levelDetails").textContent = `Average Level: ${levelAverage}%.`;

    // pH Level Chart
    createChart("phChart", "pH Levels", data.pH, "orange");
});
