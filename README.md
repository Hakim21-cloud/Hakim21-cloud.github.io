# ESP32 Smart Water Conservation Dashboard

This project provides a real-time monitoring dashboard for a water conservation system powered by ESP32.

## Features
1. **Live Graphs**:
   - Water Flow Sensors (4 sensors)
   - Water Levels (2 tanks)
   - pH Level
2. **Percentage Calculations**:
   - Flow rate distribution per sensor
   - Tank water levels

## Setup
1. **ESP32 Data Integration**:
   - ESP32 should send data to a backend endpoint in JSON format.
   - Example: `https://hakim21-cloud.github.io/esp32/esp32_data.json`

2. **Run Locally**:
   - Clone the repository:
     ```bash
     git clone https://github.com/Hakim21-cloud/Hakim21-cloud.github.io.git
     ```
   - Open `index.html` in any browser.

3. **Live Deployment**:
   - Deploy this folder to GitHub Pages.

## Data Format
The ESP32 should send data in the following JSON format:
```json
{
  "flow1": 10.5,
  "flow2": 8.2,
  "flow3": 6.1,
  "flow4": 5.0,
  "level1": 75,
  "level2": 60,
  "pH": 7.5
}
