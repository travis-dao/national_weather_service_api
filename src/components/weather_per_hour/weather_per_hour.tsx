'use client'

import React, { FC, useState } from "react";
import styles from './page.module.css';
import moment from "moment";
import { Period } from "../../references/types/grid_type";
import Image from "next/image";
import '../weather-icons-master/css/weather-icons-wind.css';

interface WeatherProps {
    period: Period;
};

const WeatherPerHour: FC<WeatherProps> = ({ period }) => {
    const [isPanelActive, setIsPanelActive] = useState(false);

    const handleClick = () => {
        setIsPanelActive(!isPanelActive);
    };

    return (
        <>
        <div className={styles.weather}>
            <div className={styles.weather_info} onClick={handleClick}>
                <h4>{getTime(period.startTime)}</h4>
                <h2>{period.temperature + '°' + period.temperatureUnit}</h2>
                <div className={`${styles.forecast} ${styles.icon_container}`}>
                    <Image alt='forecast' src={getWeatherIcon(period.shortForecast)} height={48} width={48}/>
                    <p>{period.shortForecast}</p>
                </div>
                <div className={`${styles.rain} ${styles.icon_container}`}>
                    <Image alt='rain' src={'/weather_icons/wi-raindrop.svg'} height={48} width={48} />
                    <p>{period.probabilityOfPrecipitation.value + '%'}</p>
                </div>
            </div>
            <i className={`bx bx-chevron-${isPanelActive? 'up' : 'down'} ${styles.icon} ${styles.button}`} onClick={handleClick}></i>
        </div>
        <div className={`${styles.panel} ${isPanelActive? styles.active : ''}`}>
            <div className={`${styles.wind} ${styles.icon_container}`}>
                <i className={`wi wi-wind ${getWindDirIcon(period.windDirection)} ${styles.icon}`}></i>
                <p>{period.windSpeed}</p>
            </div>
            <div className={`${styles.humid} ${styles.icon_container}`}>
                <Image alt='humid' src={'/weather_icons/wi-humidity.svg'} height={48} width={48} />
                <p>{period.relativeHumidity.value}</p>
            </div>
        </div>
        </>
    );
};
 
export default WeatherPerHour;

const getTime = (time: string) => {
    return moment(time).format('hh:mm A');
}

const getWindDirIcon = (dir: String) => {
    const url: string = 'wi-towards-' + dir.toLowerCase();
    return url;
}

const getWeatherIcon: (forecast: string) => string = (forecast: string): string => {
    switch (forecast) {
        case 'Patchy Fog':
            return '/weather_icons/wi-fog.svg';
        case 'Sunny':
            return '/weather_icons/wi-day-sunny.svg';
        case 'Clear':
            return '/weather_icons/wi-night-clear.svg';
        case 'Partly Cloudy':
            return '/weather_icons/wi-night-alt-cloudy.svg';
        case 'Mostly Clear':
            return '/weather_icons/wi-night-alt-partly-cloudy.svg';
        case 'Mostly Sunny':
            return '/weather_icons/wi-day-sunny-overcast.svg';
        case 'Partly Sunny':
            return '/weather_icons/wi-day-cloudy.svg';
        case 'Mostly Cloudy':
            return '/weather_icons/wi-cloud.svg';
        case 'Cloudy':
            return '/weather_icons/wi-cloudy.svg';
        default:
            return '/weather_icons/wi-refresh.svg';
    }
};