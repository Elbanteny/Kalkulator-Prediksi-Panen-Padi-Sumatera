import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PredictionSchema } from "@/schema/zod";
import z from "zod";

type PredictionFormValues = z.infer<typeof PredictionSchema>;

interface FormSectionProps {
  setPrediction: (prediction: number | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  isLoading: boolean;
}

const FormSection = ({
  setPrediction,
  setIsLoading,
  setError,
  isLoading,
}: FormSectionProps) => {
  const [provinces, setProvinces] = useState<string[]>([]);

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(PredictionSchema) as Resolver<PredictionFormValues>,
    defaultValues: {
      tahun: new Date().getFullYear(),
      nama_provinsi: "",
      luas_panen: undefined,
      curah_hujan: undefined,
      suhu_rata2: undefined,
      kelembapan: undefined,
    },
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/provinces");
        if (!response.ok) {
          throw new Error("Gagal mengambil daftar provinsi");
        }
        const data = await response.json();
        setProvinces(data.provinces);
        if (data.provinces.length > 0) {
          if (!form.getValues("nama_provinsi")) {
            form.setValue("nama_provinsi", data.provinces[0]);
          }
        }
      } catch (err) {
        setError(
          "Tidak dapat terhubung ke API. Pastikan server FastAPI berjalan."
        );
        console.error(err);
      }
    };

    fetchProvinces();
  }, [form, setError]);

  async function onSubmit(values: PredictionFormValues) {
    setError(null);
    setPrediction(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Gagal mendapatkan prediksi dari server.");
      }

      const result = await response.json();
      setPrediction(result.prediksi_panen);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan saat melakukan prediksi.");
        console.error(err);
      } else {
        setError(String(err) || "Terjadi kesalahan saat melakukan prediksi.");
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="tahun"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahun</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="luas_panen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Luas Panen (Ha)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Contoh: 150000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="curah_hujan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curah Hujan (mm/th)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Contoh: 3000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="suhu_rata2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suhu Rata-rata (°C)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Contoh: 27.5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kelembapan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelembapan (%)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Contoh: 80" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nama_provinsi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provinsi</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={provinces.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih provinsi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinces.map((prov) => (
                    <SelectItem key={prov} value={prov}>
                      {prov}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Memprediksi..." : "Prediksi Hasil Panen"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSection;
