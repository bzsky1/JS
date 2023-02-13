const all = document.querySelector('#all')
const salads = document.querySelector('#salads')
const soups = document.querySelector('#soups')
const khachapuri = document.querySelector('#khachapuri')
const desserts = document.querySelector('#desserts')
const content = document.querySelector('.content')
const allItems = document.querySelectorAll('.item')
const links = document.querySelectorAll('.header__link')


all.onclick = () => {
    content.style.rowGap = '10.4vh'
    links.forEach(function(link) {
        if (link.dataset.link === 'all') {
            link.classList.add('active')
        } else if (link.dataset.link !== 'all') {
            link.classList.remove('active')
        }
    })
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
            links.forEach(function(link) {
                if (link.dataset.link === 'salads') {
                    link.classList.add('active')
                } else if (link.dataset.link !== 'salads') {
                    link.classList.remove('active')
                }
            })
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
            links.forEach(function(link) {
                if (link.dataset.link === 'soups') {
                    link.classList.add('active')
                } else if (link.dataset.link !== 'soups') {
                    link.classList.remove('active')
                }
            })
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
            links.forEach(function(link) {
                if (link.dataset.link === 'khachapuri') {
                    link.classList.add('active')
                } else if (link.dataset.link !== 'khachapuri') {
                    link.classList.remove('active')
                }
            })
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
            links.forEach(function(link) {
                if (link.dataset.link === 'desserts') {
                    link.classList.add('active')
                } else if (link.dataset.link !== 'desserts') {
                    link.classList.remove('active')
                }
            })
        } else if (item.dataset.cat !== 'desserts') {
            item.style.display = 'none'
        }
    })
}