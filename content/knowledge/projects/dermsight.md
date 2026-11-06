# DermSight

## Project overview

DermSight is a live, mobile-first AI web application that gives early educational insight into skin conditions from a photo (https://dermsight.jordanlabs.my.id, repository https://github.com/JordanAryaLeksana/DermSight). It classifies 22 skin-condition categories with an EfficientNet-B2 model and explains the result with a local LLM grounded by RAG. It is an education tool, not a medical diagnosis. Jordan Arya Leksana built it as a self-initiated project in 2026 (role: AI/ML and full-stack engineer).

## Features

- AI skin screening: users upload or capture a skin photo and receive a predicted condition with a confidence score across 22 supported categories.
- Educational AI analysis: after the prediction, users can request a detailed explanation generated from a curated skin-knowledge base with RAG and a locally hosted LLM (Ollama).
- Aspiration form: people and communities in Indonesia's remote (3T) regions can send concerns and feedback, which are forwarded to the designated stakeholder by email.

## Architecture and tech stack

Python, TensorFlow, EfficientNet-B2, OpenCV, Flask, Gunicorn, Nginx, Ollama, RAG, Docker and GitHub Actions. The model runs CPU inference inside a Flask web application. Deployment uses Docker images and GitHub Actions to a Linux VPS.

## Privacy and production design

Images are validated before inference, processed in memory and never stored. The production app has upload limits, CSRF protection, security headers, rate limiting and health monitoring.

## What Jordan learned

Training and evaluating a deep learning model systematically, from data preparation and augmentation to transfer learning, validation, hyperparameter tuning and evaluation, and connecting model predictions with a curated knowledge base and a local LLM.
