import type { MoonApiResponse } from "../types/api";

export async function fetchMoonData(lat: number, lon: number): Promise<MoonApiResponse> {
    const response = await fetch(`http://localhost:3000/api/moon/${lat}/${lon}`);
    if (!response.ok) 
        throw new Error(`Failed to fetch moon data: ${response.statusText}`);
    return response.json() as Promise<MoonApiResponse>;
}

