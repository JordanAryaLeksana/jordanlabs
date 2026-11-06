# EMQNET

## Project overview

EMQNET (Towards Multi-Task Deep Learning for Earthquake Precursors) is Jordan Arya Leksana's completed undergraduate thesis at Institut Teknologi Sepuluh Nopember (ITS), carried out as a Deep Learning Researcher at the ECS laboratory from December 2025 to July 2026. It is a ResNet-based PyTorch pipeline that detects earthquake precursors in geomagnetic data from BMKG stations across Indonesia, automating a manual analysis method. A first-author manuscript, "A CNN-Based Approach for Earthquake Precursor Detection Using Geomagnetic Data", is in preparation (2026).

## Data and method

- 1 Hz geomagnetic observations (H, D and Z components) from BMKG stations across Indonesia, 2018–2025, paired with an earthquake catalogue. The CV summarizes the scale as 25,000+ events from 24 stations.
- For each event the nearest stations within 500 km under quiet geomagnetic conditions are selected (top-3 nearest).
- Signals are filtered to the Pc3 band and turned into scalograms with a Continuous Wavelet Transform.
- A shared ResNet-18 encodes each station's scalogram, an inter-station attention stage combines them, and two output heads predict precursor presence and a three-class magnitude (multi-task learning).
- Predictions are interpreted with Grad-CAM.

## Results

- Jordan's CV reports 88.25% accuracy and 88.4% F1 for precursor detection.
- The thesis paper reports 88.38% precursor-detection accuracy on its test split with balanced precision and recall.
- Three-class magnitude estimation reaches 52.67% accuracy and is limited by class imbalance.

## Technologies

Python, PyTorch, Pandas, NumPy, signal processing (Pc3 filtering, Continuous Wavelet Transform), Grad-CAM.
