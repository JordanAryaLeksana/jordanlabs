# EMQNET

## Project Overview

EMQNET (Towards Multi-Task Deep Learning for Earthquake Precursors) is a multi-task deep learning pipeline developed as an undergraduate thesis project at Institut Teknologi Sepuluh Nopember. It uses earthquake precursor data from BMKG (Indonesia's Meteorological, Climatological, and Geophysical Agency) to jointly predict multiple related signals from a single model.

## Timeline

December 2025 – Present (ongoing).

## Architecture

- A three-head classification model predicting: (1) precursor detection, (2) earthquake magnitude, and (3) azimuth direction, from a shared backbone.
- The backbone is implemented from scratch based on Deep Residual Learning (ResNet-style architecture), rather than relying on a pre-built library implementation.

## Current Work

- Improving multi-class accuracy across the three prediction heads.
- Developing a production-ready interface for the model.

## Technologies

Python, PyTorch, Pandas, NumPy, Django.

## Impact

Contributes to the application of deep learning in earthquake precursor analysis as part of an undergraduate thesis project.
