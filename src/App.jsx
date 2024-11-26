import { useState } from 'react'
import './App.css'

function App() {
    const [value,setValue] = useState('');
    const [weatherObj,setWeatherobj] = useState({
        temp:'--',
        location:'--',
        date:'--',
        time:'--',
        condition:'--',
        src:'--'
    })
    const handleClick = async() =>{
        if(value!=''){
            const data = await fetchWeather(value);
            if (data==null){
                alert('no data found for this location');
                return
            }else{
                const temp = data.current.temp_c;
                const location = data.location.name;
                const timeData = data.location.localtime;
                const [date,time] = timeData.split(' '); 
                const src=data.current.condition.icon;
                const condition = data.current.condition.text;

                let newObj={
                    temp: temp,
                    location: location,
                    date: date,
                    time: time,
                    condition: condition,
                    src: src
                }
               
                setWeatherobj(newObj);
                setValue("");
            }
            
        }else{
            alert("location can't be empty");
        }
    }
const handleInput = (e) =>{
    setValue(e.target.value);
}

async function fetchWeather(location){
    const url = `http://api.weatherapi.com/v1/current.json?key=6fc74cf82bc44773a8a171855241407&q=${location}&aqi=no`
    const response = await fetch(url);
    if(response.status==400){
        alert('location is invalid');
        return;
    }
    else{
        return await response.json()
    }
}
  return (
    <>
    <header className='h-[150px] bg-[#2c3e50] flex 
    justify-center items-center'>
        <div className="w-[60%] flex justify-between">
            <input type="text" name="" id=""
             placeholder="Enter Location" 
             className="text-[1.1rem] outline-none text-white 
             bg-transparent py-[1rem] px-0 border-b-2 border-white
             w-[84%]" onChange={handleInput}
             />
            <button id="search" className="bg-[#44ad96]
            text-[1.1rem] text-white border-none cursor-pointer
            py-[1rem] px-[2rem]" onClick={handleClick}>Search</button>
        </div>
    </header>
    <main className='h-[calc(100vh-150px)] flex items-center 
    justify-center text-white bg-[#01161E]'>
        <div className="flex gap-[1rem] items-center h-[5rem]">
            <div className="temprature">{weatherObj.temp}°C</div>
            <div className="location-date">
                <div className="text-[2rem] mb-[1.6rem]">{weatherObj.location}</div>
                <span className="time">{weatherObj.time}</span>
                <span className="Date">{weatherObj.date}</span>
            </div>
            <div className="weather-state">
                <img src={weatherObj.src} className="emoji" alt=""/>
                <div className="text-center">{weatherObj.condition}</div>
            </div>
        </div>    
    </main>
    </>
  )
}

export default App
