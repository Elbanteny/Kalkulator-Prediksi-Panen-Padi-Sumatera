"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import TablePredicition, { HistoryItem } from "@/components/Table";
import { db } from "@/firestore/firestore.config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  writeBatch,
  Timestamp,
} from "firebase/firestore";

const Histori = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterProvince, setFilterProvince] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const historyCollection = collection(db, "predictionHistory");
      const q = query(historyCollection, orderBy("timestamp", "desc"));
      const historySnapshot = await getDocs(q);
      const historyList = historySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as HistoryItem[];
      setHistory(historyList);
    } catch (err) {
      console.error("Error fetching history: ", err);
      setError("Gagal memuat riwayat dari database.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const formatTimestamp = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredAndSearchedHistory = useMemo(() => {
    let currentHistory = history;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentHistory = currentHistory.filter((item) => {
        const searchableString = [
          item.nama_provinsi,
          item.tahun,
          item.luas_panen,
          item.curah_hujan,
          item.suhu_rata2,
          item.kelembapan,
          item.prediksi_panen.toFixed(2),
          formatTimestamp(item.timestamp),
        ]
          .join(" ")
          .toLowerCase();
        return searchableString.includes(lowerCaseSearchTerm);
      });
    }

    if (filterProvince !== "all") {
      currentHistory = currentHistory.filter(
        (item) => item.nama_provinsi === filterProvince
      );
    }

    if (filterYear !== "all") {
      currentHistory = currentHistory.filter(
        (item) => item.tahun === parseInt(filterYear, 10)
      );
    }

    return currentHistory;
  }, [history, searchTerm, filterProvince, filterYear]);

  const uniqueProvinces = useMemo(() => {
    const provinces = new Set(history.map((item) => item.nama_provinsi));
    return ["all", ...Array.from(provinces).sort()];
  }, [history]);

  const uniqueYears = useMemo(() => {
    const years = new Set(history.map((item) => item.tahun));
    return [
      "all",
      ...Array.from(years)
        .sort((a, b) => b - a)
        .map(String),
    ];
  }, [history]);

  const handleClearHistory = async () => {
    setIsLoading(true);
    try {
      const historyCollection = collection(db, "predictionHistory");
      const historySnapshot = await getDocs(historyCollection);
      if (historySnapshot.empty) {
        setIsLoading(false);
        return;
      }
      const batch = writeBatch(db);
      historySnapshot.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
      setHistory([]);
    } catch (err) {
      console.error("Error clearing history: ", err);
      setError("Gagal menghapus riwayat.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "predictionHistory", id);
      await deleteDoc(docRef);
      setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting history item: ", err);
      setError("Gagal menghapus item riwayat.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Riwayat Prediksi Hasil Panen</h1>
      {isLoading && <p>Memuat riwayat...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading &&
        !error &&
        (history.length === 0 ? (
          <p className="text-gray-600">
            Belum ada riwayat prediksi. Lakukan prediksi di halaman utama untuk
            melihat riwayat di sini.
          </p>
        ) : (
          <TablePredicition
            data={filteredAndSearchedHistory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterProvince={filterProvince}
            setFilterProvince={setFilterProvince}
            uniqueProvinces={uniqueProvinces}
            filterYear={filterYear}
            setFilterYear={setFilterYear}
            uniqueYears={uniqueYears}
            onClearHistory={handleClearHistory}
            onDeleteItem={handleDeleteItem}
          />
        ))}
    </div>
  );
};

export default Histori;
