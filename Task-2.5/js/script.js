const apiKey = '0d39bcddc94f240e0d6cc1d589f70ad5'
let cityInput = document.querySelector('#city')
const temp = document.querySelector('.widget__dg')
const feelsLike = document.querySelector('.widget__fl')
let state = document.querySelector('.widget__state')
const city = document.querySelector('.widget__city')
const widgetImg = document.getElementById('widgetImg')
const form = document.getElementById('form')
const day1 = document.getElementById('day1')
const day2 = document.getElementById('day2')
const day3 = document.getElementById('day3')
const day4 = document.getElementById('day4')
const DAY_MILSEC = 24 * 60 * 60 * 1000


const switchImage = (state, way) => {
    switch (state) {
        case 'Clouds':
            way.src = 'img/few-clouds.svg'
            break
        case 'Thunderstorm':
            way.src = 'img/thunder.svg'
            break
        case 'Rain':
            way.src = 'img/rain.svg'
            break
        case 'Drizzle':
            way.src = 'img/rain.svg'
            break
        case 'Snow':
            way.src = 'img/snow.svg'
            break
        case 'Clear':
            way.src = 'img/sunny.svg'
            break
        default:
            way.src = 'img/sunny.svg'
    }
}


const filterList = (item) => {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const dataDate = new Date(item.dt * 1000)
    const today = new Date().getTime()
    const tomorrow = new Date(today + DAY_MILSEC * 1)
    const tomorrowDate = tomorrow.getDate()
    
    if (item.dt_txt.includes(`${tomorrowDate} 12:00:00`)) {
        day1.querySelector('.day__name').innerHTML = daysOfWeek[dataDate.getDay()]
        day1.querySelector('.day__daytime-dg').innerHTML = `${Math.round(item.main.temp)}&#176C`
        const day1State = day1.querySelector('.day__state').innerHTML = item.weather[0].main
        const day1Way = day1.querySelector('.day__image')
        
        switchImage(day1State, day1Way)

    } else if (item.dt_txt.includes(`${tomorrowDate} 03:00:00`)) {
        day1.querySelector('.day__nighttime-dg').innerHTML = `${Math.round(item.main.temp)}&#176C`
    }

    const afterTom = new Date(today + DAY_MILSEC * 2)
    const afterTomDate = afterTom.getDate()

    if (item.dt_txt.includes(`${afterTomDate} 12:00:00`)) {
        day2.querySelector('.day__name').innerHTML = daysOfWeek[dataDate.getDay()]
        day2.querySelector('.day__daytime-dg').innerHTML = `${Math.round(item.main.temp)}&#176C`
        const day2State = day2.querySelector('.day__state').innerHTML = item.weather[0].main
        const day2Way = day2.querySelector('.day__image')

        switchImage(day2State, day2Way)
    
    } else if (item.dt_txt.includes(`${afterTomDate} 03:00:00`)) {
        day2.querySelector('.day__nighttime-dg').innerHTML = `${Math.round(item.main.temp)}&#176C`
    }

    const twoDaysAfter = new Date(today + DAY_MILSEC * 3)
    const twoDaysAfterDate = twoDaysAfter.getDate()

    if (item.dt_txt.includes(`${twoDaysAfterDate} 12:00:00`)) {
        day3.querySelector('.day__name').innerHTML = daysOfWeek[dataDate.getDay()]
        day3.querySelector('.day__daytime-dg').innerHTML = `${Math.round(item.main.temp)}&#176C`
        const day3State = day3.querySelector('.day__state').innerHTML = item.weather[0].main
        const day3Way = day3.querySelector('.day__image')

        switchImage(day3State, day3Way)

    } else if (item.dt_txt.includes(`${twoDaysAfterDate} 03:00:00`)) {
        day3.querySelector('.day__nighttime-dg').innerHTML = `${Math.round(item.main.temp)}&#176C`
    }

    const threeDaysAfter = new Date(today + DAY_MILSEC * 4)
    const threeDaysAfterDate = threeDaysAfter.getDate()

    if (item.dt_txt.includes(`${threeDaysAfterDate} 12:00:00`)) {
        day4.querySelector('.day__name').innerHTML = daysOfWeek[dataDate.getDay()]
        day4.querySelector('.day__daytime-dg').innerHTML = `${Math.round(item.main.temp)}&#176C`
        const day4State = day4.querySelector('.day__state').innerHTML = item.weather[0].main
        const day4Way = day4.querySelector('.day__image')

        switchImage(day4State, day4Way)

    } else if (item.dt_txt.includes(`${threeDaysAfterDate} 03:00:00`)) {
        day4.querySelector('.day__nighttime-dg').innerHTML = `${Math.round(item.main.temp)}&#176C`
    }
}

const fetchData = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=metric`)
    const data = await res.json()
    
    temp.innerHTML = `${Math.round(data.list[0].main.temp)}&#176C`

    feelsLike.innerHTML = `Feels like ${Math.round(data.list[0].main.feels_like)}&#176C`

    widgetState = state.innerHTML = `${data.list[0].weather[0].main}`

    city.innerHTML = `${data.city.name}, ${data.city.country}`

    const widgetImg = document.getElementById('widgetImg')

    switchImage(widgetState, widgetImg)

    const list = data.list
    list.filter(filterList)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    fetchData()
})

fetchData()