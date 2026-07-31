import pandas as pd
import numpy as np
import random
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
import xgboost as xgb

def generate_synthetic_data(num_records=5000):
    np.random.seed(42)
    random.seed(42)

    cities = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney']
    room_types = ['Entire home/apt', 'Private room', 'Shared room']
    property_types = ['Apartment', 'House', 'Condominium', 'Townhouse', 'Loft']

    data = {
        'latitude': np.random.uniform(-90, 90, num_records),
        'longitude': np.random.uniform(-180, 180, num_records),
        'city': [random.choice(cities) for _ in range(num_records)],
        'room_type': [random.choice(room_types) for _ in range(num_records)],
        'property_type': [random.choice(property_types) for _ in range(num_records)],
        'bedrooms': np.random.randint(1, 6, num_records),
        'bathrooms': np.random.randint(1, 4, num_records),
        'accommodates': np.random.randint(1, 10, num_records),
    }

    df = pd.DataFrame(data)

    # Base price calculation logic
    base_price = 50
    df['price'] = (
        base_price +
        (df['bedrooms'] * 30) +
        (df['bathrooms'] * 20) +
        (df['accommodates'] * 15)
    ).astype(float)
    
    # Adjust price based on room type
    df.loc[df['room_type'] == 'Entire home/apt', 'price'] *= 1.5
    df.loc[df['room_type'] == 'Shared room', 'price'] *= 0.6
    
    # Add some noise
    df['price'] += np.random.normal(0, 20, num_records)
    df['price'] = df['price'].clip(lower=20) # Minimum price
    
    return df

def train_and_save_model(df):
    # Encoding categorical variables
    encoders = {}
    for col in ['city', 'room_type', 'property_type']:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le

    X = df.drop('price', axis=1)
    y = df['price']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    
    model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100, learning_rate=0.1)
    model.fit(X_train_scaled, y_train)

    # Save models
    os.makedirs('models', exist_ok=True)
    joblib.dump(model, 'models/xgboost_model.pkl')
    joblib.dump(scaler, 'models/scaler.pkl')
    joblib.dump(encoders, 'models/encoders.pkl')
    
    print("Model trained and saved successfully.")

if __name__ == "__main__":
    print("Generating synthetic data...")
    df = generate_synthetic_data(5000)
    print("Training model...")
    train_and_save_model(df)
