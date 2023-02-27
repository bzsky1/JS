let list = data.list

for (let i = 8; i < 16; i++) {
    let dataDate = new Date(list.i.dt)

    if (dataDate.includes('12:00:00')) {
        let day1Day = day1.querySelector('.day__name')
        day1Day.innerHTML = dataDate.substr(0, 2)
    }
}



    if (list[i].dt_txt.includes('12:00:00')) {
        day1.querySelector('.day__name').innerHTML = daysOfWeek[dataDate.getDay()]
    }