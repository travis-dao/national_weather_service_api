import { RootObject } from "@/references/types/grid_type";
import { GeoJSONLD } from "@/references/types/lat_long_type";

export const fetchData = async (setIsLoading: (value: boolean) => void, setWeatherData: (data: RootObject) => void, lat: number, long: number) => {
    try {
        setIsLoading(true);
        const responseForLatLong = await fetch(`https://api.weather.gov/points/${lat},${long}`);
        if (!responseForLatLong.ok) throw new Error(`HTTP error status: ${responseForLatLong.status}`);
        const dataForLatLong: GeoJSONLD = await responseForLatLong.json();

        const responseForGrid = await fetch(dataForLatLong.properties.forecastHourly);
        if (!responseForGrid.ok) throw new Error(`HTTP error status: ${responseForGrid.status}`);
        const dataForGrid: RootObject = await responseForGrid.json();

        setWeatherData(dataForGrid);
        setIsLoading(false);
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setIsLoading(false);
    }
};

// api route for lat, long
// https://api.weather.gov/points/39.3528,-94.3711