// VARIABLES
const grid = document.querySelector('.grid');
const btnPlay = document.querySelector('.btn-play');
const btnReset = document.querySelector('.btn-reset');
const btnLamp = document.querySelector('.btn-lamp');
const scoreCounter = document.querySelector('.scoreCounter');

const frames = ['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone'];
let cardsSelected = [];
let pairsFound = 0;
let score = 12;


// EVENT LISTENERS
grid.addEventListener('click', tapCard);
btnPlay.addEventListener('click', play);
btnReset.addEventListener('click', resetGame);
btnLamp.addEventListener('click', turnOnTheLight);


//---------------------------------
// UI FUNCTIONS
//---------------------------------
// Add class 'active' on click to box
function tapCard(e) {
    e.preventDefault();
    //console.log(e.target.classList);
    console.log(cardsSelected);

    if ((e.target.classList.contains('front')) || (e.target.classList.contains('back'))) {

        // Delete index in cardSelected
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
        console.log('Pares encontrados: ' + pairsFound);

        cardsSelected = [];
    }

    calculateScore(e);
    printScore();

    /*
    if ((!checkPairs(cardsSelected)) && (cardsSelected.length === 2)) {
        const active = document.querySelectorAll('.box.active:not(.disable)');

        setTimeout(function () {
            active.forEach(function (e) {
                e.classList.add('active');
            });
        }, 1000)

        cardsSelected = [];
    }
    */

    showAlertWin(pairsFound);
    showAlertGameOver(score)
};

function createCards(array) {
    for (let i = 0; i < array.length; i++) {
        setTimeout(function () {
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
        }, i * 80)
    }
}

function showAlertGameOver(score) {
    if (score === 0) {
        setTimeout(function () {

            Swal.fire({
                title: 'Game Over!',
                text: 'You lost the game.',
                icon: 'error',
                confirmButtonText: 'Play again!'
            }).then((result) => {
                if (result.value) {
                    resetGame();
                    play();
                }
            })

        }, 500)
    }
}

function showAlertWin(count) {
    if (count === 6) {
        setTimeout(function () {

            Swal.fire({
                title: 'Great!',
                text: 'You have found all pairs.',
                icon: 'success',
                confirmButtonText: 'Close'
            })

        }, 500)
    }
}

function turnOnTheLight() {
    const body = document.querySelector('body');
    body.classList.toggle("on");
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

function calculateScore(e) {
    e.preventDefault();
    //console.log(e.target.classList);
    if ((e.target.classList.contains('back'))) {
        if (!e.target.parentElement.classList.contains('active')) {
            score = score - 1;
        }
    }
}

function printScore() {
    scoreCounter.innerHTML = `You have <strong>${score} chances</strong>`;
}

function resetGame() {
    grid.innerHTML = "";
    cardsSelected = [];
    pairsFound = 0;
    score = 18;
    scoreCounter.innerHTML = "";
    btnReset.disabled = true;
    btnPlay.disabled = false;
}

function play() {
    let cards = [];
    cards = duplicatePairs(frames);
    cards = sortPairs(cards);
    createCards(cards);
    printScore();
    cards = [];

    btnPlay.disabled = true;
    btnReset.disabled = false;
}

