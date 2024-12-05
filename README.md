<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Water Conservation</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='styles.css') }}">
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
    </main>

    <footer>
        <p>© 2024 Smart Water Conservation</p>
    </footer>

    <script src="{{ url_for('static', filename='script.js') }}"></script>
</body>
</html>

