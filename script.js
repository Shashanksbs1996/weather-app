const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');
const weatherForecastE1= document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const API_KEY = 'd6680529e62a7d9a2f0c6942486841bf';
setInterval(() =>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hourIn12HrFormat = hour >=13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeE1.innerHTML = hourIn12HrFormat + ':' +minutes+' '+<span id = "am-pm">$(ampm)</span> 

    dateE1.innerHTML = days[day] +','+date+' '+months[month]
}, 1000);
getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition(success) =>{
        console.log(success);

        let {latitude,longitude} = success.coords;

        fetch('https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}').then(res =>res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })
    }
}
function showWeatherData(data){
    let{humidity,pressure,sunrise,sunset,wind_speed}=data.current;
    currentWeatherItemsE1.innerHTML =
    '<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise*1000).formate('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>sunset</div>
        <div>${window.moment(sunrise*1000).formate('HH:mm a')}</div>
    </div>';

    let otherDayForecast =''
    data.daily.forEach(day,idx) => {
        if(idx == 0){

        }else{
            otherDayForecast +='
            <div class="weather-forecast-item">
                <div class="day">${window.moment(sunrise*1000).formate('HH:mm a')}</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - 25.6&#176; C</div>
                <div class="temp">Day - 25.6&#176; C</div>
            </div>
            '
        }
    }
}
