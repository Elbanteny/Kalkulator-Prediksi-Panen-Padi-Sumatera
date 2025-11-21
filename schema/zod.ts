import z from "zod";

export const PredictionSchema = z.object({
  tahun: z.coerce
    .number()
    .int()
    .min(1945, "Tahun tidak valid")
    .max(new Date().getFullYear() + 5),
  luas_panen: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({ required_error: "Luas panen harus diisi" })
      .positive("Luas panen harus angka positif")
  ),
  curah_hujan: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({ required_error: "Curah hujan harus diisi" })
      .positive("Curah hujan harus angka positif")
  ),
  suhu_rata2: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({
        required_error: "Suhu harus diisi",
        invalid_type_error: "Suhu harus angka",
      })
      .min(-20, "Suhu tidak realistis")
      .max(50, "Suhu tidak realistis")
  ),
  kelembapan: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({ required_error: "Kelembapan harus diisi" })
      .min(0, "Kelembapan harus antara 0-100")
      .max(100, "Kelembapan harus antara 0-100")
  ),
  nama_provinsi: z.string().min(1, "Provinsi harus dipilih"),
});
