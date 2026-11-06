# TETA — Teman Tanah (smart farming)

## Project overview

TETA (Teman Tanah) is a group smart-farming project for rice farmers in Tuban, East Java (Gapoktan Manunggal Rejeki), combining real-time soil monitoring with an automated bird-pest protection system. Jordan Arya Leksana was the Software Development Lead and IoT integration lead (June – November 2025) at the ECS laboratory, ITS. Bird attacks can cause yield losses of up to 50%; TETA helps farmers make data-driven fertilizer decisions and reduces manual field guarding.

## Architecture

- ESP32 sensor nodes send soil readings (pH, NPK, EC, temperature, humidity) over LoRa and MQTT.
- Raspberry Pi edge devices run 24/7 YOLOv5 computer-vision bird-pest deterrence.
- A React Native (Expo) mobile app connects to the IoT system via MQTT so farmers can watch soil conditions and device connectivity for five field nodes.
- Jordan designed the end-to-end architecture: mobile app, backend server, ESP32–LoRa–MQTT communication and Raspberry Pi edge devices.

## Results

- Shipped to a 1-hectare rice field in Tuban with 5 IoT nodes.
- The user guide, "TETA (Teman Tanah): Buku Panduan Penggunaan Alat", is registered as Indonesian copyright No. 001036674 (2025), so non-technical farmers can run the system on their own.
- Co-authored community-service publication: IoT-Based Soil Quality and Pest Monitoring for Sustainable Farming (BIMA/ITS, 2025).
