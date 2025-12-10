import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React from "react";
import { Timestamp } from "firebase/firestore";
import { Trash2 } from "lucide-react";
import { CustomAlertDialog } from "./AlertDialog";

export interface HistoryItem {
  id: string;
  nama_provinsi: string;
  tahun: number;
  luas_panen: number;
  curah_hujan: number;
  suhu_rata2: number;
  kelembapan: number;
  prediksi_panen: number;
  timestamp: Timestamp;
}

interface TablePredicitionProps {
  data: HistoryItem[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterProvince: string;
  setFilterProvince: (value: string) => void;
  uniqueProvinces: string[];
  filterYear: string;
  setFilterYear: (value: string) => void;
  uniqueYears: string[];
  onClearHistory: () => void;
  onDeleteItem: (id: string) => void;
}

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

const TablePredicition: React.FC<TablePredicitionProps> = ({
  onDeleteItem,
  data,
  searchTerm,
  setSearchTerm,
  filterProvince,
  setFilterProvince,
  uniqueProvinces,
  filterYear,
  setFilterYear,
  uniqueYears,
  onClearHistory,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <Input
          placeholder="Cari (provinsi, tahun, hasil, dll...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterProvince} onValueChange={setFilterProvince}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Provinsi" />
          </SelectTrigger>
          <SelectContent>
            {uniqueProvinces.map((prov) => (
              <SelectItem key={prov} value={prov}>
                {prov === "all" ? "Semua Provinsi" : prov}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterYear} onValueChange={setFilterYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Tahun" />
          </SelectTrigger>
          <SelectContent>
            {uniqueYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year === "all" ? "Semua Tahun" : year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CustomAlertDialog
          title="Hapus Semua Riwayat?"
          description="Tindakan ini tidak dapat dibatalkan. Ini akan menghapus semua data riwayat secara permanen."
          onConfirm={onClearHistory}
        >
          <Button
            variant="destructive"
            className="ml-auto cursor-pointer hover:opacity-80"
          >
            Hapus Semua Riwayat
          </Button>
        </CustomAlertDialog>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No.</TableHead>
              <TableHead>Tanggal Prediksi</TableHead>
              <TableHead>Provinsi</TableHead>
              <TableHead>Tahun</TableHead>
              <TableHead>Luas Panen (Ha)</TableHead>
              <TableHead>Curah Hujan (mm/th)</TableHead>
              <TableHead>Suhu Rata-rata (°C)</TableHead>
              <TableHead>Kelembapan (%)</TableHead>
              <TableHead className="text-right">Hasil Prediksi (Ton)</TableHead>
              <TableHead className="text-right w-[100px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{formatTimestamp(item.timestamp)}</TableCell>
                  <TableCell>{item.nama_provinsi}</TableCell>
                  <TableCell>{item.tahun}</TableCell>
                  <TableCell>{item.luas_panen}</TableCell>
                  <TableCell>{item.curah_hujan}</TableCell>
                  <TableCell>{item.suhu_rata2}</TableCell>
                  <TableCell>{item.kelembapan}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {item.prediksi_panen.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <CustomAlertDialog
                      title="Apakah Anda yakin?"
                      description="Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data riwayat ini secara permanen."
                      onConfirm={() => onDeleteItem(item.id)}
                    >
                      <Button
                        variant="destructive"
                        size="icon"
                        className="cursor-pointer hover:opacity-80"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Hapus</span>
                      </Button>
                    </CustomAlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-24 text-center text-gray-500"
                >
                  Tidak ada riwayat yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TablePredicition;
