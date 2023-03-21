const cartButton = document.querySelector('.header__cart')
const cart = document.querySelector('.cart')
const cartInside = document.querySelector('.cart-inside')
const cartItems = document.querySelector('.cart__items')
const addToCartButtons = document.querySelectorAll('.item__add-button')

let itemsInCartLS = []


const checkCart = () => {
    let listOfItemsInCart = cartItems.querySelectorAll('.cart-item')
    if (listOfItemsInCart.length === 0) {
        cartInside.style.display = 'none'
    } else {
        cartInside.style.display = 'block'
        cartInside.innerText = listOfItemsInCart.length
    }
}


const removeButton = () => {
    let removeButtons = document.querySelectorAll('.cart-item__remove')
    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.remove()

            itemsInCartLS = itemsInCartLS.filter((item) => {
                if (item.name !== `${button.parentElement.querySelector('.cart-item__name').innerText}`) {
                    return item
                }
            })

            localStorage.setItem('items', JSON.stringify(itemsInCartLS))

            addToCartButtons.forEach((btn) => {
                if (btn.parentElement.parentElement.innerHTML.includes(button.parentElement.parentElement.querySelector('.cart-item__name').innerHTML)) {
                    btn.innerText = 'Add to cart'
                }
            })
            checkCart()
            totalPrice()
        })
    })
}


const totalPrice = () => {
    let total = document.querySelector('.cart__total')
    let listOfItemsInCart = cartItems.querySelectorAll('.cart-item')

    if (listOfItemsInCart.length === 0) {
        total.innerText = 'Total: € 0'
    } else {
        let listOfPrices = document.querySelectorAll('.cart-item__price')
        let finalPrice = 0

        listOfPrices.forEach((price) => {
            const amountOfItems = price.parentElement.parentElement.querySelector('.cart-item__amount-digit')
            finalPrice += (Number(price.innerText.slice(2)) * Number(amountOfItems.innerText))
        })

        total.innerText = `Total: € ${finalPrice.toFixed(2)}`
    }
}

const amountUpAndDownButtons = () => {
    const total = document.querySelector('.cart__total')
    const cartItemAmountUpButtons = document.querySelectorAll('.cart-item__amount-up')
    const cartItemAmountDownButtons = document.querySelectorAll('.cart-item__amount-down')

    cartItemAmountUpButtons.forEach((button) => {
        const amount = button.parentElement.querySelector('.cart-item__amount-digit')
        const itemPrice = button.parentElement.parentElement.querySelector('.cart-item__price')

        if (!button.classList.contains('checked')) {
            button.classList.add('checked')
            button.addEventListener('click', () => {
                amount.innerText = `${Number(amount.innerText) + 1}`
    
                itemsInCartLS = itemsInCartLS.filter((item) => {
                    if (item.name === `${button.parentElement.parentElement.querySelector('.cart-item__name').innerText}`) {
                        item.amount += 1
                    }
                    return item
                })
    
                localStorage.setItem('items', JSON.stringify(itemsInCartLS))
    
                total.innerText = `Total: € ${(Number(total.innerText.slice(8)) + Number(itemPrice.innerText.slice(2))).toFixed(2)}`
            })
        }


    })

    cartItemAmountDownButtons.forEach((button) => {
        const amount = button.parentElement.querySelector('.cart-item__amount-digit')
        const itemPrice = button.parentElement.parentElement.querySelector('.cart-item__price')

        if (!button.classList.contains('checked')) {
            button.classList.add('checked')
            button.addEventListener('click', () => {
                if (amount.innerText !== '1') {
                    amount.innerText = `${Number(amount.innerText) - 1}`
    
                    itemsInCartLS = itemsInCartLS.filter((item) => {
                        if (item.name === `${button.parentElement.parentElement.querySelector('.cart-item__name').innerText}`) {
                            item.amount -= 1
                        }
                        return item
                    })
        
                    localStorage.setItem('items', JSON.stringify(itemsInCartLS))
    
                    total.innerText = `Total: € ${(Number(total.innerText.slice(8)) - Number(itemPrice.innerText.slice(2))).toFixed(2)}`
                }
            })
        }
    })
}


