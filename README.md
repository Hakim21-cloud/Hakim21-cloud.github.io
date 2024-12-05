<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Water Conservation</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <header>
        <h1>Smart Water Conservation Dashboard</h1>
        <nav>
            <ul>
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#control">Control</a></li>
                <li><a href="#settings">Settings</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="dashboard">
            <h2>Dashboard</h2>
            <div class="chart-container">
                <canvas id="waterFlowChart"></canvas>
            </div>
            <div class="chart-container">
                <canvas id="pHChart"></canvas>
            </div>
        </section>

        <section id="control">
            <h2>Control Water Valves</h2>
            <button id="openValve">Open Valve</button>
            <button id="closeValve">Close Valve</button>
        </section>

        <section id="settings">
            <h2>Settings</h2>
            <form>
                <label for="waterLevelThreshold">Water Level Threshold:</label>
                <input type="number" id="waterLevelThreshold" name="waterLevelThreshold" placeholder="Enter threshold">
                <label for="pHThreshold">pH Level Threshold:</label>
                <input type="number" id="pHThreshold" name="pHThreshold" placeholder="Enter threshold">
                <button type="submit">Save</button>
            </form>
        </section>
    </main>

    <footer>
        <p>© 2024 Smart Water Conservation</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
}
header {
    background-color: #007BFF;
    color: white;
    padding: 1rem;
    text-align: center;
}
nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
}
nav li {
    margin: 0 15px;
}
nav a {
    color: white;
    text-decoration: none;
}
section {
    padding: 20px;
    margin: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.chart-container {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
}
button {
    padding: 10px 20px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button#openValve {
    background-color: #28a745;
    color: white;
}
button#closeValve {
    background-color: #dc3545;
    color: white;
}

