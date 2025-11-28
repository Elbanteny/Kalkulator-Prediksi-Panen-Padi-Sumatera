#!/bin/bash

API_DIR="app/api"
if [ ! -d "$API_DIR" ]; then
    echo "Error: Direktori API ($API_DIR) tidak ditemukan."
    exit 1
fi

cd app/api

if [ ! -f "venv/bin/activate" ]; then
    echo "Error: Virtual environment (venv/bin/activate) tidak ditemukan di $API_DIR. Harap buat atau instal dependensi."
    exit 1
fi

source venv/bin/activate
cd ../../
uvicorn app.api.main:app --reload --host 127.0.0.1 --port 8000

