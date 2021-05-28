let field = document.getElementsByClassName('block');

// Initial new game grid
newGrid = (width, height) => {
    let grid = new Array(height);
    for (let i = 0; i < height; i++) {
        grid[i] = new Array(width)
    }
    let index = 0;
    for (let j = 0; j < height; j++) {
        for (let k = 0; k < width; k++) {
            grid[j][k] = {
                index: index++,
                value: 0
            }
        }
    }
    return {
        board: grid,
        width: width,
        height: height
    }
};

// Reset grid and field color
resetGrid = (grid) => {
    for (let i = 0; i < grid.height; i++) {
        for (let j = 0; j < grid.width; j++) {
            grid.board[i][j].value = 0;
        }
    }
    Array.from(field).forEach(e => {
        e.style.background = TRANSPARENT
    })
};

// Create new tetromino
newTetromino = (blocks, colors, start_x, start_y) => {
    let index = Math.floor(Math.random() * blocks.length);
    return {
        block: JSON.parse(JSON.stringify(blocks[index])),
        color: "url('/assets/animated/"+COLORS[index]+"')",
        x: start_x,
        y: start_y
    }
};

// Draw tetromino on field
drawTetromino = (tetromino, grid) => {
    tetromino.block.forEach((row, i) => {
        row.forEach((value, j) => {
            let x = tetromino.x + i;
            let y = tetromino.y + j;
            if (value > 0) {
                field[grid.board[x][y].index].style.backgroundImage = tetromino.color;
            }
        })
    })
};

// Clear tetromino
clearTetromino = (tetromino, grid) => {
    tetromino.block.forEach((row, i) => {
        row.forEach((value, j) => {
            let x = tetromino.x + i;
            let y = tetromino.y + j;
            if (value > 0) {
                field[grid.board[x][y].index].style.background = TRANSPARENT;
            }
        })
    })
};

// Check point is in grid
isInGrid = (x,y,grid) => {
    return x < grid.height && x >= 0 && y >= 0 && y < grid.width;
};

// Check point is filled or blank
isFilled = (x,y,grid) => {
    if (!isInGrid(x,y,grid)) {
        return false;
    } else {
        return grid.board[x][y].value !== 0;
    }
};

// Check tetromino is movable
movable = (tetromino, grid, direction) => {
    let newX = tetromino.x;
    let newY = tetromino.y;
    switch (direction) {
        case DIRECTION.DOWN:
            newX = tetromino.x + 1;
            break;
        case DIRECTION.LEFT:
            newY = tetromino.y - 1;
            break;
        case DIRECTION.RIGHT:
            newY = tetromino.y + 1;
            break;
    }
    return tetromino.block.every((row, i) => {
        return row.every((value, j) => {
            let x = newX + i;
            let y = newY + j;
            return value === 0 || (isInGrid(x,y,grid) && !isFilled(x,y,grid));
        })
    })
};

// Move tetromino down
moveDown = (tetromino, grid) => {
    if (!movable(tetromino, grid, DIRECTION.DOWN)){
        return
    }
    clearTetromino(tetromino, grid);
    tetromino.x++;
    drawTetromino(tetromino, grid);
};

// Move tetromino left
moveLeft = (tetromino, grid) => {
    if (!movable(tetromino, grid, DIRECTION.LEFT)){
        return
    }
    clearTetromino(tetromino, grid);
    tetromino.y--;
    drawTetromino(tetromino, grid);
};

// Move tetromino right
moveRight = (tetromino, grid) => {
    if (!movable(tetromino, grid, DIRECTION.RIGHT)){
        return
    }
    clearTetromino(tetromino, grid);
    tetromino.y++;
    drawTetromino(tetromino, grid);
};


// DEMO
let grid = newGrid(GRID_WIDTH, GRID_HEIGHT);
let tetromino = newTetromino(BLOCKS, COLORS, START_X, START_Y);
drawTetromino(tetromino, grid);
//setInterval(() => {
//    moveDown(tetromino, grid);
//}, 100);

// Add keyboard event
document.addEventListener('keydown', e => {
    e.preventDefault();
    let key = e.which;
    switch (key) {
        case KEY.DOWN:
            moveDown(tetromino, grid);
            break;
        case KEY.LEFT:
            moveLeft(tetromino, grid);
            break;
        case KEY.RIGHT:
            moveRight(tetromino, grid);
            break;
    }
})


// Buttons
let btns = document.querySelectorAll('[id*="btn-"]');

btns.forEach(e => {
    let btn_id = e.getAttribute('id');
    let body = document.querySelector('body');
    e.addEventListener('click', () => {
        switch(btn_id) {
            case 'btn-play':
                body.classList.add('play');
                if (body.classList.contains('pause')){
                    body.classList.remove('pause');
                }
                break;
            case 'btn-theme':
                body.classList.toggle('dark');
                break;
            case 'btn-pause':
                let btn_play = document.querySelector('#btn-play');
                btn_play.innerHTML = 'Continuar';
                body.classList.remove('play');
                body.classList.add('pause');
                break;   
            case 'btn-new-game':
                body.classList.add('play');
                body.classList.remove('pause');
                break; 
        }
    })
});