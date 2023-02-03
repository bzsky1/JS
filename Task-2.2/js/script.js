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









all.onclick = () => {
    content.innerHTML = allItems[0].innerHTML + allItems[1].innerHTML + allItems[2].innerHTML + allItems[3].innerHTML + allItems[4].innerHTML + allItems[5].innerHTML + allItems[6].innerHTML + allItems[7].innerHTML + allItems[8].innerHTML + allItems[9].innerHTML + allItems[10].innerHTML + allItems[11].innerHTML + allItems[12].innerHTML
}


salads.onclick = () => {
    content.style
    .rowGap = '10vh'
    content.innerHTML = allSalads[0].innerHTML + allSalads[1].innerHTML + allSalads[2].innerHTML
}


soups.onclick = () => {
    content.style
    .rowGap = '10vh'
    content.innerHTML = allSopus[0].innerHTML + allSopus[1].innerHTML + allSopus[2].innerHTML + allSopus[3].innerHTML
}


khachapuris.onclick = () => {
    content.style
    .rowGap = '10vh'
    content.innerHTML = allKhachapuri[0].innerHTML + allKhachapuri[1].innerHTML
}


desserts.onclick = () => {
    content.style
    .rowGap = '10vh'
    content.innerHTML = allDesserts[0].innerHTML + allDesserts[1].innerHTML + allDesserts[2].innerHTML + allDesserts[3].innerHTML
}