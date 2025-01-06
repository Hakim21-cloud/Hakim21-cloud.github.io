# Smart Water Conservation System

A complete system to monitor and manage water conservation with real-time updates using ESP32, Blynk, and a GitHub-hosted dashboard.

## Features
- **ESP32 Firmware**:
  - Sends real-time water levels, flow rates, pH, and billing data.
  - Connects to Blynk Legacy for remote monitoring.
  - Transmits live data to a backend server.

- **Backend API**:
  - Built with Flask to handle ESP32 data.
  - Serves data in JSON format for the GitHub Pages frontend.

- **GitHub Pages Dashboard**:
  - Displays live data with interactive graphs using Chart.js.
  - Real-time updates for water levels, flow rates, pH, and total billing.

## Folder Structure
