import { useState, useEffect } from 'react'
import './App.css'
import MoonPhaseDisplay from '../components/MoonPhaseDisplay';



//between parenthises is call the function
//get the objects from console coords (1) longitude (2) latitude (nested objects), define 2 state variables. One of them is called longitude and latitude. Inside the callbackfunction use the setter longitude and langitude 
function App() {
  const [longitude,setLongitude] = useState(null);
  const [latitude,setLatitude] = useState(null);
  const [moonData,setMoonData] = useState(null);
  const [locationError,setlocationError] = useState(null);

  //Code for requesting user's location
  useEffect(() => {
    console.log(navigator.geolocation.getCurrentPosition((position)=>{
      setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
        setMoonData(position.coords.moonData);
        setlocationError(null);
      }));},[])
 

  async function getData() {
    const APIkey = "ZG5V5DBKMD9CUQNPSFZWSNMAF";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=us&key=${APIkey}&include=days&elements=datetime,moonphase,moonrise,moonset`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      setMoonData(json.days[0]);
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <>
      <div className="App">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Moon_rotating_full_160px.gif" className="logo" alt="Moon logo" />
      </div>
      <h1>Moon Phase</h1>
      <div>
        <p>longitude {longitude},</p>
        <p>latitude {latitude}</p>
        <p>Moon Data {moonData},</p>
      </div>
    </>
  )
}

export default App
