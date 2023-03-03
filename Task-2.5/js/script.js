const apiKey = '0d39bcddc94f240e0d6cc1d589f70ad5'
let cityInput = document.querySelector('#city')
const temp = document.querySelector('.widget__dg')
const feelsLike = document.querySelector('.widget__fl')
let state = document.querySelector('.widget__state')
const city = document.querySelector('.widget__city')
const widgetImg = document.getElementById('widgetImg')
const form = document.getElementById('form')
const daysColumn = document.querySelector('.widget__column')
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


const changeHTML = (item, night) => {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const dataDate = new Date(item.dt * 1000)

    let day = document.createElement('div')
    day.innerHTML = `<div class="widget__day day">
                            <div class="day__row">
                                <div class="day__name">${daysOfWeek[dataDate.getDay()]}</div>
                                <div class="day__img">
                                    <img src="img/rain.svg" class="day__image">
                                </div>
                                <div class="day__state">Rain</div>
                                <div class="day__dg">
                                    <div class="day__dg-group">
                                        <div class="day__daytime-dg">
                                            ${Math.round(item.main.temp)}&#176C
                                        </div>
                                        <div class="day__nighttime-dg">
                                            ${night}
                                        </div>
                                    </div>
                                    <img src="img/temperature.svg">
                                </div>
                            </div>
                        </div>`

    const dayState = day.querySelector('.day__state').innerHTML = item.weather[0].main
    const dayWay = day.querySelector('.day__image')
    switchImage(dayState, dayWay)

    daysColumn.append(day)
}


const changeHTMLNight = (item) => {
    return `${Math.round(item.main.temp)}&#176C`
} 


const filterList = (item) => {
    const today = new Date().getTime()
    const tomorrow = new Date(today + DAY_MILSEC * 1)
    const tomorrowDate = tomorrow.getDate()
    const afterTom = new Date(today + DAY_MILSEC * 2)
    const afterTomDate = afterTom.getDate()
    const twoDaysAfter = new Date(today + DAY_MILSEC * 3)
    const twoDaysAfterDate = twoDaysAfter.getDate()
    const threeDaysAfter = new Date(today + DAY_MILSEC * 4)
    const threeDaysAfterDate = threeDaysAfter.getDate()
    const listOfDates= [tomorrowDate, afterTomDate, twoDaysAfterDate, threeDaysAfterDate]
    
    for (let i = 0; i < listOfDates.length; i++) {
        if (item.dt_txt.includes(`${listOfDates[i]} 12:00:00`)) {
            changeHTML(item, night)
        } else if (item.dt_txt.includes(`${listOfDates[i]} 03:00:00`)) {
            night = changeHTMLNight(item)
        }
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

    if (daysColumn.innerHTML !== '') {
        daysColumn.innerHTML = ''
        fetchData()
    } else {
        fetchData()
    }
    
})

fetchData()