# SmartLender : https://smartlender-phi.vercel.app/

SmartLender is an end-to-end machine learning project focused on loan approval prediction. The project covers data collection, exploratory analysis, data preprocessing, model training, and deployment of a prediction-based web application.

## Project Overview

The goal of SmartLender is to build a practical and explainable loan prediction system that can help evaluate loan applications more efficiently than traditional manual screening.

## Project Structure

- 01_DOCUMENTS/ — project notes, presentations, reports, and documentation
- 02_DEMO VIDEO/ — folder containing the project demonstration video
- DATASET/ — raw loan datasets used for training and analysis
- FLASK/ — Flask application, templates, and prediction logic
- Training/ — notebooks and Python scripts for data preprocessing and modeling
- _deliverables/ — generated reports, trained model artifacts, CSV files, and visualizations
- smartlender-main/ — frontend website project for the public-facing experience

## Main Features

- Data exploration and visualization
- Data cleaning and preprocessing
- Class balancing and scaling
- Training and comparison of multiple machine learning models
- Deployment-ready prediction web app

## Tech Stack

- Python
- Flask
- scikit-learn
- pandas / numpy
- matplotlib / seaborn
- Random Forest
- Vite + React + TypeScript

## How to Run Locally

### 1. Frontend website

```bash
cd smartlender-main
npm install
npm run dev
```

### 2. Flask prediction API

```bash
cd FLASK
python app.py
```

## Model and Artifacts

The project uses:
- trained Random Forest model
- preprocessing scaler
- balanced train/test datasets
- generated evaluation plots and reports

## Deployment Notes

The frontend app is built with Vite and is compatible with Vercel deployment. The Flask prediction service is intended for local use or a hosting platform such as Render or Railway.

## Project Status

The SmartLender project is now structured as a complete machine learning and deployment workflow covering:
- data preparation
- model training
- evaluation
- application integration
- documentation and deliverables

## License

This project is intended for educational and demonstration purposes.
