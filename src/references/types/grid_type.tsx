interface Coordinate {
    longitude: number[];
    latitude: number[];
}

interface Geometry {
    type: string;
    coordinates: Coordinate[];
}

interface Elevation {
    unitCode: string;
    value: number;
}

interface ProbabilityOfPrecipitation {
    unitCode: string;
    value: number;
}

interface Dewpoint {
    unitCode: string;
    value: number;
}

interface RelativeHumidity {
    unitCode: string;
    value: number;
}

export interface Period {
    number: number;
    name?: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend?: string;
    probabilityOfPrecipitation: ProbabilityOfPrecipitation;
    dewpoint: Dewpoint;
    relativeHumidity: RelativeHumidity;
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
}

export interface Properties {
    updated: string;
    units: string;
    forecastGenerator: string;
    generatedAt: string;
    updateTime: string;
    validTimes: string;
    elevation: Elevation;
    periods: Period[];
}

export interface RootObject {
    "@context": string[];
    type: string;
    geometry: Geometry;
    properties: Properties;
}