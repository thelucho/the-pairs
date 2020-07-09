// VARIABLES
const grid = document.querySelector('.grid');
const btnPlay = document.querySelector('.btn-play');
const btnReset = document.querySelector('.btn-reset');
const copy = document.querySelector('.copy');

let frames = ['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone'];
let cards = [];
let cardsSelected = [];


// EVENT LISTENERS
grid.addEventListener('click', activeClass);
btnPlay.addEventListener('click', play);
btnReset.addEventListener('click', resetGame);



//---------------------------------
// UI FUNCTIONS
//---------------------------------
// Add class 'active' on click to box
function activeClass(e) {
    e.preventDefault();
    //console.log(e.target.classList);

    if ((e.target.classList.contains('front')) || (e.target.classList.contains('back'))) {
        if (e.target.parentElement.classList.contains('active')) {
            e.target.parentElement.classList.remove('active');
            let indice = cardsSelected.indexOf(e.target.parentElement.id);
            cardsSelected.splice(indice, 1);
            console.log(cardsSelected);
        } else {
            if (cardsSelected.length != 2) {
                e.target.parentElement.classList.add('active');
                cardsSelected.push(e.target.parentElement.id);
                console.log(cardsSelected);
            }
        }
    }

};

function createCards(array) {
    for (let i = 0; i < array.length; i++) {
        grid.innerHTML += `
            <div class="box flipper" id="${array[i]}">
                <div class="front">
                    <span class="name"></span>
                </div>
                <div class="back" style="background: url(img/${array[i]}.png) center center no-repeat; width: 100%; height: 100%;">
                    <div class="back-title"></div>
                </div>
            </div>
        `;
    }

    // FOR Provisorio para ver resultados en footer
    for (let i = 0; i < array.length; i++) {
        copy.innerHTML += array[i].toString();
    }
}


//---------------------------------
// GAME FUNCTIONS
//---------------------------------
function duplicatePairs(array) {
    array = [].concat(array, array);
    return array;
}

function sortPairs(array) {
    array = array.sort(function () { return Math.random() - 0.5 });
    return array;
}

function checkPairs() {
    if (cardsSelected.length != 2) {
        console.log('Es Menor');
        return false;
    }

    console.log('Es igual a 2');
    return true;
}

function resetGame() {
    grid.innerHTML = "";
    copy.innerHTML = ""; // Provisorio
    btnReset.disabled = true;
    btnPlay.disabled = false;
}

function play() {
    cards = duplicatePairs(frames);
    cards = sortPairs(cards);
    createCards(cards);
    cards = [];

    btnPlay.disabled = true;
    btnReset.disabled = false;
}

