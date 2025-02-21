import { useState, useEffect } from 'react'
import './App.css'
//import MoonPhaseDisplay from '../components/MoonPhaseDisplay';
//i need to link pictures with the moon phase
//1) i create a function with a condition inside it. 
// { 0.75: "Waxing Gibbou" }
// const moonphases = { 75: 'waxing gibbous'}
// moonphases[75]

//between parenthises is call the function

//get the objects from console coords (1) longitude (2) latitude (nested objects), define 2 state variables. One of them is called longitude and latitude. Inside the callbackfunction use the setter longitude and langitude 
function App() {
  const [longitude,setLongitude] = useState(null);
  const [latitude,setLatitude] = useState(null);
  const [moonData,setMoonData] = useState(null);
  const [locationError,setlocationError] = useState(null);

  //Gives me the users location
  useEffect(() => {
    async function getData() {
      console.log({longitude, latitude})
      const APIkey = "ZG5V5DBKMD9CUQNPSFZWSNMAF";
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=us&key=${APIkey}&include=days&elements=datetime,moonphase,moonrise,moonset`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        setMoonData(json.days[0]);
        console.log("API Response", json);
      } catch (error) {
        console.error(error.message);
      }
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position)=> {
      setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
        //console.log(setMoonData[position.coords])
       
        setlocationError(null);
      },
      (error) => {
        setlocationError("Location access denied. Please allow location access.");
        console.error("Geolocation error:", error.message);
      }
    );
  } else {
    setlocationError("Geolocation is not supported in this browser.")
  }

  if (latitude !== null && longitude !== null) {
    getData();
  }
  return () => {

  };

  }, [longitude, latitude]);
//understand the phases of Nasa: https://science.nasa.gov/moon/moon-phases/
//using if statement condition for coding: https://www2.arnes.si/~gljsentvid10/constellations/MoonPhase.html
//1) if full moon is equal to 0 return full moon image
//2) if waning gibbous moon is between 0.00 & 0.25 return image waning gibbous moon
//3) if Last Quarter Moon is equal to 0.25 return image Last Quarter Moon
//4) if waning crescent moon is between 0.25 and 0.50 return image waning crescent moon 
//5) if new moon is equal to 0.50 return new moon
//6) if waxing crescent moon is between 0.50 and 0.75 return image waxing crescent moon 
//7) if First Quarter Moon is equal to 0.75 return picture First Quarter Moon
//8) if Waxing Gibbous Moon is between 0.75 and 1.00 return picture Waxing Gibbous Moon
//9)if full moon is equal to 1 (full circle again) return picture full moon

  function getMoonImage(moonphase) {
    //full moon is equal to 0 
    if (moonphase === 0) {
      return "https://upload.wikimedia.org/wikipedia/commons/b/b5/20110319_Supermoon.jpg";
    }
    //waning gibbous moon is between 0.00 & 0.25
      if (moonphase > 0 && moonphase < 0.25) 
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/2013-01-02_00-00-55-Waning-gibbous-moon.jpg/1920px-2013-01-02_00-00-55-Waning-gibbous-moon.jpg";
      //Last Quarter Moon is equal to 0.25
        if (moonphase === 0.25) return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Waning_gibbous_moon_near_last_quarter_-_23_Sept._2016.png/1920px-Waning_gibbous_moon_near_last_quarter_-_23_Sept._2016.png";
        //waning crescent moon is between 0.25 and 0.50
          if (moonphase > 0 && moonphase < 0.50) return "https://upload.wikimedia.org/wikipedia/commons/3/35/Waning_Crescent_Moon%287Sep15%29.jpg";
          //new moon is equal to 0.50
            if (moonphase === 0.50) return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/New_Moon.jpg/1280px-New_Moon.jpg";
            //waxing crescent moon is between 0.50 and 0.75
              if (moonphase > 0.50 && moonphase < 0.75) return "https://upload.wikimedia.org/wikipedia/commons/e/e3/Waxing_Crescent_Moon_on_4-1-17_%2833627493622%29.jpg";
                //First Quarter Moon is equal to 0.75
                  if (moonphase === 0.75) 
                    return "https://upload.wikimedia.org/wikipedia/commons/4/4d/Daniel_Hershman_-_march_moon_%28by%29.jpg";
                  //Waxing Gibbous Moon is between 0.75 and 1.00
                    if (moonphase > 0.75 && moonphase < 1.00) return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Lune-Nikon-600-F4_Luc_Viatour.jpg/1920px-Lune-Nikon-600-F4_Luc_Viatour.jpg";
  }
  
  console.log(moonData);

  return (
    <>
      <div className="App">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Moon_rotating_full_160px.gif" className="logo" alt="Moon logo" />
      </div>
      <h1>Moon Phase</h1>
      {locationError && <p>{locationError}</p>}
        {latitude !== null && longitude !== null && (
      <div>
        <p>longitude {longitude}</p>
        <p>latitude {latitude}</p>
      </div>
  )}
  {moonData && (
    <div>
     <img src={getMoonImage(moonData.moonphase)} alt="Moon Phase" width="100"/>
      
      <p>Moon Phase {moonData.moonphase !== undefined ? moonData.moonphase: "Not available"}</p>
      <p>Moonrise {moonData.moonrise ? moonData.moonrise: "Not available"}</p>
      <p>Moonset {moonData.moonset ? moonData.moonset : "Not available"}</p>
      </div>
  )}
    </>
  );
}

export default App
