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

def test_analytics_and_shap():
    print("\n[TEST 5] Testing Analytics and SHAP Explainability Endpoints ...")
    
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

if __name__ == "__main__":
    print("==================================================")
    print("  DAYS TO HEADING (DTH) API AUTOMATED TEST SUITE  ")
    print("==================================================")
    try:
        test_health()
        test_options()
        test_predict_sample()
        test_validation_errors()
        test_analytics_and_shap()
        print("\n==================================================")
        print("  ALL TESTS PASSED SUCCESSFULLY! (5/5)             ")
        print("==================================================")
    except AssertionError as ae:
        print(f"\nAssertion Error: {ae}")
        sys.exit(1)
    except Exception as e:
        print(f"\nUnexpected Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
