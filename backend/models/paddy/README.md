# Paddy / Rice Model Registry Specification

## Overview
This directory is reserved for the future Paddy / Rice (*Oryza sativa*) phenology and developmental stage prediction model.

## Status
* **Model Status**: Not yet trained.
* **Inference Behavior**: When a user selects Paddy / Rice, the backend returns:
  `"A trained model for this crop is not yet available."`
* **Real Predictions Policy**: No mock, simulated, or pseudo-random values are generated.

## Requirements to Enable Real Paddy Predictions

### 1. Training Dataset Requirements
A dedicated phenotypic and agronomic dataset is required, containing:
* **Target Phenological Variable**:
  * Days to 50% Heading / Days to Flowering / Days to Physiological Maturity (measured in days after transplanting or sowing).
* **Genotypic / Germplasm Features**:
  * Cultivar / Accession designation (e.g., IRRI accessions, indica vs japonica sub-species).
  * Pedigree line / ecotype classification (aus, indica, aromatic, japonica).
* **Phenotypic & Agronomic Measurements**:
  * Plant canopy height (cm).
  * Effective tiller number / panicles per hill.
  * Panicle length (cm) and spikelet number per panicle.
  * Grain yield (t/ha) and 1000-grain weight (g).
  * Crude protein content (%).
* **Environmental & Trial Features**:
  * Trial environment / seasonal year (Kharif / Rabi or Wet / Dry season).
  * Photoperiod sensitivity and thermal unit accumulation (base temperature $T_{base} \approx 10.0^\circ\text{C}$).
  * Water regime (lowland flooded / upland rainfed).
  * Experimental research station coordinates.

### 2. Model Artifacts Needed
When the dataset is assembled:
1. `xgboost_agronomy_model.pkl`: Model trained with `XGBRegressor`.
2. `scaler.pkl`: `ScalerBundle` fitted on the paddy training features and target.
3. `feature_columns.json`: List of all one-hot encoded and numerical features in exact alignment order.

Once these files are placed in this directory, the `ModelRegistry` in `backend/main.py` will automatically detect and load them.
