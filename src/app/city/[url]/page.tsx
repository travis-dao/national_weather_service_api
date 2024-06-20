'use client'

import { FC, useEffect, useState } from 'react';
import styles from './page.module.css';
import WeatherPerDay from '@/components/weather_per_day/weather_per_day';
import { Period, RootObject } from '@/references/types/grid_type';
import moment from 'moment';
import { fetchData } from './fetch';
import Link from 'next/link';

interface props {
	params: { url: string}
}

const Display: FC<props> = ({ params }) => {
	const paramsFiltered = params.url.replaceAll('%26', '').replaceAll('%20', ' ').replaceAll('%3D', '');
	const name = paramsFiltered.substring(0, paramsFiltered.indexOf('latitude'));
	const lat = paramsFiltered.substring(paramsFiltered.indexOf('latitude') + 'latitude'.length, paramsFiltered.indexOf('longitude'));
	const long = paramsFiltered.substring(paramsFiltered.indexOf('longitude') + 'longitude'.length, paramsFiltered.length);

	const [weatherData, setWeatherData] = useState<RootObject | null>(null);
	const [isLoading, setIsLoading] = useState(true);
  
	useEffect(() => {
	  fetchData(setIsLoading, setWeatherData, parseFloat(lat), parseFloat(long));
	}, []);

	const Weather = (): JSX.Element[] => {
        const days: JSX.Element[] = [];
        let periodByDay: Period[] = [];
        let currentDay = weatherData!.properties.periods[0].startTime.substring(8, 10);

        for (let i = 0; i < weatherData!.properties.periods.length; i++) {
            if (currentDay === weatherData!.properties.periods[i].startTime.substring(8, 10)) {
                periodByDay.push(weatherData!.properties.periods[i]);
            } else {
                days.push(
					<WeatherPerDay props={periodByDay} key={i}/>
				);
				periodByDay = [];
                periodByDay.push(weatherData!.properties.periods[i]);
                currentDay = weatherData!.properties.periods[i].startTime.substring(8, 10);
            }
        }

		if (periodByDay.length > 0) {
			days.push(
				<WeatherPerDay props={periodByDay} key={-1}/>
			)
		}

        return days.flat();
    };

	const lastUpdate: String = moment().format('MMMM Do YYYY, h:mm:ss a');

	return (
		<main className={styles.main}>
			<Link href={'/'} className={`bx bx-arrow-back ${styles.button_back}`}></Link>
			<div className={styles.title}>
				{isLoading? (
					<div>Loading...</div>
				) : (
					<>
					<h1 className="underline">{name.replaceAll('%20', ' ')}</h1>
					<h4 className={styles.subtitle}>{isLoading? '(loading...)' : `(last updated at ${lastUpdate})`}</h4>
					</>
				)}
			</div>

			{weatherData && (
				Weather()
			)}
		</main>
	);
}

export default Display;