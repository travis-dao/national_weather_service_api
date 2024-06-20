interface ContextObject {
    "@version"?: string;
    wx?: string;
    s?: string;
    geo?: string;
    unit?: string;
    "@vocab"?: string;
    geometry?: GeometryType;
    city?: string;
    state?: string;
    distance?: DistanceType;
    bearing?: BearingType;
    value?: ValueType;
    unitCode?: UnitCodeType;
    forecastOffice?: string;
    forecastGridData?: string;
    publicZone?: string;
    county?: string;
}

interface GeometryType {
    "@id": string;
    "@type": string;
}

interface DistanceType {
    "@id": string;
    "@type": string;
    unitCode?: string;
    value?: number;
}

interface BearingType extends DistanceType {}

interface ValueType {
    "@id": string;
}

interface UnitCodeType {
    "@id": string;
    "@type": "@id";
}

interface PointGeometry {
    type: string;
    coordinates: number[];
}

interface RelativeLocation {
    type: string;
    geometry: PointGeometry;
    properties: {
        city: string;
        state: string;
        distance: DistanceType;
        bearing: BearingType;
    };
}

export interface Properties {
    "@id": string;
    "@type": string;
    cwa?: string;
    forecastOffice?: string;
    gridId?: string;
    gridX?: number;
    gridY?: number;
    forecast?: string;
    forecastHourly: string;
    forecastGridData?: string;
    observationStations?: string;
    relativeLocation?: RelativeLocation;
    forecastZone?: string;
    county?: string;
    fireWeatherZone?: string;
    timeZone?: string;
    radarStation?: string;
}

export interface GeoJSONLD {
    "@context": ContextObject[];
    id: string;
    type: string;
    geometry: PointGeometry;
    properties: Properties;
}