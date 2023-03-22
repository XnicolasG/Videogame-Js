const canvas = document.querySelector('#game');
// Se debe definir el contesxto en que se manejara el canvas
const game = canvas.getContext('2d');
const btnUp = document.querySelector('.up');
const btnDown = document.querySelector('.down');
const btnLeft = document.querySelector('.left');
const btnRight = document.querySelector('.right');


window.addEventListener('load', ResizeCanvas);
window.addEventListener('resize', ResizeCanvas);

let canvasSize ;

let elemntsSize = canvasSize / 10;

function ResizeCanvas() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight *  0.8;
    }

    canvas.setAttribute("width", canvasSize )
    canvas.setAttribute("height", canvasSize)

    // console.log({canvasSize, elemntsSize});
    elemntsSize = canvasSize / 10;

    StartGame()
}

function StartGame () {
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

    const level = maps[0]

    // Limpia las filas de espacios y creamos un array a partir de un string en cada salto de linea
    const mapRows = level.trim().split('\n');
    
    // se crea un array dentro de array level, cada string sera un elemento individual de esta nuevo array
    const mapRowCols = mapRows.map(row => row.trim().split(''))
   
    // Recorrer array bidemencional primero fila (array), y luego por columna (element)
    mapRowCols.forEach((row, rowId) => {
        row.forEach((col, colId) =>{
        const emoji = emojis[col];
        const posX = elemntsSize * (colId + 1);
        const posY =elemntsSize * (rowId + 1 );
        game.fillText(emoji, posX, posY)
        })
    });

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {              
    //     game.fillText(emojis[mapRowCols[col -1] [row - 1]],
    //          elemntsSize * row, elemntsSize * col )
    //     }      
    // }
}

// ------ Botones movimientos jugador -------
window.addEventListener('keydown', MoveByKey);
btnUp.addEventListener('click', MoveUp);
btnDown.addEventListener('click', MoveDown);
btnLeft.addEventListener('click', MoveLeft);
btnRight.addEventListener('click', MoveRight);

function MoveByKey(e){
if(e.key == "ArrowUp") MoveUp();
else if(e.key == "ArrowDown") MoveDown();
else if(e.key == "ArrowLeft") MoveLeft();
else if(e.key == "ArrowRight") MoveRight();
}

function MoveUp() {
    console.log('SrPIzzaUp');
};

function MoveDown(){

};

function MoveLeft(){

};
function MoveRight() {
    
};