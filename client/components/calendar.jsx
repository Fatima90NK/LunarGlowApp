import React, { useEffect, useState } from "react";
//import "./components/calendar.css";

const MoonPhaseWidget = () => {
  const [geoData, setGeoData] = useState(null);
  const [moonData, setMoonData] = useState(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch("https://ipinfo.io/json");
        if (!response.ok) throw new Error("Failed to fetch geo data");
        const data = await response.json();
        const [latitude, longitude] = data.loc.split(",").map(parseFloat);
        setGeoData({ ...data, latitude, longitude });
      } catch (error) {
        console.warn("Using default geo data", error);
        setGeoData({
          city: "New York",
          country: "US",
          latitude: 40.7128,
          longitude: -74.006,
        });
      }
    };

    const fetchMoonPhaseData = async (latitude, longitude) => {
      try {
        const response = await fetch(
          "https://moonorganizer.com/api/public/moon-phase",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude, date: new Date() }),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch moon data");
        const data = await response.json();
        setMoonData(data);
      } catch (error) {
        console.warn("Error fetching moon phase data", error);
      }
    };

    fetchGeoData().then(() => {
      if (geoData) fetchMoonPhaseData(geoData.latitude, geoData.longitude);
    });
  }, [geoData]);

  if (!geoData || !moonData) return <div>Loading...</div>;

  return (
    <div className="mph-widget" style={{ backgroundColor: "#282c34", padding: "1rem", color: "#fff" }}>
      <div className="mph-widget-body">
        <div className="mph-col">
          <div className="mph-row">
            <div className="current-date">{moonData.dateFmt}</div>
          </div>
          <div className="mph-row">
            <div className="current-place">
              {geoData.city}, {geoData.country}
            </div>
          </div>
          <div className="mph-row">
            <div className="moon-phase-ico">
              <img src={moonData.phaseIco} alt="Moon phase" />
            </div>
          </div>
        </div>
        <div className="mph-col">
          <div className="mph-row">
            <div className="phase-name">{moonData.phase}</div>
          </div>
          <div className="mph-row">
            <div className="zodiac-name">
              Moon in <strong>{moonData.zodiac}</strong>
            </div>
          </div>
          <div className="mph-row">
            <div>Set: </div>
            <div className="moon-time">{moonData.set}</div>
          </div>
          <div className="mph-row">
            <div>Rise: </div>
            <div className="moon-time">{moonData.rise}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonPhaseWidget;
