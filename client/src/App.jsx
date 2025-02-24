import { useState, useEffect } from 'react';
import './App.css';
import LocationInfo from './LocationInfo';
//import './components/calendar.jsx'

//import MoonPhaseDisplay from '../components/MoonPhaseDisplay';
//i need to link pictures with the moon phase

//between parenthises is call the function

//get the objects from console coords (1) longitude (2) latitude (nested objects), define 2 state variables. One of them is called longitude and latitude. Inside the callbackfunction use the setter longitude and langitude 
function App() {
  const [longitude,setLongitude] = useState(null);
  const [latitude,setLatitude] = useState(null);
  const [moonData,setMoonData] = useState(null);
  const [locationError,setlocationError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //Gives me the users location
  useEffect(() => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position)=> {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
        setlocationError(null)
      },
      (error) => {
        setlocationError("Location access denied. Please allow location access.");
        console.error("Geolocation error:", error.message);
      });
    } else {
      setlocationError("Geolocation is not supported in this browser.")
    }

  //useEffect(() => {
    if (latitude !== null && longitude !== null) {
      //getLocationName()
      getData();
      //getFunFacts()
    }

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
          if (moonphase > 0.25 && moonphase < 0.50) return "https://upload.wikimedia.org/wikipedia/commons/3/35/Waning_Crescent_Moon%287Sep15%29.jpg";
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

  function getMoonPhaseLabel(moonPhase) {
    if (moonPhase === undefined) return { phase: "Not available", description: "Moon phase data is not available." };
    if (moonPhase === 0 || moonPhase === 1) return { phase: "Full Moon", description: "The Full Moon phase is when the whole face of the moon is illuminated for all to see, due to the fact that the sun and moon are on opposite sides of the earth. The Full Moon phase is thought to be the most powerful of all the moon phases. It brings with it a time to harvest intentions set, celebrate achievement and reap reward. The Full moon is often compared as the Yin to the Yang of the New Moon and as such can represent a period of closure and coming full circle." };
    if (moonPhase > 0 && moonPhase < 0.25) return { phase: "Waning Crescent Moon", description: "This phase is when the moon returns to being an illuminated crescent shape and is the final phase before it enters the new moon period. A Waning Crescent Moon is the perfect time to rest and regenerate. Its a period of self-care; to find inner peace and reconnect with yourself, surrendering all that has happened that is out of our control, before the lunar cycle begins again." };
    if (moonPhase === 0.25) return { phase: "Last Quarter", description: "This is when the moon is illuminated on the left hand side, it is back to its half power phase. This is the time to cleanse yourself, a time to release negativity and old habits that bind you. Let go of all that no longer serves you." };
    if (moonPhase > 0.25 && moonPhase < 0.5) return { phase: "Waning Crescent Moon", description: "Moon phase data is not available." };
    if (moonPhase === 0.5) return { phase: "New Moon", description: "This first phase is when the moon is barely visible, due to the fact that the sun and the moon are on the same side of the earth. This is often referred to as the dark side of the Moon. The New Moon phase is synonymous with fresh starts, limitless possibility and rejuvenation. Its the perfect opportunity to reflect on what has passed, learn from it and put it behind you, as you refresh and begin again."};
    if (moonPhase > 0.5 && moonPhase < 0.75) return { phase: "Waxing Crescent Moon", description: "This phase is when the right side of the moon is illuminated, as the sun beings to move from behind the moon creating a crescent shape. The Waxing Crescent phase is often referred to as the rebuilding phase. Once the moon has re-emerged with new energy, it is the perfect time to set new intentions for the month ahead and work on self-improvement." };
    if (moonPhase === 0.75) return { phase: "First Quarter Moon", description: "During this moon phase, the whole of the right side is illuminated due to the sun and the moon being side by side.The First Quarter Moon phase is often a period where obstacles tend to raise their head and where decisions need to be made. This not a time to hesitate, but a time remove any obstacles and push forward." };
    if (moonPhase > 0.75 && moonPhase < 1) return { phase: "Waxing Gibbous Moon", description: "During this penultimate phase before a Full Moon, only a tiny portion of the moons surface is kept in darkness. Its at this time when you are most likely to see the moon during the day. The Waxing Gibbous Moon phase is a time for reflection. Its a time to look back on the life lessons you have learnt and the internal growth that has come from them and use this to adjust your current goals and life path accordingly."};

    return { phase: "Unknown", description: "Unable to determine moon phase." };
}

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


  //async function getFunFacts() {
    //try {
      
     // }

    // catch (err) {

  console.log(moonData);
  

  return (
    <>
     <h1 id="title">Lunar Glow</h1>
     {locationError && <p>{locationError}</p>}
        {latitude !== null && longitude !== null && (
          <div className="container">
          <LocationInfo latitude={latitude} longitude={longitude} />
        </div>
  )}
      <div className="App">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Moon_rotating_full_160px.gif" className="logo" alt="Moon logo" />

          <p><button className="open-sidebar-btn" onClick={() => setIsSidebarOpen(true)}>
        ☰ Open Sidebar
      </button></p>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✖</button>
        <h2>🌙 Today's Lunar Cycle</h2>
        <p>{getMoonPhaseLabel(moonData?.moonphase).description}</p>
      </div>
      {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
      </div>
     
  {moonData && (
    <div className='moon-phase'>
      <p>Today's moon phase is <strong>{getMoonPhaseLabel(moonData.moonphase).phase} </strong></p>
      <img src={getMoonImage(moonData.moonphase)} alt="Moon Phase" width="100"/>
      <div className="container">
      <p><strong>Moonrise at: </strong> {moonData.moonrise ? moonData.moonrise: "Not available"}</p>
      <p><i>Moonrise is the moment when the Moon becomes visible on the horizon, marking its emergence in the sky.</i></p>
      <p><strong>Moonset at:</strong> {moonData.moonset ? moonData.moonset : "Not available"}</p>
      <p><i>Moonset occurs when the Moon dips below the horizon, marking its disappearance from view. </i></p>
    </div>
    </div>
  )}

  <>
  <link
    href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
    rel="stylesheet"
    type="text/css"
  />
</>
  <div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
    </>
  );
}

export default App