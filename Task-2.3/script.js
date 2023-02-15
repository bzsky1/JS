const sample = document.querySelector('.array')
const result = document.querySelector('.result')
const button = document.querySelector('.button')



const ar = ['all', 'salads', 'soups', 'khachapuri', 'desserts', 'sushi', 'drinks', 'hot', 'grill', 'special', 'dip', 'sauce']


function s (ar) {
    for (let j = 0; j < ar.length; j++) {
        for (let i = 0; i < ar.length - 1; i++) {
            if (ar[i].length > ar[i+1].length) {
                let temp = ar[i]
                ar[i] = ar[i+1]
                ar[i+1] = temp
            } else if (ar[i].length === ar[i+1].length) {
                if (ar[i] > ar[i+1]) {
                    let temp = ar[i]
                    ar[i] = ar[i+1]
                    ar[i+1] = temp
                }
            }
        }
    }
    return ar
}




sample.innerHTML = `Unsorted array: <br> ${ar}`

button.onclick = () => {

    result.innerHTML = s(ar)
}


// result.innerHTML = ar.sort((a, b) => {
//     if (a.length === b.length) {
//         return a.localeCompare(b)
//     } else {
//         return a.length - b.length
//     }
// })