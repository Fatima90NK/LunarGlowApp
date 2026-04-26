export type MoonPhaseLabel = {
    phase: string;
    description: string;
};

export function getMoonImageUrl(moonphase: number | undefined | null): string  {
    if (moonphase == null) {
        return "https://upload.wikimedia.org/wikipedia/commons/b/b8/Moon_rotating_full_160px.gif";
    }
//done
    if (moonphase === 0 || moonphase === 1) {
        return "https://upload.wikimedia.org/wikipedia/commons/b/b5/20110319_Supermoon.jpg";
    } //done
    if (moonphase > 0 && moonphase < 0.25) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/2013-01-02_00-00-55-Waning-gibbous-moon.jpg/1920px-2013-01-02_00-00-55-Waning-gibbous-moon.jpg";
    }//done
    if (moonphase === 0.25) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Waning_gibbous_moon_near_last_quarter_-_23_Sept._2016.png/1920px-Waning_gibbous_moon_near_last_quarter_-_23_Sept._2016.png";
    }//done
    if (moonphase > 0.25 && moonphase < 0.5) {
        return "https://upload.wikimedia.org/wikipedia/commons/3/35/Waning_Crescent_Moon%287Sep15%29.jpg";
    }//done
    if (moonphase === 0.5) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/New_Moon.jpg/1280px-New_Moon.jpg";
    }//done
    if (moonphase > 0.5 && moonphase < 0.75) {
        return "https://upload.wikimedia.org/wikipedia/commons/e/e3/Waxing_Crescent_Moon_on_4-1-17_%2833627493622%29.jpg";
    }
    if (moonphase === 0.75) {
        return "https://upload.wikimedia.org/wikipedia/commons/4/4d/Daniel_Hershman_-_march_moon_%28by%29.jpg";
    }
    if (moonphase > 0.75 && moonphase < 1) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Lune-Nikon-600-F4_Luc_Viatour.jpg/1920px-Lune-Nikon-600-F4_Luc_Viatour.jpg";
    }
    return "https://upload.wikimedia.org/wikipedia/commons/b/b8/Moon_rotating_full_160px.gif";
}

export function getMoonPhaseLabel(moonphase: number | undefined | null): MoonPhaseLabel {
    if (moonphase == null) {
        return { phase: "Unknown", description: "The moon phase is unknown." };
    }   
    if (moonphase === 0 || moonphase === 1) {
        return { phase: "Full Moon", description: "The moon is fully illuminated." };
    }
    if (moonphase > 0 && moonphase < 0.25) {
        return { phase: "Waning Gibbous", description: "The moon is more than half illuminated and decreasing." };
    }
    if (moonphase === 0.25) {
        return { phase: "Last Quarter", description: "The moon is half illuminated and decreasing." };
    }
    if (moonphase > 0.25 && moonphase < 0.5) {
        return { phase: "Waning Crescent", description: "The moon is less than half illuminated and decreasing." };
    }
    if (moonphase === 0.5) {
        return { phase: "New Moon", description: "The moon is not illuminated." };
    }
    if (moonphase > 0.5 && moonphase < 0.75) {
        return { phase: "Waxing Crescent", description: "The moon is less than half illuminated and increasing." };
    }
    if (moonphase === 0.75) {
        return { phase: "First Quarter", description: "The moon is half illuminated and increasing." };
    }
    if (moonphase > 0.75 && moonphase < 1) {
        return { phase: "Waxing Gibbous", description: "The moon is more than half illuminated and increasing." };
    }
    return { phase: "Unknown", description: "The moon phase is unknown." };
}