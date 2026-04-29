export type MoonApiResponse = {
    moonphase: number;
    moonrise?: string| null;
    moonset?: string| null;
    // Add other properties from the API response if needed
[key: string]: unknown;     
};
    // Add other properties from the API response if needed