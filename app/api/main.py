from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'random_forest_model.joblib')

try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    raise RuntimeError(f"Model di path '{MODEL_PATH}' tidak ditemukan. Pastikan file ada di direktori yang sama dengan main.py.")

app = FastAPI()


origins = [
    "http://localhost:3000", # Alamat frontend Next.js Anda
    "https://kalkulator-prediksi-panen-padi-suma.vercel.app/",
    "https://vercel.com/mamiryanpgmailcoms-projects/kalkulator-prediksi-panen-padi-sumatera/7Boo7NdQFrUoBqXvU1tLoxBjeS4S"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

PROVINSI = [
    'Bengkulu',
    'Jambi',
    'Lampung',
    'Riau',
    'Sumatera Barat',
    'Sumatera Selatan',
    'Sumatera Utara'
]

PROVINSI_SUMATERA = ["Aceh"] + PROVINSI
PROVINSI_SUMATERA.sort()

class InputData(BaseModel):
    tahun: int
    curah_hujan: float
    suhu_rata2: float
    luas_panen: float
    nama_provinsi: str
    kelembapan: float

@app.post("/predict")
def predict_panen(data: InputData):
    input_dict = {
        'Tahun': [data.tahun], 
        'Curah hujan': [data.curah_hujan],
        'Kelembapan': [data.kelembapan],
        'Suhu rata-rata': [data.suhu_rata2],
        'Luas Panen': [data.luas_panen]
    }

    for provinsi in PROVINSI_SUMATERA:
        input_dict[f'Provinsi_{provinsi}'] = [1 if data.nama_provinsi == provinsi else 0]

    input_df = pd.DataFrame(input_dict)

    expected_columns = [
        'Tahun',
        'Luas Panen',
        'Curah hujan',
        'Kelembapan',
        'Suhu rata-rata',
        'Provinsi_Bengkulu',
        'Provinsi_Jambi',
        'Provinsi_Lampung',
        'Provinsi_Riau',
        'Provinsi_Sumatera Barat',
        'Provinsi_Sumatera Selatan',
        'Provinsi_Sumatera Utara'
    ]
    input_df = input_df[expected_columns]

    print("DataFrame yang akan masuk ke model:\n", input_df)
    # --------------------------------------------------
    try:
        prediksi = model.predict(input_df)[0]
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Terjadi kesalahan pada nama fitur: {e}. Pastikan nama kolom di API cocok dengan saat training model.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan internal saat prediksi: {e}")

    return {"prediksi_panen": round(prediksi, 2)}

@app.get("/provinces")
def get_provinces():
    """Endpoint untuk mendapatkan daftar provinsi yang didukung."""
    return {"provinces": PROVINSI_SUMATERA}