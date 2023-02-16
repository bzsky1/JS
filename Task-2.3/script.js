const sample = document.querySelector('.array')
const result = document.querySelector('.result')
const button = document.querySelector('.button')


const ar = ['all', 'salads', 'soups', 'khachapuri', 'desserts', 'sushi', 'drinks', 'hot', 'grill', 'special', 'dip', 'sauce']


sample.innerHTML = `Unsorted array: <br> ${ar}`


button.onclick = () => {
    result.innerHTML = ar.sort((a, b) => {
        if (a.length === b.length) {
            return a.localeCompare(b)
        } else {
            return a.length - b.length
        }
    })
}


