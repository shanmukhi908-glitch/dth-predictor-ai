"""
Automated Test Script for Days to Heading (DTH) FastAPI Backend.
Verifies all endpoints:
- GET /api/health
- GET /api/options/name, taxa, family, location
- POST /api/predict with real agronomic sample
- Validation error handling on malformed inputs
- Analytical & explainability endpoints
"""

import sys
import os
import json

# Ensure project root & backend are in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from starlette.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    print("\n[TEST 1] Testing GET /api/health ...")
    response = client.get("/api/health")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert data["status"] == "healthy", f"Expected status healthy, got {data['status']}"
    assert data["model_loaded"] is True, "Expected model_loaded to be True"
    assert data["scaler_loaded"] is True, "Expected scaler_loaded to be True"
    assert data["total_features"] == 1328, f"Expected 1328 features, got {data['total_features']}"
    print(f" PASS: System healthy with {data['total_features']} features and {data['total_dataset_rows']} dataset records.")

def test_options():
    print("\n[TEST 2] Testing Categorical Options Endpoints ...")
    for field in ["name", "taxa", "family", "location"]:
        response = client.get(f"/api/options/{field}")
        assert response.status_code == 200, f"Failed for {field}: {response.status_code}"
        items = response.json()
        assert isinstance(items, list), f"Expected list for {field}"
        assert len(items) > 0, f"Expected non-empty list for {field}"
        print(f" PASS: /api/options/{field} returned {len(items)} items. Example: {items[0]}")

