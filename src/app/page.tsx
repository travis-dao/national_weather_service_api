import styles from './page.module.css';
import Cities from "@/components/cities/cities";
import CitiesJSON from '../references/cities.json';
import { CitiesData } from '@/components/cities/cities';

export default function Home() {
    const json: CitiesData = CitiesJSON;

    return (
        <main className={styles.main}>
            <div className={styles.title}>
                <h1 className='uppercase underline'>Weather Report</h1>
                <p className="subtext">A user-friendly website offering detailed hourly weather predictions for the upcoming week across all cities in the Los Angeles area. Leveraging the National Weather Service (NWS) API, this platform delivers accurate, real-time forecasts, including temperature, precipitation, wind speed, and humidity levels. Ideal for residents, commuters, and businesses, it ensures users are well-prepared for any weather condition.</p>
            </div>
            <div className={styles.content}>
                <h2 className='uppercase underline'>Cities</h2>
                <Cities cities={json.cities}/>
            </div>
        </main>
    )
};