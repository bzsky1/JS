const addInput = document.querySelector('.list__add-input')
const submit = document.querySelector('.list__submit')
const form = document.querySelector('#form')
const listItems = document.querySelector('.list__items')
const clear = document.querySelector('.list__clear-btn')


const newItem = () => {
    let item = document.createElement('div')
    item.innerHTML = `
                    <div class="list__item item">
                        <label class="item__label">
                            <span class="item__name">${addInput.value}</span>
                            <input type="checkbox" class="item__input">
                            <img src="img/done.svg" class="item__check">
                        </label>
                        <div class="item__delete">
                            <img class="item__delete-image" src="img/bin.svg">
                        </div>
                    </div>`
    
    listItems.append(item)
    localStorage.setItem(`_${addInput.value}`, `${addInput.value}`)
}


const deleteButton = () => {
    let deleteButtons = document.querySelectorAll('.item__delete-image')
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            deleteButtons[i].parentElement.parentElement.remove()

            localStorage.removeItem(`_${deleteButtons[i].parentElement.parentElement.querySelector('.item__name').innerHTML}`)
            localStorage.removeItem(`${deleteButtons[i].parentElement.parentElement.querySelector('.item__name').innerHTML}-checked`)
        })
    }
}


const checkChecked = () => {
    let checkboxs = document.querySelectorAll('.item__input')
    for (let i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener('click', () => {
            if (checkboxs[i].checked) {
                localStorage.removeItem(`_${checkboxs[i].parentElement.querySelector('.item__name').innerHTML}`)
                localStorage.setItem(`${checkboxs[i].parentElement.querySelector('.item__name').innerHTML}-checked`, `${checkboxs[i].parentElement.querySelector('.item__name').innerHTML}`)
            } else {
                localStorage.removeItem(`${checkboxs[i].parentElement.querySelector('.item__name').innerHTML}-checked`)
                localStorage.setItem(`_${checkboxs[i].parentElement.querySelector('.item__name').innerHTML}`, `${checkboxs[i].parentElement.querySelector('.item__name').innerHTML}`)
            }
        })
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (addInput.value !== '') {
        addInput.style.backgroundColor = 'white'
        newItem()
        addInput.value = ''
    } else {
        addInput.style.backgroundColor = 'red'
    }

    deleteButton()
    checkChecked()
})

clear.addEventListener('click', () => {
    listItems.innerHTML = ''
    localStorage.clear()
})

window.addEventListener('load', () => {
    if (localStorage.length > 0) {
        for (key in localStorage) {
            let item = document.createElement('div')
            if (key.includes('_')) {
                item.innerHTML = `
                                <div class="list__item item" id="${localStorage[key]}">
                                    <label class="item__label">
                                        <span class="item__name">${localStorage[key]}</span>
                                        <input type="checkbox" class="item__input">
                                        <img src="img/done.svg" class="item__check">
                                    </label>
                                    <div class="item__delete">
                                        <img class="item__delete-image" src="img/bin.svg">
                                    </div>
                                </div>`

                listItems.append(item)

            } else if (key.includes(`${localStorage[key]}-checked`)) {
                item.innerHTML = `
                                <div class="list__item item">
                                    <label class="item__label">
                                        <span class="item__name">${localStorage[key]}</span>
                                        <input type="checkbox" checked class="item__input">
                                        <img src="img/done.svg" class="item__check">
                                    </label>
                                    <div class="item__delete">
                                        <img class="item__delete-image" src="img/bin.svg">
                                    </div>
                                </div>`

                listItems.append(item)

            }
        }
        deleteButton()
        checkChecked()
    }
})