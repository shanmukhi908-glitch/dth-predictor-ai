"""
Direct Model Loading and Environment Version Verification Test.
Prints installed versions of:
- Python
- xgboost
- scikit-learn
- joblib
Verifies that xgboost_agronomy_model.pkl loads and runs prediction without attribute errors.
"""

import sys
import os
import joblib
import numpy as np

# Add project root & backend to sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from main import ScalerBundle

def test_environment_and_model():
    print("=" * 60)
    print("  DIRECT MODEL LOADING & ENVIRONMENT COMPATIBILITY TEST")
    print("=" * 60)

    # 1. Print installed versions
    import xgboost
    import sklearn

    print(f"[*] Python Version       : {sys.version.split()[0]} ({sys.platform})")
    print(f"[*] XGBoost Version      : {xgboost.__version__}")
    print(f"[*] Scikit-Learn Version : {sklearn.__version__}")
    print(f"[*] Joblib Version       : {joblib.__version__}")
    print("-" * 60)

    # 2. Check model artifact paths (wheat subfolder or root models folder)
    wheat_model_path = os.path.join(BASE_DIR, "models", "wheat", "xgboost_agronomy_model.pkl")
    root_model_path = os.path.join(BASE_DIR, "models", "xgboost_agronomy_model.pkl")

    model_path = wheat_model_path if os.path.exists(wheat_model_path) else root_model_path
    print(f"[*] Loading model artifact from: {model_path}")
    assert os.path.exists(model_path), f"Model artifact not found at {model_path}"

    # 3. Load model
    model = joblib.load(model_path)
    print(f"[+] Successfully unpickled model object: {type(model)}")

    # 4. Check and patch feature_types attribute for cross-version safety
    if not hasattr(model, 'feature_types'):
        print("[!] Note: model object lacks 'feature_types' attribute; patching with None for cross-version safety.")
        model.feature_types = None
    else:
        print(f"[+] Model has 'feature_types': {getattr(model, 'feature_types', None)}")

    booster = model.get_booster() if hasattr(model, 'get_booster') else None
    if booster is not None:
        if not hasattr(booster, 'feature_types'):
            print("[!] Note: Booster lacks 'feature_types' attribute; patching with None.")
            booster.feature_types = None
        else:
            print(f"[+] Booster has 'feature_types': {getattr(booster, 'feature_types', None)}")

    # 5. Test direct inference with 1328 feature columns
    cols_path = os.path.join(BASE_DIR, "models", "wheat", "feature_columns.json")
    if not os.path.exists(cols_path):
        cols_path = os.path.join(BASE_DIR, "models", "feature_columns.json")
    
    import json
    with open(cols_path, "r", encoding="utf-8") as f:
        feature_cols = json.load(f)
    print(f"[+] Loaded {len(feature_cols)} feature columns from {cols_path}")

    dummy_input = np.zeros((1, len(feature_cols)), dtype=np.float64)
    print(f"[*] Executing direct model.predict() on shape {dummy_input.shape}...")

    # Predict
    raw_pred = model.predict(dummy_input)
    print(f"[+] Direct model.predict() output: {raw_pred} (type: {type(raw_pred)})")
    assert raw_pred is not None and len(raw_pred) > 0, "Prediction output was empty!"

    # 6. Load Scaler and test transform + inverse_transform
    scaler_path = os.path.join(BASE_DIR, "models", "wheat", "scaler.pkl")
    if not os.path.exists(scaler_path):
        scaler_path = os.path.join(BASE_DIR, "models", "scaler.pkl")
    scaler = joblib.load(scaler_path)
    print(f"[+] Successfully unpickled scaler from: {scaler_path}")

    # MinMaxScaler clip attribute backfill check
    if hasattr(scaler, 'feature_scaler') and scaler.feature_scaler is not None:
        if not hasattr(scaler.feature_scaler, 'clip'):
            scaler.feature_scaler.clip = False
    if hasattr(scaler, 'target_scaler') and scaler.target_scaler is not None:
        if not hasattr(scaler.target_scaler, 'clip'):
            scaler.target_scaler.clip = False

    scaled_features = scaler.transform(dummy_input)
    assert scaled_features.shape == dummy_input.shape, f"Scaled shape mismatch: {scaled_features.shape}"

    scaled_pred = model.predict(scaled_features)
    dth_days = float(scaler.inverse_transform(scaled_pred).ravel()[0])
    print(f"[+] Full pipeline test prediction: {dth_days:.2f} Days to Heading")
    assert 100.0 <= dth_days <= 250.0, f"Predicted DTH {dth_days} is outside reasonable bounds (100-250 days)"

    print("=" * 60)
    print("  MODEL LOADING & INFERENCE VERIFICATION PASSED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    try:
        test_environment_and_model()
    except Exception as e:
        print(f"\n[ERROR] Model loading test failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
