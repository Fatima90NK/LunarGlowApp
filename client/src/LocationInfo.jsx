import { useState, useEffect } from 'react';

function LocationInfo({ latitude, longitude }) {
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      getLocationName();
    }
  }, [latitude, longitude]);

  async function getLocationName() {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      if (data.address) {
        const city = data.address.city || data.address.town || data.address.village || "Unknown City";
        const country = data.address.country || "Unknown Country";
        setLocation(`${city}, ${country}`);
      } else {
        setLocation("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error.message);
      setLocation("Error fetching location");
    }
  }

  return (
    <div className="location-info">
      <p><strong>You are currently moonphasing in <i>{location}</i></strong></p>
    </div>
  );
}

export default LocationInfo;
