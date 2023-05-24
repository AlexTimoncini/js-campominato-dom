// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

let gridParent = document.getElementById('grid');
let gridGeneratorDom = document.getElementById('gridGenerator');
let gridSelect = document.getElementById('grid-select');

gridGeneratorDom.addEventListener('click', function(){
    gridParent.innerHTML = '';
    gridGenerator(gridSelect.value, gridParent, 16);
});

function gridGenerator(cellNumber, gridContainer, bombsNumber){
    let bombCells = randomIntArray(1, cellNumber, bombsNumber);
    console.log(bombCells);

    for (let i = 0; i < cellNumber; i++){
        let cell = document.createElement('div');
        cell.classList.add('cell');

        if (bombCells.includes(i + 1)){
            cell.innerHTML = '<p>' + 'bomb' + '</p>';
            cell.addEventListener('click', function(){
                this.classList.add('bomb');
                console.log('you clicked on a bomb');
            });
        } else {
            cell.innerHTML = '<p>' + (i + 1) + '</p>';
            cell.addEventListener('click', function(){
                this.classList.add('flower');
                console.log('you clicked on ' + (i + 1));
            });
        }

        cell.style.width = 'calc(100% /' + Math.sqrt(cellNumber) + ')';
        gridContainer.append(cell);
    }
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
}

