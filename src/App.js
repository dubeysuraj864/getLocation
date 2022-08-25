import { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather.js';



function App() {

  const[latitude, setLatitude] = useState([]);
  const[longitude, setLongitude]= useState([]);
  const[data, setData]= useState([])

  useEffect(() => {

    const fetchData = async () =>{
    navigator.geolocation.getCurrentPosition(function(position){
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=dbbedde9ee53a9bcac9ac6dc3d629413`);

    const data = await response.json();
     setData(data);
    console.log(data)

    console.log("lati:", latitude)
    console.log("longi:", longitude)
  }
   
  fetchData();

  },[latitude, longitude]);

  return (
    <div className="App">
      Weather App
      <br />

      <h1>{data.name}</h1>

       {
      (typeof data.main != 'undefined') ? (
        <Weather prop={data} />
      ) : (
        <div></div>
      )}
     
    </div>
  );
}

export default App;
