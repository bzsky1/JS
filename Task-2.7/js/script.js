const filterButton = document.querySelector('.dropdown__button')
const dropdownList = document.querySelector('.dropdown__list')
const mainCountries = document.querySelector('.main__countries')
const dropdownInput = document.querySelector('.dropdown__input')
const search = document.querySelector('.main__search-input')
const darkModeButton = document.querySelector('.header__dark-mode')
const lightModeButton = document.querySelector('.header__light-mode')
const mode = document.querySelector('.header__input')
const er = document.querySelector('.error')

let countries = []

const addCountries = (country) => {
    if (mode.value === 'light') {
        let el = document.createElement('div')
        el.innerHTML = `
                    <div class="main__country country">
                        <div class="country__img">
                            <img src="${country.flags.svg}">
                        </div>
                        <div class="country__info">
                            <div class="country__name">${country.name.common}</div>
                            <div class="country__population">Population: ${country.population}</div>
                            <div class="country__reg">Region: ${country.region}</div>
                            <div class="country__capital">Capital: ${country.capital[0]}</div>
                        </div>
                    </div>`
        mainCountries.append(el)
    } else {
        let el = document.createElement('div')
        el.innerHTML = `
                    <div class="main__country country country-dark">
                        <div class="country__img">
                            <img src="${country.flags.svg}">
                        </div>
                        <div class="country__info">
                            <div class="country__name">${country.name.common}</div>
                            <div class="country__population">Population: ${country.population}</div>
                            <div class="country__reg">Region: ${country.region}</div>
                            <div class="country__capital">Capital: ${country.capital[0]}</div>
                        </div>
                    </div>`
        mainCountries.append(el)
    }
}


const fetchData = async () => {
    const res = await fetch('https://restcountries.com/v3.1/alpha?codes=col,pe,at,ao,nl,bj,cw,cz,dk,eg,fi,au,fj,hn,hk,in,iq,jp,jm,xk,la,lv,mr,nz,ua,sw,gb,tm,pt,mx,br,us,it')
    // const res = await fetch('https://restcountries.com/v3.1/all')
    const data = await res.json()

    countries = data

    countries.sort(function (a, b) {
        if (a.region > b.region) {
            return 1
        } else if (a.region < b.region) {
            return -1
        } else {
            return 0
        }
    }) 
    countries.filter(addCountries)
}


darkModeButton.addEventListener('click', () => {
    darkModeButton.style.display = 'none'
    lightModeButton.style.display = 'flex'
    mode.value = 'dark'

    document.querySelector('.header').classList.add('header-dark')
    document.querySelector('.main__search').classList.add('search-dark')
    document.querySelector('.main__search-input').classList.add('search-dark')
    document.querySelector('.dropdown__button').classList.add('search-dark')
    document.querySelector('.dropdown__list').classList.add('search-dark')
    document.querySelectorAll('.country').forEach((country) => {
        country.classList.add('country-dark')
    })
    document.querySelector('.body').classList.add('body-dark')
})

lightModeButton.addEventListener('click', () => {
    lightModeButton.style.display = 'none'
    darkModeButton.style.display = 'flex'
    mode.value = 'light'

    document.querySelector('.header').classList.remove('header-dark')
    document.querySelector('.main__search').classList.remove('search-dark')
    document.querySelector('.main__search-input').classList.remove('search-dark')
    document.querySelector('.dropdown__button').classList.remove('search-dark')
    document.querySelector('.dropdown__list').classList.remove('search-dark')
    document.querySelectorAll('.country').forEach((country) => {
        country.classList.remove('country-dark')
    })
    document.querySelector('.body').classList.remove('body-dark')
})


filterButton.addEventListener('click', (e) => {
    e.preventDefault()
    dropdownList.classList.toggle('dropdown__list--visible')
})


document.querySelectorAll('.dropdown__list-item').forEach((item) => {
    item.addEventListener('click', () => {
        filterButton.innerText = item.innerHTML
        dropdownInput.value = item.dataset.dropdownValue
        dropdownList.classList.remove('dropdown__list--visible')

        if (dropdownInput.value === 'region') {
            countries.sort(function (a, b) {
                if (a.region > b.region) {
                    return 1
                } else if (a.region < b.region) {
                    return -1
                } else {
                    return 0
                }
            }) 
            mainCountries.innerHTML = ''
            countries.filter(addCountries)
        } else {
            countries.sort(function (a, b) {
                if (a.population < b.population) {
                    return 1
                } else if (a.population > b.population) {
                    return -1
                } else {
                    return 0
                }
            }) 
            mainCountries.innerHTML = ''
            countries.filter(addCountries)
        }
    })
})
 
search.addEventListener('input', () => {
    if (search.value !== '') {
        mainCountries.innerHTML = ''
        countries.filter((country) => {
            if (country.name.common.toLowerCase().includes(`${search.value.toLowerCase()}`) && country.name.common.toLowerCase().startsWith(`${search.value.toLowerCase()}`)) {
                addCountries(country)
            }
        })
    } else if (search.value === '') {
        mainCountries.innerHTML = ''
        countries.filter(addCountries)
    } 
    
    const countryOnPage = document.querySelector('.country')

    if (countryOnPage === null) {
        er.style.display = 'block'
        mainCountries.before(er)
    } else {
        er.style.display = 'none'
    }
})

document.addEventListener('click', (e) => {
    if (e.target !== filterButton) {
        dropdownList.classList.remove('dropdown__list--visible')
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' || e.key === 'Escape') {
        dropdownList.classList.remove('dropdown__list--visible')
    }
})

fetchData()