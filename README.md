# ESP32 Water Monitoring System

This project monitors water levels and flow rates using an ESP32 and displays the data on a web interface.

## Components
1. **ESP32 Code**:
   - Serves sensor data as JSON via an HTTP server.
   - Located in the `esp32/` folder.
   
2. **Web Interface**:
   - Displays real-time data from the ESP32.
   - Located in the `web/` folder.
   - Can be deployed on GitHub Pages.

3. **Optional Flask Backend**:
   - For testing or additional API processing.
   - Located in the `api/` folder.

## Setup
### ESP32
- Flash the code in `esp32/esp32_code.ino` to your ESP32.
- Connect to the same network as your web interface.

### Web Interface
- Update `js/script.js` with the ESP32's IP address.
- Open `index.html` locally or host it on GitHub Pages.

### Optional Flask Backend
- Install dependencies with `pip install -r api/requirements.txt`.
- Run `app.py` for a mock API server.
