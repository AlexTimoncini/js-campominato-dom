// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

let windowDom = document.getElementById('document_wrapper');
let gridParent = document.getElementById('grid');
let gridGeneratorDom = document.getElementById('gridGenerator');
let gridSelect = document.getElementById('grid-select');

gridGeneratorDom.addEventListener('click', function(){
    gridParent.innerHTML = '';
    generateGame(gridSelect.value, gridParent, 16, windowDom);
});

function generateGame(cellNumber, gridContainer, bombsNumber, documentWindow){
    let screenDarkDom = document.createElement('div');
    screenDarkDom.classList.add('screen-wrapper');
    documentWindow.appendChild(screenDarkDom);
    createPopup(documentWindow);

    let gameResult = document.getElementById('gameResult');
    let scoreDom = document.getElementById('score');
    let flowerCells = 0;

    let bombCells = randomIntArray(1, cellNumber, bombsNumber);
    for (let i = 0; i < cellNumber; i++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerHTML = '<p>' + (i + 1) + '</p>';
        cell.style.width = 'calc(100% /' + Math.sqrt(cellNumber) + ')';
        gridContainer.append(cell);

        if (bombCells.includes(i + 1)){
            cell.addEventListener('click', function(){
                document.querySelector('.screen-wrapper').style.width = '100vw';
                document.querySelector('.pop-up').style.transform = 'translateX(-50%) translateY(-50%)';
                gameResult.innerHTML = 'Game Over!';
                scoreDom.innerHTML = 'Your score is ' + (flowerCells * 1000);    
                for (x = 0; x < bombCells.length; x++){
                    document.querySelectorAll('.cell')[bombCells[x]].classList.add('bomb');
                }
            });
        } else {
            cell.addEventListener('click', function(){
                    this.classList.add('flower');
                    if (flowerCells === (cellNumber - bombsNumber - 1)){
                        document.querySelector('.screen-wrapper').style.width = '100vw';
                        document.querySelector('.pop-up').style.transform = 'translateX(-50%) translateY(-50%)';
                        gameResult.innerHTML = 'You Won!';
                        scoreDom.innerHTML = 'Your score is ' + (flowerCells * 1000);
                    } else {
                        flowerCells++;
                    }
            }, { once: true });
        }
    }

};

function showAdjacent(position){
    if ((position > 11) && (position < 90) && (!position.toString().includes(0)) && (!position.toString()[1].includes(1))){
        return [(position - 1), (position + 1), (position - 11), (position - 10), (position - 9), (position + 11), (position + 10), (position + 9)];
    } else if (position > 1 && position < 10){
        return [(position - 1), (position + 1), (position + 11), (position + 10), (position + 9)];
    } else if (position > 91 && position < 100) {
        return [(position - 1), (position + 1), (position - 11), (position - 10), (position - 9)];
    } else if (position === 1 || position ===  10 || position ===  91 || position ===  100){
        return [position];
    } else if (position.toString().includes(0)) {
        return [(position - 1), (position + 10), (position - 11), (position - 10), (position + 9)];
    } else {
        return [(position + 1), (position + 10), (position + 11), (position - 10), (position - 9)];
    }
}


function createPopup(parent){
    let popup = document.createElement('div');
    popup.classList.add('pop-up');
    parent.appendChild(popup);
    popup.innerHTML = `
        <h1 id="gameResult"></h1>
        <h2 id="score"></h2>
        <button id="closeBtn">x</button>
        <button id="playAgain">Gioca di nuovo!</button>
    `;

    let closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', function(){
        popup.style.transform = 'translateX(-50%) translateY(-200%)';
        document.querySelector('.screen-wrapper').style.width = '0';
        gridParent.innerHTML = '';
    });

    let playAgainBtn = document.getElementById('playAgain');
    playAgainBtn.addEventListener('click', function(){
        gridParent.innerHTML = '';
        popup.style.transform = 'translateX(-50%) translateY(-200%)';
        document.querySelector('.screen-wrapper').style.width = '0';
        generateGame(gridSelect.value, gridParent, 16, windowDom);
    });
};

function randomIntArray(min, max, times){
    if ((max - min) < times){
        return false;
    }
    let array = [];
    while (array.length < times){
        let randomInt = Math.floor(Math.random() * max + min);
        if (!array.includes(randomInt)){
            array.push(randomInt);
        }
    }
    return array;
};

