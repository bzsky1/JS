const addInput = document.querySelector('.list__add-input')
const submit = document.querySelector('.list__submit')
const form = document.querySelector('#form')
const listItems = document.querySelector('.list__items')
const clear = document.querySelector('.list__clear-btn')

let toDoList = []

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
    
    listItems.prepend(item)
    let itemData = {
        title: `${addInput.value}`,
        isDone: false
    }
    toDoList.unshift(itemData)
    localStorage.setItem('todos', JSON.stringify(toDoList))
}


const deleteButton = () => {
    let deleteButtons = document.querySelectorAll('.item__delete-image')
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            deleteButtons[i].parentElement.parentElement.remove()

            toDoList = toDoList.filter((el) => {
                if (el.title !== `${deleteButtons[i].parentElement.parentElement.querySelector('.item__name').innerHTML}`) {
                    return el
                }
            })

            localStorage.setItem('todos', JSON.stringify(toDoList))
        })
    }
}


const checkChecked = () => {
    let checkboxs = document.querySelectorAll('.item__input')
    for (let i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener('click', () => {
            if (checkboxs[i].checked) {

                toDoList.filter((el) => {
                    if (el.title === `${checkboxs[i].parentElement.querySelector('.item__name').innerHTML}`) {
                        el.isDone = true
                        localStorage.setItem('todos', JSON.stringify(toDoList))
                    }
                })

            } else {
                toDoList.filter((el) => {
                    if (el.title === `${checkboxs[i].parentElement.querySelector('.item__name').innerHTML}`) {
                        el.isDone = false
                        localStorage.setItem('todos', JSON.stringify(toDoList))
                    }
                })   
                
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
    clearBtn()
})

const clearBtn = () => {
    clear.addEventListener('click', () => {
        listItems.innerHTML = ''
        localStorage.clear()
    })
}

window.addEventListener('load', () => {
    if (localStorage.length > 0) {
        toDoList = JSON.parse(localStorage.getItem('todos')) || []
        
        toDoList.filter((el) => {
            if (el.title) {
                let item = document.createElement('div')
                if (el.isDone === false) {
                    item.innerHTML = `
                                    <div class="list__item item">
                                        <label class="item__label">
                                            <span class="item__name">${el.title}</span>
                                            <input type="checkbox" class="item__input">
                                            <img src="img/done.svg" class="item__check">
                                        </label>
                                        <div class="item__delete">
                                            <img class="item__delete-image" src="img/bin.svg">
                                        </div>
                                    </div>`
                    
                } else if (el.isDone === true) {
                    item.innerHTML = `
                                    <div class="list__item item">
                                        <label class="item__label">
                                            <span class="item__name">${el.title}</span>
                                            <input checked type="checkbox" class="item__input">
                                            <img src="img/done.svg" class="item__check">
                                        </label>
                                        <div class="item__delete">
                                            <img class="item__delete-image" src="img/bin.svg">
                                        </div>
                                    </div>`
                }
                listItems.append(item)
            }
        })
        deleteButton()
        checkChecked()
    }
})
clearBtn()