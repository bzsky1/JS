const apiKey = '0d39bcddc94f240e0d6cc1d589f70ad5'
let cityInput = document.querySelector('#city')
const temp = document.querySelector('.widget__dg')
const feelsLike = document.querySelector('.widget__fl')
const state = document.querySelector('.widget__state')
const city = document.querySelector('.widget__city')
const widgetImg = document.getElementById('widgetImg')
const form = document.getElementById('form')
const day1 = document.getElementById('day1')
const day2 = document.getElementById('day2')
const day3 = document.getElementById('day3')
const day4 = document.getElementById('day4')
const DAY_MILSEC = 24 * 60 * 60 * 1000


const fetchData = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=metric`)
    const data = await res.json()

    
    temp.innerHTML = `${Math.round(data.list[0].main.temp)}&#176C`

    feelsLike.innerHTML = `Feels like ${Math.round(data.list[0].main.feels_like)}&#176C`

    state.innerHTML = `${data.list[0].weather[0].main}`

    city.innerHTML = `${data.city.name}, ${data.city.country}`

    if (state.innerHTML === 'Clouds') {
        widgetImg.src = 'img/few-clouds.svg'
    } else if (state.innerHTML === 'Thunderstorm') {
        widgetImg.src = 'img/thunder.svg'
    } else if (state.innerHTML === 'Rain' || state.innerHTML === 'Drizzle') {
        widgetImg.src = 'img/rain.svg'
    } else if (state.innerHTML === 'Snow') {
        widgetImg.src = 'img/snow.svg'
    }  else if (state.innerHTML === 'Clear') {
        widgetImg.src = 'img/sunny.svg'
    }


    let list = data.list
    let daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

    for (let i = 0; i < 40; i++) {
        let dataDate = new Date(list[i].dt * 1000)
        let today = new Date().getTime()
        let tomorrow = new Date(today + DAY_MILSEC * 1)
        let tomorrowDate = tomorrow.getDate()
        
        if (list[i].dt_txt.includes(`${tomorrowDate} 12:00:00`)) {
            day1.querySelector('.day__name').innerHTML = daysOfWeek[dataDate.getDay()]
            day1.querySelector('.day__state').innerHTML = list[i].weather[0].main
            day1.querySelector('.day__daytime-dg').innerHTML = `${Math.round(list[i].main.temp)}&#176C`


            if (day1.querySelector('.day__state').innerHTML === 'Clouds') {
                day1.querySelector('.day__image').src = 'img/few-clouds.svg'
            } else if (day1.querySelector('.day__state').innerHTML === 'Thunderstorm') {
                day1.querySelector('.day__image').src = 'img/thunder.svg'
            } else if (day1.querySelector('.day__state').innerHTML === 'Rain' || day1.querySelector('.day__state').innerHTML === 'Drizzle') {
                day1.querySelector('.day__image').src = 'img/rain.svg'
            } else if (day1.querySelector('.day__state').innerHTML === 'Snow') {
                day1.querySelector('.day__image').src = 'img/snow.svg'
            }  else if (day1.querySelector('.day__state').innerHTML === 'Clear') {
                day1.querySelector('.day__image').src = 'img/sunny.svg'
            }

        } else if (list[i].dt_txt.includes(`${tomorrowDate} 03:00:00`)) {
            day1.querySelector('.day__nighttime-dg').innerHTML = `${Math.round(list[i].main.temp)}&#176C`
        }

        let afterTom = new Date(today + DAY_MILSEC * 2)
        let afterTomDate = afterTom.getDate()

        if (list[i].dt_txt.includes(`${afterTomDate} 12:00:00`)) {
            day2.querySelector('.day__name').innerHTML = daysOfWeek[dataDate.getDay()]
            day2.querySelector('.day__state').innerHTML = list[i].weather[0].main
            day2.querySelector('.day__daytime-dg').innerHTML = `${Math.round(list[i].main.temp)}&#176C`

            if (day2.querySelector('.day__state').innerHTML === 'Clouds') {
                day2.querySelector('.day__image').src = 'img/few-clouds.svg'
            } else if (day2.querySelector('.day__state').innerHTML === 'Thunderstorm') {
                day2.querySelector('.day__image').src = 'img/thunder.svg'
            } else if (day2.querySelector('.day__state').innerHTML === 'Rain' || day2.querySelector('.day__state').innerHTML === 'Drizzle') {
                day2.querySelector('.day__image').src = 'img/rain.svg'
            } else if (day2.querySelector('.day__state').innerHTML === 'Snow') {
                day2.querySelector('.day__image').src = 'img/snow.svg'
            }  else if (day2.querySelector('.day__state').innerHTML === 'Clear') {
                day2.querySelector('.day__image').src = 'img/sunny.svg'
            }
        
        } else if (list[i].dt_txt.includes(`${afterTomDate} 03:00:00`)) {
            day2.querySelector('.day__nighttime-dg').innerHTML = `${Math.round(list[i].main.temp)}&#176C`
        }

        let twoDaysAfter = new Date(today + DAY_MILSEC * 3)
        let twoDaysAfterDate = twoDaysAfter.getDate()

        if (list[i].dt_txt.includes(`${twoDaysAfterDate} 12:00:00`)) {
            day3.querySelector('.day__name').innerHTML = daysOfWeek[dataDate.getDay()]
            day3.querySelector('.day__state').innerHTML = list[i].weather[0].main
            day3.querySelector('.day__daytime-dg').innerHTML = `${Math.round(list[i].main.temp)}&#176C`

            if (day3.querySelector('.day__state').innerHTML === 'Clouds') {
                day3.querySelector('.day__image').src = 'img/few-clouds.svg'
            } else if (day3.querySelector('.day__state').innerHTML === 'Thunderstorm') {
                day3.querySelector('.day__image').src = 'img/thunder.svg'
            } else if (day3.querySelector('.day__state').innerHTML === 'Rain' || day3.querySelector('.day__state').innerHTML === 'Drizzle') {
                day3.querySelector('.day__image').src = 'img/rain.svg'
            } else if (day3.querySelector('.day__state').innerHTML === 'Snow') {
                day3.querySelector('.day__image').src = 'img/snow.svg'
            }  else if (day3.querySelector('.day__state').innerHTML === 'Clear') {
                day3.querySelector('.day__image').src = 'img/sunny.svg'
            }

        } else if (list[i].dt_txt.includes(`${twoDaysAfterDate} 03:00:00`)) {
            day3.querySelector('.day__nighttime-dg').innerHTML = `${Math.round(list[i].main.temp)}&#176C`
        }


        let threeDaysAfter = new Date(today + DAY_MILSEC * 4)
        let threeDaysAfterDate = threeDaysAfter.getDate()

        if (list[i].dt_txt.includes(`${threeDaysAfterDate} 12:00:00`)) {
            day4.querySelector('.day__name').innerHTML = daysOfWeek[dataDate.getDay()]
            day4.querySelector('.day__state').innerHTML = list[i].weather[0].main
            day4.querySelector('.day__daytime-dg').innerHTML = `${Math.round(list[i].main.temp)}&#176C`

            if (day4.querySelector('.day__state').innerHTML === 'Clouds') {
                day4.querySelector('.day__image').src = 'img/few-clouds.svg'
            } else if (day4.querySelector('.day__state').innerHTML === 'Thunderstorm') {
                day4.querySelector('.day__image').src = 'img/thunder.svg'
            } else if (day4.querySelector('.day__state').innerHTML === 'Rain' || day4.querySelector('.day__state').innerHTML === 'Drizzle') {
                day4.querySelector('.day__image').src = 'img/rain.svg'
            } else if (day4.querySelector('.day__state').innerHTML === 'Snow') {
                day4.querySelector('.day__image').src = 'img/snow.svg'
            }  else if (day4.querySelector('.day__state').innerHTML === 'Clear') {
                day4.querySelector('.day__image').src = 'img/sunny.svg'
            }

        } else if (list[i].dt_txt.includes(`${threeDaysAfterDate} 03:00:00`)) {
            day4.querySelector('.day__nighttime-dg').innerHTML = `${Math.round(list[i].main.temp)}&#176C`
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    fetchData()
})

fetchData()