# Cotton Model Registry Specification

## Overview
This directory is reserved for the future Cotton (*Gossypium hirsutum*) phenology and developmental stage prediction model.

## Status
* **Model Status**: Not yet trained.
* **Inference Behavior**: When a user selects Cotton, the backend returns:
  `"A trained model for this crop is not yet available."`
* **Real Predictions Policy**: No mock, simulated, or pseudo-random values are generated.

## Requirements to Enable Real Cotton Predictions

### 1. Training Dataset Requirements
A dedicated phenotypic and agronomic dataset is required, containing:
* **Target Phenological Variable**:
  * Days to First Flowering / Days to First Square / Days to Boll Opening (measured in days after planting/sowing).
* **Genotypic / Germplasm Features**:
  * Cultivar / Accession designation (e.g., G. hirsutum upland cotton varieties).
  * Taxonomy / Breeding pedigree lineage.
* **Phenotypic & Agronomic Measurements**:
  * Plant canopy height (cm/inches).
  * Sympodial (fruiting) branch count.
  * Monopodial (vegetative) branch count.
  * Boll weight / lint yield (t/ha or kg/ha).
  * Fiber micronaire, staple length, and strength (HVI).
* **Environmental & Trial Features**:
  * Trial environment / year.
  * Growing Degree Days (GDD) accumulated with base temperature $T_{base} \approx 15.5^\circ\text{C}$.
  * Irrigation / rainfed management regime.
  * Soil type / regional experimental station.

### 2. Model Artifacts Needed
When the dataset is assembled:
1. `xgboost_agronomy_model.pkl`: Model trained with `XGBRegressor`.
2. `scaler.pkl`: `ScalerBundle` fitted on the cotton training features and target.
3. `feature_columns.json`: List of all one-hot encoded and numerical features in exact alignment order.

Once these files are placed in this directory, the `ModelRegistry` in `backend/main.py` will automatically detect and load them.
