/*AnimalsFunnyFacts Funktionalität*/

//Alle Seiten
function toggleMenu() {                                 //Bürger Menü
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}

const navLinks = document.querySelectorAll('#nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('nav');
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});


//Spiele-Seite
//Script für Memory

const memoryAnimals = ['🐼', '🐢', '🐒', '🐬', '🐝', '🐨', '🐄', '🐘', '🦆'];
let cards = [...memoryAnimals, ...memoryAnimals]; //... ist der Spread Operator, er packt das Array oben aus und setzt die einzelnen Elemente an anderer Stelle wieder ein

function shuffle (array) { //Fisher-Yates Shuffle
    for (let i = array.length - 1; i > 0; i--) { //wähle das letzte Element aus; i-- --> gehe einen Schritt nach links und wiederhole das Ganze bis du am Anfang der Liste angekommen bist
        const j = Math.floor(Math.random() * (i + 1)); //Math.random gibt eine Zahl 0 und 1; *(i + 1) skaliert das auf die Länge unseres Stapels; Math.floor rundet sie ab, damit wir eine ganze Zahl haben --> das bestimmt ein Element irgendwo anders in der Liste oder das Element selbst
        [array[i], array[j]] = [array[j], array[i]]; //Destructuring --> Dabei tauschen Inhalte von i mit j die Plätze und umgekehrt
    }
    return array;
}

const board = document.getElementById("gameboard"); //hiermit wird nach dem Kasten "gameboard" gesucht, später werden alle Karten da rein gelegt
let firstCard = null;
let lockBoard = false;
let matchesFound = 0;

if(board){}
function createBoard() {
    board.innerHTML = ""; //der Kasten wird komplett leer gemacht --> wichtig für Neustart, sonst landen die neuen Karten unter den alten
    const shuffledCards = shuffle(cards);

    shuffledCards.forEach((animal, index) => { //für jedes Tier in der Liste wird dieser Code ausgeführt --> also 18 Mal
        const card = document.createElement("div"); //neuer, leerer Kasten
        card.classList.add("card"); //Benennung für CSS (ist noch nicht vorhanden)
        card.dataset.animal = animal; //unsichtbarer Zettel auf der Rückseite ("hier ist ein panda versteckt"), das Programm weiß es aber der Spieler noch nicht
        card.dataset.index = index; 

        card.addEventListener("click", flipCard); //wenn jemand auf eine der Karte klickt, wird die Funktion flipCard aufgerufen
        board.appendChild(card); //der fertige Kasten wird in das gameboard gelegt
    })
}

function flipCard() {
    if (lockBoard || this === firstCard) return; //Programm prüft ob Spielfeld gesperrt ist und/oder ob die angeklickte Karte bereits offenliegt --> falls eins davon zutrifft bricht die Funktion ab
    this.innerText = this.dataset.animal; //zeigt das Tier an
    this.classList.add("flipped"); //CSS Klasse flipped wird hinzugefügt

    if (!firstCard) { //Programm muss wissen ob erste oder zweite Karte --> bei der ersten Karte speichert das Programm in der Variable firstCard ab und beendet die Funktion
        firstCard = this; //Programm weiß jetzt, dass zwei Karten vorhanden sind
        return;
    }
    checkMatch(this);
}

function checkMatch(secondCard) {
    const isMatch = firstCard.dataset.animal === secondCard.dataset.animal; //Tiere werden verglichen

    if (isMatch) {
        disableCards(secondCard); //Karten bleiben offen liegen und man kann sie nicht mehr anklicken
    } else {
        unflipCards(secondCard); //Karten werden wieder umgedreht
    }
}

function disableCards(secondCard) {
    firstCard.classList.add("matched"); //CSS Klasse matched wird hinzugefügt
    secondCard.classList.add("matched");

    firstCard.removeEventListener("click", flipCard); //Klicks deaktivieren
    secondCard.removeEventListener("click", flipCard);

    matchesFound++; 
    updateCounter();

    if (matchesFound === memoryAnimals.length) {
        winnerConfetti();
    }

    resetTurn(); //Vorbereiten auf nächste Runde --> Variablen firstCard und secondCard werden geleert
}

function unflipCards(secondCard) {
    lockBoard = true; //sperrt das Board --> man kann auf nichts anderes klicken während die Karten offen liegen

    setTimeout(() => { //wie ein Wecker --> sonst werden die Karten so schnell umgedreht, dass man nichts sieht
        firstCard.innerText = ""; //das was auf der Karte steht wird wieder gelöscht damit die Rückseite leer bleibt
        secondCard.innerText = "";

        firstCard.classList.remove("flipped"); //die CSS Klasse flipped wird wieder entfernt
        secondCard.classList.remove("flipped");

        resetTurn();
    }, 1000); //1000 Millisekunden = 1 Sekunde --> danach werden die Karten wieder zurückgedreht
}

function resetTurn(){
    [firstCard, lockBoard] = [null, false]; //Variable wird geleert sodass man wieder eine neue Karte anklicken kann, das gesperrte Board wird wieder gelöst
}

function updateCounter () {
    const counterDisplay = document.getElementById("counter");
    counterDisplay.innerText = `Paare gefunden: ${matchesFound}`; //%{...} --> Platzhalter, fügt den Wert aus matchesFound ein, ersetzt die Umständliche Schreibweise mit +
}


function winnerConfetti(){
confetti({
    particleCount: 100,
    spread: 70,
    origin: {y: 0.6},
});
}

function reset() {
    matchesFound = 0;
    firstCard = null;
    lockBoard = false;
    updateCounter();
    createBoard();
}
document.addEventListener("DOMContentLoaded", () => {
    createBoard();
});

//Startseite


//Fakten-Seite
window.addEventListener('load', () => {           //ScrollReveal der Fakten-Blöcke
    ScrollReveal().reveal('.FaktenContainer', {
        distance: '100px',
        duration: 1000,
        origin: 'bottom',
        interval: 300
    });
});