import { useState, useEffect } from 'react';
import styles from './Container.module.css'
import Image from 'next/image';

export default function FetchWeather(props: IProp) {

    const { city, search } = props;
    const apiKey = process.env.NEXT_PUBLIC_KEY;
    const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null);
    const [forecastWeather, setForecastWeather] = useState<IForecastWeather[]>([]);


    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!search || !city.trim()) { 
                return; 
            }

            try {
                const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                if (!currentWeatherResponse.ok) {
                    throw new Error(`HTTP error! status: ${currentWeatherResponse.status}`);
                }
                const currentWeatherData = await currentWeatherResponse.json();
                setCurrentWeather(currentWeatherData);
                console.log(currentWeather);
             

                const forecastWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
                if (!forecastWeatherResponse.ok) {
                    throw new Error(`HTTP error! status: ${forecastWeatherResponse.status}`);
                }
                const forecastWeatherData = await forecastWeatherResponse.json();
                setForecastWeather(forecastWeatherData.list);
                console.log(forecastWeather);
            } catch (error) {
                console.error("Error fetching weather data", error);
             
            }
        };

        fetchWeatherData();
    }, [city, apiKey, search]); 

   

    return (
        <div className={`flex relative xl:flex-row lg:flex-col lg:gap-40 max-sm:flex-col sm:mt-8 md:flex-col`}>
            <div className={`flex flex-column relative`}>
            {
                currentWeather && (
                    
                    <div className={`flex flex-row relative`}>
                        <div className={` relative ml-9 z-0`}>
                        <Image src={'/images/weather.svg'} alt='weather vial' width={450} height={200}/>
                       </div>
                        <div className={`absolute rounded-full border-black border-2 w-80 h-80 items-center justify-center p-5 mt-64 z-10 lg:ml-48 max-sm:ml-40 ${styles.curInfo}`}>
                       
                    
                        <p className={styles.name}>{city}</p>
                        <p className={styles.curTemp}>{(currentWeather.main.temp - 273.15).toFixed(1)} °C</p>
                        <p className={styles.curWeat}>{currentWeather.weather[0].main}</p>
                        <p className={styles.curWind}>Wind Speed: {currentWeather.wind.speed} m/s</p>
                        <p className={`mt-6`}>Last updated:</p>
                        <p>{new Date(currentWeather.dt * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                    
                      </div>
                    </div>
                )
            }
            </div>
            <div className={`${styles.forecastContainer}`}>

            {
                
                forecastWeather.map((forecast, index) => (
                    <div key={index}>
                        
                        <p>{new Date(forecast.dt_txt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric"})}</p>
                        <div className={`flex flex-row gap-12 rounded-full border-2 lg:w-96 lg:p-5 items-center bg-light-rain sm:w-96 sm:h-20`}>
                            <div className={`items-center`}>
                        <p>{new Date(forecast.dt_txt).toLocaleString("en-US", { hour: "numeric"})}</p>
                        <div className={`flex flex-row gap-4`}>
                        <p>{(forecast.main.temp - 273.15).toFixed(1)} °C</p>
                        <p>{forecast.weather[0].main}</p>
                        </div>
                       </div>
                     <div>
                        <p>{forecast.weather[0].description}</p>
                        <p>Wind Speed: {forecast.wind.speed} m/s</p>
                        </div>
                        </div>
                      
                    </div>
                ))
            }
            </div>
        </div>
    )
}

   /* return(
        <>
        {
           props.data && props.data.map(({
              date,
               temperature,
               weather,
               wind,
               listTemp,
               weat,
               weatDes,
               windSp,
               dtTxt

            }: ICurrentProps, index: number) => {
                return(
                    <div key={index} style={{margin: '15px'}}>
                        <div>Date {date}</div>
                        <div>{temperature}°C</div>
                        <div>{weather}</div>
                        <div>{wind}</div>
                        <div>{listTemp}</div>
                        <div>{weat}</div>
                        <div>{weatDes}</div>
                        <div>{windSp}</div>
                        <div>{dtTxt}</div>
                     

                   
                    </div>
                )
            })
        }
        </>
   )
   */
