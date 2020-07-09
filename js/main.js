// VARIABLES
const grid = document.querySelector('.grid');
const btnPlay = document.querySelector('.btn-play');
const btnReset = document.querySelector('.btn-reset');
const copy = document.querySelector('.copy'); // Provisorio

const frames = ['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone'];
let cardsSelected = [];
let pairsFound = 0;


// EVENT LISTENERS
grid.addEventListener('click', tapCard);
btnPlay.addEventListener('click', play);
btnReset.addEventListener('click', resetGame);



//---------------------------------
// UI FUNCTIONS
//---------------------------------
// Add class 'active' on click to box
function tapCard(e) {
    e.preventDefault();
    //console.log(e.target.classList);

    if ((e.target.classList.contains('front')) || (e.target.classList.contains('back'))) {

        if (e.target.parentElement.classList.contains('active')) {

            let index = cardsSelected.indexOf(e.target.parentElement.id);

            e.target.parentElement.classList.remove('active');

            cardsSelected.splice(index, 1);

        } else {

            if (cardsSelected.length != 2) {

                e.target.parentElement.classList.add('active');

                cardsSelected.push(e.target.parentElement.id);

            }
        }

    }

    if (checkPairs(cardsSelected)) {

        const activeCards = document.querySelectorAll('.box.active');

        activeCards.forEach(function (e) {

            e.classList.add('disable');

        });

        pairsFound++;
        console.log(pairsFound);

        cardsSelected = [];

    }

    showAlertWin(pairsFound);

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

function showAlertWin(count) {
    if (count === 6) {
        setTimeout(function () {
            copy.innerHTML = "GANOOO"; ////// CREAR y ABRIR POPUP WIN
        }, 1000)
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

function checkPairs(array) {
    return new Set(array).size !== array.length
}

function resetGame() {
    grid.innerHTML = "";
    copy.innerHTML = ""; // Provisorio
    pairsFound = 0;
    btnReset.disabled = true;
    btnPlay.disabled = false;
}

function play() {
    let cards = [];
    cards = duplicatePairs(frames);
    cards = sortPairs(cards);
    createCards(cards);
    cards = [];

    btnPlay.disabled = true;
    btnReset.disabled = false;
}

