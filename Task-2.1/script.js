const ar = ['rgb(154, 222, 98)', 'green', 'wheat', 'slateblue', 'rgb(255, 212, 182)', 'rgba(65, 194, 211, 0.829)', 'rgb(107, 36, 188)', 'rgb(198, 66, 171)', 'violet', 'rosybrown', 'grey', 'darkcyan', 'darkorange'];


const body = document.querySelector('body');
const title = document.querySelector('.title');
const button = document.querySelector('.button');


function randomBG (arr, min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return arr[rand];
}


button.onclick = () => {
    let color = randomBG(ar, 0, 12);
    body.style.backgroundColor = color;
    title.textContent = `Background color: ${color}`;
}


