import styles from './page.module.css';
import Link from 'next/link';

export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}
  
export interface CitiesData {
    cities: City[];
}

export default function Cities({ cities }: CitiesData) {
    return (
        <div className={styles.container}>
            {cities.map((city: City, index) => (
                <Link href={`/city/${city.name}&latitude=${city.latitude}&longitude=${city.longitude}`} key={city.id}>
                    {city.name}
                </Link>
            ))}
        </div>
    );
}
