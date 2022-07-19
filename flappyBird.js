const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const birdImage = new Image();
const bgImage = new Image();
const fgImage = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();
const flySound = new Audio();
const scoreSound = new Audio();

birdImage.src = "images/bird.png";
bgImage.src = "images/bg.png";
fgImage.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";
flySound.src = "sounds/fly.mp3"
scoreSound.src = "sounds/score.mp3"

birdX = 10;
birdY = 50;

// listed and move bird
document.addEventListener("keydown", moveUp)

function moveUp() {
    flySound.play();
    if (birdY - 25 < 25) {
        birdY = 25;
    }
    birdY -= 25;
}


// pipes
const pipes = [];

pipes[0] = {
    x: cvs.width,
    y: 0
}

const PIPE_GAP = pipeNorth.height + 80;
const GRAVITY = 1.5;
let score = 0;

// render
function draw() {
    ctx.drawImage(bgImage, 0, 0);
    birdY += GRAVITY;

    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + PIPE_GAP);
        pipes[i].x--;

        if (pipes[i].x === cvs.width - 188) {
            pipes.push(
                {
                    x: cvs.width,
                    y: Math.floor((Math.random() * pipeNorth.height) - pipeNorth.height)
                }
            )
        }

        // detect colisions
        if (birdX + birdImage.width >= pipes[i].x && birdX <= pipes[i].x + pipeNorth.width &&
            (birdY <= pipes[i].y + pipeNorth.height || birdY + birdImage.height >= pipes[i].y + PIPE_GAP)
            || birdY + birdImage.height >= cvs.height - fgImage.height
        ) {
            location.reload();
        }

        ctx.drawImage(fgImage, 0, cvs.height - fgImage.height);
        ctx.drawImage(birdImage, birdX, birdY);


        // add score
        if (pipes[i].x === 0) {
            score++;
            scoreSound.play();
        }

        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana"
        ctx.fillText(`Score: ${score}`, 10, cvs.height - 20)
    }

    requestAnimationFrame(draw)
}

draw();
