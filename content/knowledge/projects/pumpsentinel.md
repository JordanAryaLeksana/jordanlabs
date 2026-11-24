# PumpSentinel

## Project overview

PumpSentinel is Jordan Arya Leksana's name for the anomaly-detection work he did during his internship at PT Pertamina EP Cepu (Jambaran Tiung Biru gas plant). The official internship ran from January to February 2025, and Jordan continued the project until May 2025. In 2023 a mechanical-seal failure on one of the plant's solvent pumps caused a USD 393K plant shutdown, and the plant had no early warning for pump anomalies. Jordan's anomaly classifier and rule engine are the next-phase features of LEADS (Leading Equipment Anomaly Detection System), the plant's system described in SPE-224966-MS. Source code is not public because of corporate confidentiality.

## Approach

- Anomaly detection: an LSTM Autoencoder trained on about one year of 15-minute operating data (pressures, flow and motor current) from six solvent pumps flags an anomaly when the reconstruction error exceeds a per-pump threshold.
- Anomaly classification: a decision tree labels each anomaly as start-up, nomination change, process change or equipment fault, using categories agreed with the field operations team.
- Rule-based checks: a Python rule engine compares pump operation with the manufacturer's head, NPSHr and power-versus-flow curves (NumPy polynomial fits) and is designed to raise email alerts and maintenance work orders.

## Results

- 5,800+ anomalies flagged across six pumps; the operations team verified that the detections matched actual plant events.
- Decision tree with undersampling: 73% F1, versus 12% for logistic regression.
- LEADS, which these features extend, is estimated to save up to USD 476K (SPE-224966-MS). Jordan contributed to the methodology and manuscript; he is not a listed author.

## Technologies

Python, TensorFlow, LSTM Autoencoder, decision tree classification, NumPy, Pandas and a Python rule engine.
