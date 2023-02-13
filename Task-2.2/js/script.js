const links = document.querySelectorAll('.header__link')


links.forEach(function(link) {
    link.addEventListener('click', function () {
        const category = link.dataset.link

        links.forEach(function(link) {
            if (link.dataset.link === category) {
                link.classList.add('active')
            } else if (link.dataset.link !== category) {
                link.classList.remove('active')
            }
        })


        const allItems = document.querySelectorAll('.item')

        allItems.forEach(function (item) {
            if (item.dataset.cat === link.dataset.link) {
                item.classList.remove('hide')
            } else if (link.dataset.link === 'all') {
                item.classList.remove('hide')
            } else {
                item.classList.add('hide')
            }
        })
    })
})