# PumpSentinel

## Project overview

PumpSentinel is the anomaly-detection and early-warning system Jordan Arya Leksana built during his AI Engineer internship at PT Pertamina EP Cepu (January – May 2025, Cepu, Central Java). It targets frequent mechanical-seal leaks in the plant's solvent pumps (including pumps 9027 A/B) that disrupted production. The research was presented as SPE-224966-MS, LEADS: Leading Equipment Anomaly Detection System. Source code is not public because of corporate confidentiality.

## Approach

Three subsystems are connected to the plant's Distributed Control System (DCS):

- Anomaly detection: an LSTM Autoencoder trained on about one year of multivariate sensor data (pressure, flow rate, temperature) from three solvent pumps flags anomalies when the reconstruction error (MAE) exceeds a threshold.
- Anomaly classification: a supervised model categorizes anomalies into failure types (for example seal wear or overpressure) using historical logs.
- Rule-based expert system: pump specifications, engineering best practice and operator knowledge become rules that trigger real-time early warnings and prescriptive-maintenance actions.

## Results and impact

- 5,000+ anomaly events processed and validated with field operators.
- 85% validation accuracy for anomaly classification.
- Contributed to zero lost production hours on the monitored pump.
- Estimated potential cost savings of up to USD 476K.

## Technologies

Python, TensorFlow, LSTM Autoencoder, supervised machine learning, Pandas, a Python rule engine and DCS integration.
