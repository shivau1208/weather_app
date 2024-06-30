import {locationAPI,apiKey,apiURL} from './config.js'
        const searchBtn = document.getElementsByTagName('button')
        searchBtn[0].addEventListener('click',async()=>{
            let inputText = document.querySelector('.cityName').value;
            fetchWeatherDetails(inputText)
        })
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(Position,Failed);
        }
        function Position(position){
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            fetchCurrentLocation(lat,long)
        }
        function Failed(){
            alert('Failed to Locate')
        }
        async function fetchCurrentLocation(lat,long){
            const response = await fetch(`${locationAPI}&lat=${lat}&lon=${long}&format=json`);
            const data = await response.json();
            var city = data.address.city
            fetchWeatherDetails(city)
        }
        const fetchWeatherDetails = async(inputText)=>{
            try{

                const data = await fetch(`${apiURL}?q=${inputText}&appid=${apiKey}&units=metric`)
                const response = await data.json()
                document.querySelector('.temp').textContent = Math.round(response.main.temp)+'°C';       
                document.querySelector('.city').textContent = response.name;       
                document.querySelector('.humidity').textContent = response.main.humidity+'%';       
                document.querySelector('.wind').textContent = response.wind.speed+'km/h';
                let i =response.weather[0].main.toLowerCase()
                document.querySelector('.weather-icon').src='/images/'+i+'.png'
            }catch(err){
                console.log(err)
                alert('Please type city name correctly')
            }

        }