def test_predict_sample():
    print("\n[TEST 3] Testing POST /api/predict with Real Pheno.csv Sample #0 ...")
    payload = {
        "Name": "DHARWAR_57",
        "Taxa": "EA_51",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2014,
        "Yield": 2.21,
        "TSTWT": 58.60,
        "Protein": 13.45,
        "Height": 32.83
    }
    response = client.post("/api/predict", json=payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    result = response.json()
    
    # Required keys verification
    required_keys = ["prediction", "model", "r2", "rmse", "mae"]
    for key in required_keys:
        assert key in result, f"Missing required key '{key}' in prediction response"

    assert result["model"] == "XGBoost Regressor"
    assert result["r2"] == 0.9076
    assert result["rmse"] == 0.0736
    assert result["mae"] == 0.0488
    assert isinstance(result["prediction"], float)
    
    # Expected DTH around ~176.99
    print(f" PASS: POST /api/predict succeeded!")
    print(f"       Prediction: {result['prediction']} Days to Heading")
    print(f"       Model: {result['model']}")
    print(f"       R2 Score: {result['r2']} | RMSE: {result['rmse']} | MAE: {result['mae']}")
    print(f"       Maturity Category: {result.get('maturityCategory')}")

def test_validation_errors():
    print("\n[TEST 4] Testing Input Validation & Error Handling ...")
    
    # Negative yield test
    invalid_payload_1 = {
        "Name": "DHARWAR_57",
        "Taxa": "EA_51",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2014,
        "Yield": -5.0,  # Invalid
        "TSTWT": 58.60,
        "Protein": 13.45,
        "Height": 32.83
    }
    res1 = client.post("/api/predict", json=invalid_payload_1)
    assert res1.status_code == 422, f"Expected 422 for negative yield, got {res1.status_code}"
    print(" PASS: Correctly rejected negative Yield with HTTP 422.")

    # Empty name test
    invalid_payload_2 = {
        "Name": "   ",  # Invalid empty
        "Taxa": "EA_51",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2014,
        "Yield": 2.21,
        "TSTWT": 58.60,
        "Protein": 13.45,
        "Height": 32.83
    }
    res2 = client.post("/api/predict", json=invalid_payload_2)
    assert res2.status_code == 422, f"Expected 422 for empty Name, got {res2.status_code}"
    print(" PASS: Correctly rejected blank Name string with HTTP 422.")

    # Unseen category in dataset mode rejected with HTTP 400
    unseen_in_dataset_mode = {
        "Name": "UNKNOWN_CULTIVAR_XYZ",
        "Taxa": "EA_51",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2014,
        "Yield": 2.21,
        "TSTWT": 58.60,
        "Protein": 13.45,
        "Height": 32.83,
        "mode": "dataset"
    }
    res3 = client.post("/api/predict", json=unseen_in_dataset_mode)
    assert res3.status_code == 400, f"Expected 400 for unseen category in dataset mode, got {res3.status_code}"
    print(" PASS: Correctly rejected unseen category in dataset mode with HTTP 400.")

    # Unseen category in external mode with strict validation (allow_unseen_categories=False) rejected with HTTP 422
    unseen_strict_mode = {
        "Name": "UNKNOWN_CULTIVAR_XYZ",
        "Taxa": "EA_51",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2014,
        "Yield": 2.21,
        "TSTWT": 58.60,
        "Protein": 13.45,
        "Height": 32.83,
        "mode": "external",
        "allow_unseen_categories": False
    }
    res4 = client.post("/api/predict", json=unseen_strict_mode)
    assert res4.status_code == 422, f"Expected 422 for strict unseen category, got {res4.status_code}"
    print(" PASS: Correctly rejected unseen category with strict mode flag with HTTP 422.")

def test_external_mode_predictions():
    print("\n[TEST 5] Testing External Data Mode Predictions ...")

    # 1. External mode with recognized genotype + custom external field phenotypes
    payload_ext_known = {
        "Name": "DHARWAR_57",
        "Taxa": "EA_51",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2024,
        "Yield": 3.40,
        "TSTWT": 61.50,
        "Protein": 14.80,
        "Height": 41.20,
        "mode": "external",
        "allow_unseen_categories": True
    }
    res1 = client.post("/api/predict", json=payload_ext_known)
    assert res1.status_code == 200, f"Expected 200, got {res1.status_code}: {res1.text}"
    data1 = res1.json()
    assert data1["isExternalData"] is True
    assert data1["mode"] == "external"
    assert len(data1["unseenCategories"]) == 0
    assert data1["confidence"] == "Very High"
    print(f" PASS: External mode with known genotype succeeded: {data1['prediction']} Days (Confidence: {data1['confidence']})")

    # 2. External mode with novel out-of-sample germplasm line
    payload_ext_unseen = {
        "Name": "KAVERI_GOLD_01",
        "Taxa": "TAXA_EXT_99",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2024,
        "Yield": 2.95,
        "TSTWT": 59.20,
        "Protein": 13.10,
        "Height": 36.50,
        "mode": "external",
        "allow_unseen_categories": True
    }
    res2 = client.post("/api/predict", json=payload_ext_unseen)
    assert res2.status_code == 200, f"Expected 200, got {res2.status_code}: {res2.text}"
    data2 = res2.json()
    assert data2["isExternalData"] is True
    assert len(data2["unseenCategories"]) > 0
    assert data2["warning"] is not None
    assert data2["confidence"] == "Moderate"
    print(f" PASS: External mode with novel germplasm succeeded with out-of-sample warning: {data2['prediction']} Days (Confidence: {data2['confidence']})")

def test_analytics_and_shap():
    print("\n[TEST 6] Testing Analytics and SHAP Explainability Endpoints ...")
    
    # Actual vs Predicted
    res_analytics = client.get("/api/analytics/actual-vs-predicted")
    assert res_analytics.status_code == 200
    points = res_analytics.json()
    assert isinstance(points, list) and len(points) > 0
    print(f" PASS: /api/analytics/actual-vs-predicted returned {len(points)} evaluation points.")

    # SHAP Global
    res_shap = client.get("/api/shap/global")
    assert res_shap.status_code == 200
    shap_items = res_shap.json()
    assert isinstance(shap_items, list) and len(shap_items) > 0
    print(f" PASS: /api/shap/global returned {len(shap_items)} feature importances.")

    # SHAP Local
    payload = {
        "Name": "DHARWAR_59",
        "Taxa": "EA_53",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2014,
        "Yield": 2.41,
        "TSTWT": 56.57,
        "Protein": 12.64,
        "Height": 35.09
    }
    res_shap_local = client.post("/api/shap/prediction", json=payload)
    assert res_shap_local.status_code == 200
    local_impacts = res_shap_local.json()
    assert isinstance(local_impacts, list) and len(local_impacts) > 0
    print(f" PASS: /api/shap/prediction returned {len(local_impacts)} local feature impacts.")

def test_crop_selection_and_scaler_compatibility():
    print("\n[TEST 7] Testing Crop Selection & Scaler Compatibility (No .clip() on Scaler) ...")
    
    # 1. Supported crop 'Wheat'
    payload_wheat = {
        "Crop": "Wheat",
        "Name": "DHARWAR_57",
        "Taxa": "EA_51",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2014,
        "Yield": 2.21,
        "TSTWT": 58.60,
        "Protein": 13.45,
        "Height": 32.83,
        "mode": "dataset"
    }
    res_wheat = client.post("/api/predict", json=payload_wheat)
    assert res_wheat.status_code == 200, f"Expected 200 for Wheat, got {res_wheat.status_code}: {res_wheat.text}"
    data_wheat = res_wheat.json()
    assert data_wheat["prediction"] > 0
    assert data_wheat["crop"] == "Wheat"
    print(f" PASS: Supported crop 'Wheat' predicted successfully: {data_wheat['prediction']} Days")

    # 2. Unsupported crop 'Paddy'
    payload_paddy = {
        "Crop": "Paddy",
        "Name": "DHARWAR_57",
        "Taxa": "EA_51",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2014,
        "Yield": 2.21,
        "TSTWT": 58.60,
        "Protein": 13.45,
        "Height": 32.83
    }
    res_paddy = client.post("/api/predict", json=payload_paddy)
    assert res_paddy.status_code == 400, f"Expected 400 for Paddy, got {res_paddy.status_code}"
    expected_msg = "This crop is not supported by the current trained model. Please select a crop available in the training dataset."
    assert expected_msg in res_paddy.json()["detail"]
    print(" PASS: Correctly rejected unsupported crop 'Paddy' with exact specified message.")

    # 3. Unsupported crop 'Cotton'
    payload_cotton = {
        "Crop": "Cotton",
        "Name": "DHARWAR_57",
        "Taxa": "EA_51",
        "Family": "DHARWAR",
        "Location": "Spillman",
        "Env": 2014,
        "Yield": 2.21,
        "TSTWT": 58.60,
        "Protein": 13.45,
        "Height": 32.83
    }
    res_cotton = client.post("/api/predict", json=payload_cotton)
    assert res_cotton.status_code == 400
    assert expected_msg in res_cotton.json()["detail"]
    print(" PASS: Correctly rejected unsupported crop 'Cotton' with exact specified message.")

    # 4. GET /api/options/crops
    res_crops = client.get("/api/options/crops")
    assert res_crops.status_code == 200
    crop_info = res_crops.json()
    assert "Wheat" in crop_info["supported_crops"]
    print(f" PASS: /api/options/crops returned supported crop: {crop_info['supported_crops']}")

if __name__ == "__main__":
    print("==================================================")
    print("  DAYS TO HEADING (DTH) API AUTOMATED TEST SUITE  ")
    print("==================================================")
    try:
        test_health()
        test_options()
        test_predict_sample()
        test_validation_errors()
        test_external_mode_predictions()
        test_analytics_and_shap()
        test_crop_selection_and_scaler_compatibility()
        print("\n==================================================")
        print("  ALL TESTS PASSED SUCCESSFULLY! (7/7)             ")
        print("==================================================")
    except AssertionError as ae:
        print(f"\nAssertion Error: {ae}")
        sys.exit(1)
    except Exception as e:
        print(f"\nUnexpected Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
