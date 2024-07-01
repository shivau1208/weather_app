import {apiKey,apiURL} from './config.js'
        const searchBtn = document.getElementsByTagName('button')
        searchBtn[0].addEventListener('click',async()=>{
            let inputText = document.querySelector('.cityName').value;
            fetchWeatherDetails(null,null,inputText)
        })
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(Position,Failed);
        }
        function Position(position){
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            fetchWeatherDetails(lat,long,null)
        }
        function Failed(){
            alert('Failed to Locate')
        }
        const fetchWeatherDetails = async(lat,long,inputText)=>{
            if(!inputText){
                const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
                const response = await data.json()
                if(response?.cod == 200){
                    document.querySelector('.temp').textContent = Math.round(response?.main?.temp)+'°C';       
                    document.querySelector('.city').textContent = response.name;       
                    document.querySelector('.humidity').textContent = response.main.humidity+'%';       
                    document.querySelector('.wind').textContent = response.wind.speed+'km/h';
                    let i =response.weather[0].main.toLowerCase()
                    document.querySelector('.weather-icon').src='/images/'+i+'.png'
                }else{
                    alert(response?.message)
                }
            }else{
                const data = await fetch(`${apiURL}?q=${inputText}&appid=${apiKey}&units=metric`)
                const response = await data.json()
                if(response?.cod == 200){
                    document.querySelector('.temp').textContent = Math.round(response?.main?.temp)+'°C';       
                    document.querySelector('.city').textContent = response.name;       
                    document.querySelector('.humidity').textContent = response.main.humidity+'%';       
                    document.querySelector('.wind').textContent = response.wind.speed+'km/h';
                    let i =response.weather[0].main.toLowerCase()
                    document.querySelector('.weather-icon').src='/images/'+i+'.png'
                }else{
                    alert(response?.message)
                }
            }
            

        }
