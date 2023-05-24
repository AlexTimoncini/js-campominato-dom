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
    let bombCells = randomIntArray(1, cellNumber, bombsNumber);
    let flowerCells = 0;
    let screenDarkDom = document.createElement('div');
    screenDarkDom.classList.add('screen-wrapper');
    createPopup(documentWindow);
    let gameResult = document.getElementById('gameResult');
    for (let i = 0; i < cellNumber; i++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerHTML = '<p>' + (i + 1) + '</p>';
        if (bombCells.includes(i + 1)){
            cell.addEventListener('click', function(){
                this.classList.add('bomb');
                documentWindow.appendChild(screenDarkDom);
                document.querySelector('.pop-up').style.transform = 'translateX(-50%) translateY(-50%)';
                gameResult.innerHTML = 'Game Over!'
            });
        } else {
            cell.addEventListener('click', function flower(){
                cell.classList.add('flower');
                console.log('you clicked on ' + (i + 1));
                if (flowerCells === (cellNumber - bombsNumber - 1)){
                    documentWindow.appendChild(screenDarkDom);
                    document.querySelector('.pop-up').style.transform = 'translateX(-50%) translateY(-50%)';
                    gameResult.innerHTML = 'You Won!'
                } else {
                    flowerCells++;
                }
            });
        }
        cell.style.width = 'calc(100% /' + Math.sqrt(cellNumber) + ')';
        gridContainer.append(cell);
    }
};

function createPopup(parent){
    let popup = document.createElement('div');
    popup.classList.add('pop-up');
    parent.appendChild(popup);
    popup.innerHTML = `
        <h1 id="gameResult"></h1>
        <button id="closeBtn">x</button>
        <button id="playAgain">Gioca di nuovo!</button>
    `;
    let closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', function(){
        popup.style.transform = 'translateX(-50%) translateY(-200%)';
        document.querySelector('.screen-wrapper').remove();
    });
    let playAgainBtn = document.getElementById('playAgain');
    playAgainBtn.addEventListener('click', function(){
        gridParent.innerHTML = '';
        popup.style.transform = 'translateX(-50%) translateY(-200%)';
        document.querySelector('.screen-wrapper').remove();
        generateGame(gridSelect.value, gridParent, 16, windowDom);
    });
}

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
}