cartButton.addEventListener('click', () => {
    cart.style.display = 'flex'

    const cartCloseButton = document.querySelector('.cart__close-btn')
    cartCloseButton.addEventListener('click', () => {
        cart.style.display = 'none'
    })

    removeButton()
    amountUpAndDownButtons()

})


addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const itemImage = button.parentElement.parentElement.querySelector('.img').src
        const itemName = button.parentElement.parentElement.querySelector('.item__name').innerText
        const itemPrice = button.parentElement.parentElement.querySelector('.item__price').innerText

        newItem = document.createElement('div')
        newItem.innerHTML = `
        <div class="cart-item">
            <div class="cart-item__img">
                <img src="${itemImage}">
            </div>
            <div class="cart-item__info">
                <div class="cart-item__name">${itemName}</div>
                <div class="cart-item__price">${itemPrice}</div>
                <div class="cart-item__remove">remove</div>
            </div>
            <div class="cart-item__amount">
                <div class="cart-item__amount-up"></div>
                <div class="cart-item__amount-digit">1</div>
                <div class="cart-item__amount-down"></div>
            </div>
        </div>`

        let itemData = {
            name: `${itemName}`,
            image: `${itemImage}`,
            price: `${itemPrice}`,
            amount: 1
        }

        if (!cartItems.innerHTML.includes(itemName)) {
            cartItems.append(newItem)
            itemsInCartLS.unshift(itemData)
            localStorage.setItem('items', JSON.stringify(itemsInCartLS))
            button.innerText = 'Added'
            checkCart()
            totalPrice()
        } else {
        }

        if (cartItems.innerHTML.includes(itemName)) {
            let removeButtons = document.querySelectorAll('.cart-item__remove')
            removeButtons.forEach((removeButton) => {
                removeButton.addEventListener('click', () => {
                    removeButton.parentElement.parentElement.remove()

                    itemsInCartLS = itemsInCartLS.filter((item) => {
                        if (item.name !== `${removeButton.parentElement.querySelector('.cart-item__name').innerText}`) {
                            return item
                        }
                    })
        
                    localStorage.setItem('items', JSON.stringify(itemsInCartLS))

                    addToCartButtons.forEach((btn) => {
                        if (btn.parentElement.parentElement.innerHTML.includes(removeButton.parentElement.parentElement.querySelector('.cart-item__name').innerHTML)) {
                            btn.innerText = 'Add to cart'
                        }
                    })
                    checkCart()
                    totalPrice()
                })
            })
        }
        checkCart()
        totalPrice()
        amountUpAndDownButtons()
    })
})

window.addEventListener('load', () => {
    if (localStorage.length > 0) {
        itemsInCartLS = JSON.parse(localStorage.getItem('items')) || []

        itemsInCartLS.filter((item) => {
            if (item.name) {
                let newItem = document.createElement('div')
                newItem.innerHTML = `
                <div class="cart-item">
                    <div class="cart-item__img">
                        <img src="${item.image}">
                    </div>
                    <div class="cart-item__info">
                        <div class="cart-item__name">${item.name}</div>
                        <div class="cart-item__price">${item.price}</div>
                        <div class="cart-item__remove">remove</div>
                    </div>
                    <div class="cart-item__amount">
                        <div class="cart-item__amount-up"></div>
                        <div class="cart-item__amount-digit">${item.amount}</div>
                        <div class="cart-item__amount-down"></div>
                    </div>
                </div>`
                cartItems.append(newItem)
            }
        })
        checkCart()
        totalPrice()
    }
    amountUpAndDownButtons()

    addToCartButtons.forEach((button) => {
        if (cartItems.innerHTML.includes(button.parentElement.parentElement.querySelector('.item__name').innerHTML)) {
            button.innerText = 'Added'
        }
    })
})

checkCart()
totalPrice()

// ______________________________________________________________
// code only for products page

const search = document.querySelector('.products__search-input')
const allItems = document.querySelectorAll('.products__item')
const allCompanies = document.querySelectorAll('.company')
const allCompaniesButton = document.querySelector('.all')
const priceFilter = document.querySelector('.price__input')
const error = document.querySelector('.error')
const productsContent = document.querySelector('.products__content')


