from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os

app = FastAPI(title="AirbnbAI Price Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models if they exist
model_path = 'models/xgboost_model.pkl'
scaler_path = 'models/scaler.pkl'
encoders_path = 'models/encoders.pkl'

model = None
scaler = None
encoders = None

if os.path.exists(model_path) and os.path.exists(scaler_path) and os.path.exists(encoders_path):
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    encoders = joblib.load(encoders_path)

@app.get("/")
def read_root():
    return {"message": "Welcome to the AirbnbAI ML Service"}

class PredictionRequest(BaseModel):
    latitude: float
    longitude: float
    city: str
    room_type: str
    property_type: str
    bedrooms: int
    bathrooms: float
    accommodates: int

@app.post("/predict")
def predict_price(request: PredictionRequest):
    global model, scaler, encoders
    if not model or not scaler or not encoders:
        if os.path.exists(model_path) and os.path.exists(scaler_path) and os.path.exists(encoders_path):
            model = joblib.load(model_path)
            scaler = joblib.load(scaler_path)
            encoders = joblib.load(encoders_path)
        else:
            return {"error": "Model not trained yet."}
    
    try:
        # Prepare input data
        data = {
            'latitude': [request.latitude],
            'longitude': [request.longitude],
            'city': [request.city],
            'room_type': [request.room_type],
            'property_type': [request.property_type],
            'bedrooms': [request.bedrooms],
            'bathrooms': [request.bathrooms],
            'accommodates': [request.accommodates],
        }
        df = pd.DataFrame(data)
        
        # Encode categorical variables
        for col in ['city', 'room_type', 'property_type']:
            if df[col][0] in encoders[col].classes_:
                df[col] = encoders[col].transform(df[col])
            else:
                # Handle unknown classes by assigning a default or closest (simplification)
                df[col] = 0
                
        # Scale
        X_scaled = scaler.transform(df)
        
        # Predict
        predicted_price = model.predict(X_scaled)[0]
        
        return {"predicted_price": float(predicted_price), "currency": "USD"}
    except Exception as e:
        return {"error": str(e)}
