"use client";

import { useState } from "react";
import FormSection from "./Form";

export default function PredictionForm() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl rounded-lg border border-gray-200/50 bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
      <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
        Kalkulator Prediksi Panen Padi
      </h1>
      <p className="mb-6 text-center text-gray-500">
        Masukkan data untuk memprediksi hasil panen di Sumatera.
      </p>

      <FormSection
        setIsLoading={setIsLoading}
        setPrediction={setPrediction}
        setError={setError}
        isLoading={isLoading}
      />

      {error && (
        <div className="mt-6 rounded-md bg-red-100 p-4 text-center text-red-700">
          {error}
        </div>
      )}

      {prediction !== null && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Hasil Prediksi Panen:
          </h2>
          <p className="text-4xl font-bold text-green-600">
            {prediction.toLocaleString("id-ID")}{" "}
            <span className="text-2xl font-medium text-gray-500">Ton</span>
          </p>
        </div>
      )}
    </div>
  );
}
