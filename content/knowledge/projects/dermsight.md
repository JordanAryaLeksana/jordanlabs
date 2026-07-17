# DermSight

## Project Overview

DermSight is an AI-powered skin disease education platform that combines deep learning, modern backend services, and Retrieval-Augmented Generation (RAG) to deliver educational information about skin diseases. The project is designed as an end-to-end AI application, demonstrating the integration of computer vision, API development, large language models, and user-facing interfaces.

## Objectives

- Classify skin diseases from uploaded images.
- Provide confidence scores for predictions.
- Retrieve medically curated educational information.
- Generate natural-language recommendations using an LLM.
- Expose functionality through REST APIs and a web interface.

## High-Level Architecture

User → Web Interface → FastAPI Backend → Image Preprocessing → EfficientNet Classification → Prediction Result → RAG Retriever → LLM → Final Educational Response

## Main Components

### API Layer
The `api/` directory contains the FastAPI application, routers, dependency management, and inference endpoints. It exposes prediction and recommendation services while separating routing from business logic.

### Machine Learning
The `src/` directory contains the training pipeline, datasets, scripts, model definitions, experiment outputs, and utilities required to train and evaluate the EfficientNet-based classifier.

### LLM Module
The `llm/` directory implements Retrieval-Augmented Generation. It contains prompt templates, an Ollama client, a retriever that searches curated medical knowledge, and the knowledge base used to enrich responses.

### Web Interface
The `web/` directory provides the Streamlit application that allows users to upload skin images, view predictions, and receive AI-generated educational recommendations.

### Testing
The `tests/` directory contains validation and testing code to ensure prediction, API, and retrieval components function correctly.

### Documentation
The `docs/` directory stores documentation assets and supporting materials.

## AI Pipeline

1. User uploads an image.
2. Image preprocessing prepares it for inference.
3. EfficientNet predicts the most probable skin disease.
4. Prediction confidence is computed.
5. The retriever searches the curated knowledge base for relevant information.
6. The retrieved context is inserted into a prompt.
7. Ollama generates a natural-language explanation and recommendations.
8. The combined prediction and explanation are returned to the user.

## Technologies

- TensorFlow / Keras
- EfficientNet
- FastAPI
- Streamlit
- Ollama
- Retrieval-Augmented Generation (RAG)
- Python
- Pandas
- NumPy
- OpenCV
- Pillow

## Engineering Principles

The project emphasizes modularity, maintainability, separation of concerns, reproducibility, and clear boundaries between machine learning, API services, user interface, and LLM components. It is designed so that individual modules can evolve independently while maintaining a consistent inference pipeline.

## Purpose

DermSight demonstrates practical AI engineering by integrating computer vision, backend development, and generative AI into a single production-oriented educational application. Rather than acting as a standalone classifier, it serves as an intelligent assistant capable of explaining predictions using curated domain knowledge.
