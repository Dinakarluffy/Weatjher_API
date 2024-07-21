// For APi key go to this website
//https://home.openweathermap.org/api_keys
//If you want to get seperate city wether got  to https://openweathermap.org/current
//And Find api call example =https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherForm =document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");   
const card=document.querySelector(".card");  
const apikey ="a48578d6b29d2e8086065a0acfa8d17c";

weatherForm.addEventListener("submit",async event =>{

    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const WeatherData = await getWeatherData(city);
            displayWeatherInfo(WeatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Enter a city")
    }

});

async function getWeatherData(city){
   const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

   const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();

}

function displayWeatherInfo(data){
    //main,name,weather objects 
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]} = data;
         
    card.textContent ="";
    card.style.display ="flex";
    const cityDisplay = document.createElement("h1");
    const tempDislay = document.createElement("p");
    const humidityDislay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

   cityDisplay.textContent =city;
   tempDislay.textContent=`${(temp-273.15).toFixed(2)}℃`;
   humidityDislay.textContent =`Humidity:${humidity}`;
   descDisplay.textContent=description;
   weatherEmoji.textContent=getWeatherEmoji(id);

   cityDisplay.classList.add("cityDisplay");
   tempDislay.classList.add("tempDisplay");
   humidityDislay.classList.add("humidityDisplay");
   descDisplay.classList.add("descDisplay");
   weatherEmoji.classList.add("weatherEmoji");

   card.appendChild(cityDisplay);
   card.appendChild(tempDislay);
   card.appendChild(humidityDislay);
   card.appendChild(descDisplay);   
   card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherid){

    switch(true){
        case (weatherid >=200 && weatherid<300):
            return "⚡";
            break;
        case (weatherid >=300 && weatherid<400):
            return "🌧";
             break;
        case (weatherid >=500 && weatherid<600):
            return "🌧";
            break;
        case (weatherid >=600 && weatherid<700):
            return "❄";
            break;
        case (weatherid >=700 && weatherid<800):
            return "🌫";
            break;
        case (weatherid === 800): 
            return "☀";
            break;
        case (weatherid >=801 && weatherid<810):
            return "☁";
            break;
        default:
            return "⁉";


                
    }
}

function displayError(message){
   const errorDisplay =document.createElement("p");
   errorDisplay.textContent= message;
   errorDisplay.classList.add("errorDisplay");

   card.textContent ="";
   card.style.display ="flex";
   card.appendChild(errorDisplay);
}