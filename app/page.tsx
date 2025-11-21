import PredictionForm from "@/components/PredictionForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <Image
        src="https://images.unsplash.com/photo-1698628291500-82e1c1e65f52?auto=format&fit=crop&q=75"
        alt="Background"
        fill
        className="fixed top-0 left-0 -z-10 h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 100vw)"
        priority
      />
      <PredictionForm />
    </main>
  );
}
