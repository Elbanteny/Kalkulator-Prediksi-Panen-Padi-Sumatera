import { SunIcon } from "lucide-react";

const WeatherWidget = () => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center text-white p-8 rounded-2xl bg-black/50 backdrop-blur-md h-full">
      <div className="text-center">
        <p className="text-7xl font-bold">28°C</p>
        <p className="text-xl font-medium mt-1">Padang, Sumatera Barat</p>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <SunIcon className="h-12 w-12 text-yellow-400" />
        <div>
          <p className="text-2xl font-semibold">Cerah Berawan</p>
          <p className="text-gray-300">Kondisi cuaca saat ini</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
