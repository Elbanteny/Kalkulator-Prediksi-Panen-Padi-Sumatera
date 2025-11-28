import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-green-900">
          Prediksi Hasil Panen Padi Anda dengan Akurat
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-700 ">
          Alat inovatif kami membantu petani merencanakan dan mengoptimalkan
          panen mereka dengan estimasi yang tepat.
        </p>
        <Link href="/prediction" passHref>
          <Button
            aria-label="Mulai Prediksi Sekarang"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out shadow-lg h-auto cursor-pointer"
          >
            Mulai Prediksi Sekarang
          </Button>
        </Link>
      </div>

      <div className="relative h-64 md:h-96 lg:h-[50vh] w-full">
        <Image
          src="/images/image.png"
          alt="Pemandangan sawah pertanian"
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="(max-width: 1023px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
