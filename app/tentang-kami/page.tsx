import Image from "next/image";

const TentangKamiPage = () => {
  return (
    <main className="min-h-screen bg-linear-to-b from-white to-green-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Konten Teks */}
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Tentang Kami
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Selamat datang di Kalkulator Prediksi Hasil Panen Padi. Aplikasi
              ini dibuat untuk membantu para petani dan pihak terkait dalam
              memperkirakan hasil panen padi di wilayah Sumatra dengan lebih
              akurat.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Perhitungan kami didasarkan pada data historis yang andal dari{" "}
              <strong>BPS (Badan Pusat Statistik)</strong>,{" "}
              <strong>
                BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
              </strong>
              , dan <strong>BDSP (Balai Data dan Sistem Pertanian)</strong>.
              Untuk mendapatkan hasil prediksi, Anda perlu memasukkan 4 variabel
              utama: <strong>Luas Panen</strong>, <strong>Kelembapan</strong>,{" "}
              <strong>Curah Hujan</strong>, dan <strong>Suhu Rata-rata</strong>.
            </p>
          </div>

          {/* Galeri Gambar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
            {/* Gambar 1 */}
            <div className="flex flex-col items-center">
              <Image
                src="https://images.unsplash.com/photo-1601391775296-2b6090c6cf3c?q=80&w=1964&auto=format&fit=crop"
                alt="Petani memegang padi"
                width={400}
                height={600}
                className="rounded-xl shadow-lg object-cover w-full h-96"
              />
              <p className="mt-3 text-sm text-gray-600">
                Pemandangan sawah di sore hari yang syahdu.
              </p>
            </div>
            {/* Gambar 2 */}
            <div className="flex flex-col items-center">
              <Image
                src="https://images.unsplash.com/photo-1613580054109-18f5228446d3?q=80&w=1974&auto=format&fit=crop"
                alt="Pemandangan sawah terasering"
                width={400}
                height={600}
                className="rounded-xl shadow-lg object-cover w-full h-96"
              />
              <p className="mt-3 text-sm text-gray-600">
                Sawah terasering yang subur di pedesaan Sumatra.
              </p>
            </div>
            {/* Gambar 3 */}
            <div className="flex flex-col items-center">
              <Image
                src="https://images.unsplash.com/photo-1685370322634-f0b121d68e5d?q=80&w=1964&auto=format&fit=crop"
                alt="Beras di tangan"
                width={400}
                height={600}
                className="rounded-xl shadow-lg object-cover w-full h-96"
              />
              <p className="mt-3 text-sm text-gray-600">
                Hasil panen padi berkualitas yang siap diolah.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TentangKamiPage;
