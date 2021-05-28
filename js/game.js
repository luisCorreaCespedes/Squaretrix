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
        color: COLORS[index],
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
                field[grid.board[x][y].index].style.background = tetromino.color;
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
    if (!movable(tetromino, grid, DIRECTION.RIGHT)) return
    clearTetromino(tetromino, grid);
    tetromino.y++;
    drawTetromino(tetromino, grid);
};

//Check rotatable
rotatable = (tetromino, grid) => {
    let cloneBlock = JSON.parse(JSON.stringify(tetromino.block));
    for (let y = 0; y < cloneBlock.length; y++) {
        for (let x = 0; x < y; ++x) {
            [cloneBlock[x][y], cloneBlock[y][x]] = [cloneBlock[y][x], cloneBlock[x][y]];
        }
    }
    cloneBlock.forEach(row => row.reverse());
    return cloneBlock.every((row, i) => {
        return row.every((value, j) => {
            let x = tetromino.x + i;
            let y = tetromino.y + j;
            return value === 0 || (isInGrid(x,y,grid) && !isFilled(x,y,grid));
        })
    })
};

// Rotate tetromino
rotate = (tetromino, grid) => {
    if (!rotatable(tetromino, grid)) return 
    clearTetromino(tetromino, grid);
    for (let y = 0; y < tetromino.block.length; y++) {
        for (let x = 0; x < y; ++x) {
            [tetromino.block[x][y], tetromino.block[y][x]] = [tetromino.block[y][x], tetromino.block[x][y]];
        }
    }
    tetromino.block.forEach(row => row.reverse());
    drawTetromino(tetromino, grid);
};

// Hard drop tetromino
hardDrop = (tetromino, grid) => {
    clearTetromino(tetromino, grid);
    while (movable(tetromino, grid, DIRECTION.DOWN)) {
        tetromino.x++;
    }
    drawTetromino(tetromino, grid);
};

// Update grid when tetromino down
updateGrid = (tetromino, grid) => {
    tetromino.block.forEach((row, i) => {
        row.forEach((value, j) => {
            let x = tetromino.x + i;
            let y = tetromino.y + j;
            if (value > 0 && isInGrid(x,y,grid)) {
                grid.board[x][y].value = value;
            }
        })
    })
};


// DEMO
let grid = newGrid(GRID_WIDTH, GRID_HEIGHT);
let tetromino = newTetromino(BLOCKS, COLORS, START_X, START_Y);
drawTetromino(tetromino, grid);
setInterval(() => {
    if(movable(tetromino, grid, DIRECTION.DOWN)) {
        moveDown(tetromino, grid);
    } else {
        updateGrid(tetromino, grid);
        tetromino = newTetromino(BLOCKS, COLORS, START_X, START_Y);
        drawTetromino(tetromino, grid);
    }
}, 1000);

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
        case KEY.UP:
            rotate(tetromino, grid);
            break;
        case KEY.SPACE:
            hardDrop(tetromino, grid);
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
            case 'btn-drop':
                hardDrop(tetromino, grid);
                break;
            case 'btn-up':
                rotate(tetromino, grid);
                break;
            case 'btn-down':
                moveDown(tetromino, grid);
                break;
            case 'btn-left':
                moveLeft(tetromino, grid);
                break;
            case 'btn-right':
                moveRight(tetromino, grid);
                break;
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