const priceValueChanger = () => {
    document.querySelector('.price__value').innerText = `€ ${priceFilter.value}`
}


const priceFilterFunc = () => {
    if (allCompaniesButton.classList.contains('active')) {
        allItems.forEach((item) => {
            const itemPrice = Number(item.querySelector('.item__price').innerText.slice(2))
            if (priceFilter.value < itemPrice) {
                item.classList.add('hide')
            } else {
                item.classList.remove('hide')
            }
        })

        const itemsInSearch = document.querySelectorAll('.products__item')

        for (let i = 0; i < itemsInSearch.length; i++) {
            if (itemsInSearch[i].classList) {
                console.log(itemsInSearch[i].classList)
            }
        }
        
    }
}


const searchFunc = () => {
    if (allCompaniesButton.classList.contains('active')) {
        search.addEventListener('input', () => {
            allItems.forEach((item) => {
                if (!item.querySelector('.item__name').innerText.toLowerCase().includes(`${search.value.toLowerCase()}`) && !item.querySelector('.item__name').innerText.toLowerCase().startsWith(`${search.value.toLowerCase()}`)) {
                    item.classList.add('hide')
                } else {
                    item.classList.remove('hide')
                }
            })
            
            const itemsInSearch = document.querySelectorAll('.products__item')
        
            const listToChek = []
        
            for (let i = 0; i < itemsInSearch.length; i++) {
                if (itemsInSearch[i].classList.length === 2 && itemsInSearch[i].className.includes('item')) {
                    listToChek.unshift(itemsInSearch[i])
                }
            }
        
            if (listToChek.length === 0) {
                error.classList.remove('hide')
            } else {
                error.classList.add('hide')
        
            }
            
        })
    } else {}
}
 
allCompanies.forEach((company) => {
    company.addEventListener('click', () => {
        allItems.forEach((item) => {
            if (company.dataset.company !== item.dataset.company) {
                item.classList.add('hide')
            } else {
                item.classList.remove('hide')
            }

            if (company.innerText === 'All') {
                item.classList.remove('hide')
            }
        })

        if (company.innerText !== 'All') {
            allCompaniesButton.classList.remove('active')
            const searchFunc2 = () => {
                search.addEventListener('input', () => {
                    allItems.forEach((item) => {
                        if (item.dataset.company === company.dataset.company) {
                            if (!item.querySelector('.item__name').innerText.toLowerCase().includes(`${search.value.toLowerCase()}`) && !item.querySelector('.item__name').innerText.toLowerCase().startsWith(`${search.value.toLowerCase()}`)) {
                                item.classList.add('hide')
                            } else {
                                item.classList.remove('hide')
                            }
                        } else {
                            item.classList.add('hide')
                        }
                    })

                    const itemsInSearch = document.querySelectorAll('.products__item')
                
                    const listToChek = []
                
                    for (let i = 0; i < itemsInSearch.length; i++) {
                        if (itemsInSearch[i].classList.length === 2 && itemsInSearch[i].className.includes('item')) {
                            listToChek.unshift(itemsInSearch[i])
                        }
                    }
                
                    if (listToChek.length === 0) {
                        error.classList.remove('hide')
                    } else {
                        error.classList.add('hide')
                
                    }
                })
            }
            searchFunc2()

            const priceFilterFunc2 = () => {
                allItems.forEach((item) => {
                    if (item.dataset.company === company.dataset.company) {
                        const itemPrice = Number(item.querySelector('.item__price').innerText.slice(2))
                        if (priceFilter.value < itemPrice) {
                            item.classList.add('hide')
                        } else {
                            item.classList.remove('hide')
                        }
                    } else {
                        item.classList.add('hide')
                    }
                })
            }
            priceFilter.addEventListener('input', () => {
                if (!allCompaniesButton.classList.contains('active')) {
                    priceFilterFunc2()
                }
            })

        } else if (company.innerText === 'All') {
            allCompaniesButton.classList.add('active')
        }
    })
})

search.addEventListener('input', () => {
    searchFunc()
})

priceFilter.addEventListener('input', () => {
    priceValueChanger()
    priceFilterFunc()
})
priceValueChanger()
