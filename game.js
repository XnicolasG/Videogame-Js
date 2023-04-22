const canvas = document.querySelector('#game');
// Se debe definir el contesxto en que se manejara el canvas
const game = canvas.getContext('2d');
const btnUp = document.querySelector('.up');
const btnDown = document.querySelector('.down');
const btnLeft = document.querySelector('.left');
const btnRight = document.querySelector('.right');
const spanLives = document.querySelector('.lives');
const spanTime = document.querySelector('.time');
const spanRecord = document.querySelector('.record');


window.addEventListener('load', ResizeCanvas);
window.addEventListener('resize', ResizeCanvas);

let canvasSize;
let elemntsSize = canvasSize / 10;
let levelNumber = 0
let lives = 3;
let time;
let timePLayer;
let timeInterval;
let finishTime;

const playerPosition = {
    x: undefined,
    y: undefined
}
const giftPosition = {
    x: undefined,
    y: undefined
}

let bombsPositions = [];



function ResizeCanvas() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    // canvasSize = Number(canvasSize.toFixed(0))

    canvas.setAttribute("width", canvasSize)
    canvas.setAttribute("height", canvasSize)

    // console.log({canvasSize, elemntsSize});
    elemntsSize = canvasSize / 10;
    playerPosition.x = undefined
    playerPosition.y = undefined

    StartGame()
}

function StartGame() {
    // // fillRect, define posiciones en (x,y) ya que el contexto es 2d
    // game.fillRect(0,0,100,100);

    // // borrar por coordenadas
    // game.clearRect(0,0,100,50)

    // game.font = '20px verdana';
    // game.fillStyle = 'tomato';
    // game.textAlign = 'center';
    // game.fillText('SrPizza', 55,25)

    game.font = elemntsSize + 'px Verdana';
    game.textAlign = 'end';
    let level = maps[levelNumber]
    if (!level) {
        GameWin()
        return
    }

    if (!time) {
        time = Date.now();
        timeInterval = setInterval(showTime, 100);
        spanRecord.innerHTML = JSON.stringify(localStorage.getItem('recordTime'))
    }
    // Limpia las filas de espacios y creamos un array a partir de un string en cada salto de linea
    const mapRows = level.trim().split('\n');

    // se crea un array dentro de array level, cada string sera un elemento individual de esta nuevo array
    const mapRowCols = mapRows.map(row => row.trim().split(''))
    game.clearRect(0, 0, canvasSize, canvasSize);
    bombsPositions = []
    // Recorrer array bidemencional primero fila (array), y luego por columna (element)
    mapRowCols.forEach((row, rowId) => {
        row.forEach((col, colId) => {
            const emoji = emojis[col];
            const posX = elemntsSize * (colId + 1);
            const posY = elemntsSize * (rowId + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {

                bombsPositions.push({
                    x: posX,
                    y: posY
                })
            }

            game.fillText(emoji, posX, posY)
        })
    });
    spanLives.innerHTML = emojis['HEART'].repeat(lives)

    movePlayer()

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {              
    //     game.fillText(emojis[mapRowCols[col -1] [row - 1]],
    //          elemntsSize * row, elemntsSize * col )
    //     }      
    // }
}

function GameWin() {
    console.log('acabaste el juego con un nuevo record: ' + finishTime);
    clearInterval(timeInterval)

    const recordTime = localStorage.getItem('recordTime')
    const parsedTime = JSON.parse(finishTime)
    if (recordTime) {
        if (recordTime >= finishTime) {
            localStorage.setItem('recordTime', parsedTime)
        } else {
            console.log('no has podido superar el record');
        }
    } else {
        localStorage.setItem('recordTime', parsedTime)
        console.log(recordTime);
    }
}
function LevelFail() {
    lives--

    if (lives <= 0) {
        levelNumber = 0
        lives = 3

    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    StartGame()
}
function NextLevel() {
    console.log('subiste nvl');
    levelNumber++
    StartGame()
}

function movePlayer() {

    const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        NextLevel()
    }

    const bombCollision = bombsPositions.find(bomb => {
        const bombCollisionX = bomb.x.toFixed(2) == playerPosition.x.toFixed(2)
        const bombCollisionY = bomb.y.toFixed(2) == playerPosition.y.toFixed(2)
        return bombCollisionX && bombCollisionY;
    })

    if (bombCollision) {
        LevelFail()
        console.log('bomba ');
    }
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function showTime() {
    finishTime = Date.now() - time;
    spanTime.innerHTML = finishTime;
}

// ------ Botones movimientos jugador -------
window.addEventListener('keydown', MoveByKey);
btnUp.addEventListener('click', MoveUp);
btnDown.addEventListener('click', MoveDown);
btnLeft.addEventListener('click', MoveLeft);
btnRight.addEventListener('click', MoveRight);

function MoveByKey(e) {
    if (e.key == "ArrowUp") MoveUp();
    else if (e.key == "ArrowDown") MoveDown();
    else if (e.key == "ArrowLeft") MoveLeft();
    else if (e.key == "ArrowRight") MoveRight();
}

function MoveUp() {
    if ((playerPosition.y - elemntsSize) < elemntsSize) {
        console.log('Out');
    } else {
        playerPosition.y -= elemntsSize
        StartGame()
    }
};

function MoveDown() {
    if ((playerPosition.y + elemntsSize) > canvasSize) {
        console.log('Out');
    } else {
        playerPosition.y += elemntsSize
        StartGame()
    }
};

function MoveLeft() {
    if ((playerPosition.x - elemntsSize) < elemntsSize) {
        console.log('Out');
    } else {
        playerPosition.x -= elemntsSize
        StartGame()
    }
}
function MoveRight() {
    if ((playerPosition.x + elemntsSize) > canvasSize) {
        console.log('Out');
    } else {
        playerPosition.x += elemntsSize
        StartGame()
    }
};