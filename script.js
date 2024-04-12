const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#status");
const restartbtn = document.querySelector("#restartbtn");

const winconditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];
let options = ["", "", "", "", "", "", "", "", ""];
let currentplayer = "X";
let isplaying = false;

startgame();

function startgame() {
    cells.forEach(cell => cell.addEventListener("click", cellclicked));
    restartbtn.addEventListener("click", restartgame);
    statustext.textContent = `${currentplayer}'s Turn`;
    isplaying = true;
}

function cellclicked() {
    const cellindex = this.getAttribute("cellIndex");
    if (options[cellindex] != "" || !isplaying) {
        return;
    }
    updatecell(this, cellindex);
    checkwinner();

}

function updatecell(cell, index) {
    options[index] = currentplayer;
    cell.textContent = currentplayer;
}
function changeplayer() {
    currentplayer = (currentplayer == "X") ? "O" : "X";
    statustext.textContent = `${currentplayer}'s Turn`;

}
function checkwinner() {
    let roundwon = false;
    for (let i = 0; i < winconditions.length; i++) {
        const condition = winconditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundwon = true;
            break;
        }
    }
    if (roundwon) {
        statustext.textContent = `${currentplayer} WINS!`;
        isplaying = false;
    }
    else if (!options.includes("")) {
        statustext.textContent = `Draw!`;
        isplaying = false;
    }
    else {
        changeplayer();
    }
}
function restartgame() {
    currentplayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statustext.textContent = `${currentplayer}'s Turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    startgame();

}