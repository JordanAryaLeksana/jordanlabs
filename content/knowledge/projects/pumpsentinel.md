# PumpSentinel

## Project Overview

PumpSentinel is an industrial pump failure prediction system built during an AI Engineer internship at PT. Pertamina EP Cepu, designed to anticipate recurring leak failures in Solvent Pumps 9027 A/B that were affecting production.

## Timeline

January – April 2025.

## Approach

The system combines three complementary layers:

### Anomaly Detection

An unsupervised deep learning model (Autoencoder with an LSTM layer) detects early-stage anomalies. Anomaly scores are visualized and streamed live via the plant's DCS (Distributed Control System) dashboard.

### Classification Model

Supervised models (Random Forest, Neural Network) classify failure types (e.g., seal wear, overpressure), trained on over one year of labeled downtime logs, achieving 85% validation accuracy.

### Rule-Based AI

Domain knowledge from expert engineers is encoded into dynamic threshold rules and interlock conditions, triggering real-time alarms or recommendations when combinations of sensor inputs match known failure patterns.

## Future Direction

Planned improvements include moving toward production mode with a single unified pipeline and additional user interfaces.

## Technologies

Python, TensorFlow, Pandas, Python Rule Engine. Fully integrated with the company's Distributed Control System (DCS).

## Impact

Improved pump reliability and reduced unplanned downtime.
