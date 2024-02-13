import Image from "next/image";
import { useState } from "react";
import FetchWeather from "@/components/Container";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Home() {

// const [data, setData] = useState<ICurrentProps[]>([]);
const [city, setCity] = useState<string>('');

const [search, setSearch] = useState<boolean>(false);




const handleSearch = () => {
  setSearch(true);
};


/*const GrabWeather = async () => {

try {
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();
  console.log("Weather Data:", weatherData);
  setData([weatherData]);

  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();
  console.log("Forecast Data:", forecastData);
  setData((prevData) => [...prevData, ...forecastData.list]);
} catch (error) {
  console.error("Error fetching weather data:", error);
};


  /* fetch(weatherUrl)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    setData(data);
  })
  fetch(forecastUrl)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    setData(data);
  })
  */





  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between lg:p-10 bg-rain-blue sm:p-0 md:p-0`}
    >
      <div className={`flex xl:flex-row lg:flex-col xl:gap-96 lg:gap-4 lg:justify-center lg:items-center lg:mb-20 md:gap-3.5 md:mb-0 md:flex-col sm:gap-3.5 sm:mb-0 max-sm:flex-col`}>
        <div className={`lg:mr-96 sm:mr-0 md:mr-0`}>
        <Header/>
        </div>
      
      <div>
        <p className={`lg:text-2xl lg:mr-52 text-white lg:mb-4 sm:text-sm sm:mb-0 md:text-sm md:mb-0`}>Enter a location to update the Weather Vial</p>
        <input className={`lg:w-80 lg:h-12 rounded-lg sm:w-32 sm:h-8`} type="text" placeholder="Enter City" value={city ?? ''} onChange={(e) => setCity(e.target.value)}/>

        <button className={`lg:ml-8 text-white`} onClick={handleSearch}>Search </button>
        </div>
        </div>
        <FetchWeather city={city} search={search} />
     
     <Footer/>
    </main>
  );
}
