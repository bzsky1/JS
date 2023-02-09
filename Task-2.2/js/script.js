const all = document.querySelector('#all')
const salads = document.querySelector('#salads')
const soups = document.querySelector('#soups')
const khachapuri = document.querySelector('#khachapuri')
const desserts = document.querySelector('#desserts')
const content = document.querySelector('.content')
const allItems = document.querySelectorAll('.item')


all.onclick = () => {
    content.style.rowGap = '10.4vh'
    allItems.forEach(function(item) {
        if (item.dataset.cat !== '0') {
            item.style.display = 'block'
        }
    })
}


salads.onclick = () => {
    content.style.rowGap = '10.4vh'
    allItems.forEach(function(item) {
        if (item.dataset.cat === 'salads') {
            item.style.display = 'block'
        } else if (item.dataset.cat !== 'salad') {
            item.style.display = 'none'
        }
    })
}


soups.onclick = () => {
    content.style.rowGap = '10.4vh'
    allItems.forEach(function(item) {
        if (item.dataset.cat === 'soups') {
            item.style.display = 'block'
        } else if (item.dataset.cat !== 'soups') {
            item.style.display = 'none'
        }
    })
}


khachapuri.onclick = () => {
    content.style.rowGap = '10.4vh'
    allItems.forEach(function(item) {
        if (item.dataset.cat === 'khachapuri') {
            item.style.display = 'block'
        } else if (item.dataset.cat !== 'khachapuri') {
            item.style.display = 'none'
        }
    })
}


desserts.onclick = () => {
    content.style.rowGap = '10.4vh'
    allItems.forEach(function(item) {
        if (item.dataset.cat === 'desserts') {
            item.style.display = 'block'
        } else if (item.dataset.cat !== 'desserts') {
            item.style.display = 'none'
        }
    })
}