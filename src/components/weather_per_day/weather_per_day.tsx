'use client'

import { FC } from "react";
import WeatherPerHour from "../weather_per_hour/weather_per_hour";
import { Properties, Period } from "../../references/types/grid_type";
import moment from "moment";
import styles from './page.module.css';

interface WeatherProps {
    props: Properties['periods'];
}

const WeatherPerDay: FC<WeatherProps> = ({ props }) => {
    const date: String = moment(props[0].startTime.substring(0, 10), 'YYYY-MM-DD').format('dddd, MMMM D, YYYY');

    const day = props.map((w: Period, index) => {
        return (
            <WeatherPerHour period={props[index]} key={index} />
        )
    })

    return (
        <div className={styles.day}>
            <h2>{date}</h2>
            {day}
        </div>
    );
}
 
export default WeatherPerDay;