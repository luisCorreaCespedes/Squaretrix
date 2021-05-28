//Blocks
const iBlock = [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
];
const oBlock = [
    [2,2],
    [2,2]
];
const tBlock = [
    [0,3,0],
    [3,3,0],
    [0,3,0]
];
const sBlock = [
    [4,0,0],
    [4,4,0],
    [0,4,0],
];
const zBlock = [
    [0,5,0],
    [5,5,0],
    [5,0,0]
];
const lBlock = [
    [6,6,0],
    [0,6,0],
    [0,6,0]
];
const jBlock = [
    [7,7,0],
    [7,0,0],
    [7,0,0]
];
const uBlock = [
    [8,8,0],
    [0,8,0],
    [8,8,0]
];
const pointBlock = [
    [9]
];

const BLOCKS = [iBlock, oBlock, tBlock, sBlock, zBlock, lBlock, jBlock, uBlock, pointBlock];
const COLORS = [
    'red_block.png',
    'green_block.png',
    'blue_block.png',
    'orange_block.png',
    'lightblue_block.png',
    'yellow_block.png',
    'pink_block.png',
    'brown_color.png',
    'black_color.png'
]
const TRANSPARENT = 'transparent';
const DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    ROTATE: 'ROTATE'
};

//Keycode
const KEY = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    P: 80
};

//Board size
const GRID_HEIGHT = 20;
const GRID_WIDTH = 10;

//Start position of block
const START_X = 0;
const START_Y = 4;

//Start speed and score
const START_SCORE = 0;
const START_SPEED = 1000;
const MAIN_SCORE = 100;
const BONUS_SCORE = 30;

//Game state
const GAME_STATE = {
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    END: 'END'
}