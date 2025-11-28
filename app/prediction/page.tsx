import PredictionForm from "@/components/PredictionForm";
import WeatherWidget from "@/components/WeatherWidget";
import Clock from "@/components/Clock";

const PredictionPage = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-linear-to-b from-white via-emerald-100 to-teal-100 p-4 md:p-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-8 h-full md:h-auto">
        <WeatherWidget />
        <PredictionForm />
        <Clock />
      </div>
    </main>
  );
};

export default PredictionPage;
