const all = document.querySelector('#all')
const salads = document.querySelector('#salads')
const soups = document.querySelector('#soups')
const khachapuris = document.querySelector('#khachapuris')
const desserts = document.querySelector('#desserts')
const content = document.querySelector('.content')

const allItems = document.querySelectorAll('.item')
const allSalads = document.querySelectorAll('#salad')
const allSopus = document.querySelectorAll('#soup')
const allKhachapuri = document.querySelectorAll('#khachapuri')
const allDesserts = document.querySelectorAll('#dessert')


function unPack (arr) {
    let res = ''
    for (let i = 0; i < arr.length; i++) {
        res += arr[i].innerHTML
    }
    return res
}


all.onclick = () => {
    content.style.rowGap = '10vh'
    content.innerHTML = unPack(allItems)
}


salads.onclick = () => {
    content.style.rowGap = '10vh'
    content.innerHTML = unPack(allSalads)
}


soups.onclick = () => {
    content.style.rowGap = '10vh'
    content.innerHTML = unPack(allSopus)
}


khachapuris.onclick = () => {
    content.style.rowGap = '10vh'
    content.innerHTML = unPack(allKhachapuri)
}


desserts.onclick = () => {
    content.style.rowGap = '10vh'
    content.innerHTML = unPack(allDesserts)
}