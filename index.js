//alert("Presiona para inciar")
const canvas = document.getElementById("canvas")
//const canvas = document.querySelector('canvas')
//canvas.width = 800
//canvas.height = 800
const context = canvas.getContext("2d")

//Variables de los players
let paddingPaddle = 100
let initialPaddleSpeed = 20
let paddleWidth = 10
let paddleHeight = 100
let leftPaddleX = paddingPaddle
let leftPaddleY = 250
let rightPaddleX = canvas.width - paddingPaddle - paddleWidth
let rightPaddleY = canvas.height - 250
let paddleSpeed = initialPaddleSpeed


//Variables pelota
let ballRadius = 10;
let ballX = canvas.width / 1.2 
let ballY = canvas.height / 2
const initialBallSpeed = 5
const ballSpeed = {
    X: -initialBallSpeed,
    Y: Math.random()>=0.5 ? Math.random()*10: -Math.random()*10
}

// Score
let leftScore = 0;
let rightScore = 0;

//Generales
let saque = false

//Detectar las teclas
document.addEventListener("keydown", movePaddles);


//Loop del juego
refreshCanvas = 1
setInterval(loop, refreshCanvas);

function loop() {
    draw()
    update()
}

//Función Puntar para dibujar el juego
function draw() {
    //limpiar canvas
    context.clearRect(0, 0, canvas.clientWidth, canvas.height)

    //Dibujar mesa
    context.fillStyle = "white";
    context.fillRect(canvas.width/2-3,0, 6, canvas.height)

    //Dibujar Paletas
    context.fillStyle = "red";

    //Dibujar paleta izquierda
    context.fillRect(leftPaddleX, leftPaddleY, paddleWidth, paddleHeight);

    //Dibujar paleta derecha
    context.fillStyle = "black";
    context.fillRect(rightPaddleX, rightPaddleY, paddleWidth, paddleHeight);

    //Dibujar pelota
    context.fillStyle = "rgb(255, 239, 8)"
    context.beginPath()
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
    context.fill();

    //Score
    context.fillStyle = "white"
    context.font = "32px ComicSans"
    //Score izquierdo
    context.fillText(leftScore, 100, 50)
    //Score derecho
    context.fillText(rightScore, canvas.width - 100, 50)
}

function update() {
    //Mover la pelota
    ballX += ballSpeed.X
    ballY += ballSpeed.Y

    //Colisión con los bordes superiores e inferiores
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeed.Y = -ballSpeed.Y
    }

    //Colisión con la paleta izquierda
    if (ballX - ballRadius < leftPaddleX + paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight && !(ballX < leftPaddleX)) {
        ballSpeed.X = (-ballSpeed.X) + 1
        paddleSpeed += 0.5
    }
    //Colisión con la paleta derecha
    if (ballX + ballRadius > rightPaddleX - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight && !(ballX - ballRadius > rightPaddleX + paddleWidth)) {
        ballSpeed.X = -ballSpeed.X - 1
        paddleSpeed += 0.5
    }

    //Aumento del score si la pelota sale por algún borde

    //score izquierdo
    if (ballX + ballRadius > canvas.width) {
        leftScore++
        saque = false
        resetBall()
    }

    //Score derecho
    if (ballX - ballRadius < 0) {
        rightScore++
        saque = true
        resetBall()
    }
}

//Resetear la pelota después de anotar
function resetBall() {
    const ballSpeedX = 5
    paddleSpeed = initialPaddleSpeed


    // Si saca el jugador 1
    if(saque){
        ballX = leftPaddleX+paddleWidth + ballRadius
        ballY = leftPaddleY + paddleHeight / 2
        ballSpeed.X = ballSpeedX
        ballSpeed.Y = Math.random()>=0.5 ? Math.random()*10: -Math.random()*10
    }
    else{
        ballX = rightPaddleX - paddleWidth - ballRadius
        ballY = rightPaddleY + paddleHeight / 2
        ballSpeed.X = -ballSpeedX
        ballSpeed.Y = Math.random()>=0.5 ? Math.random()*10: -Math.random()*10
    }
        
}

//mover las paletas
function movePaddles(event) {
    const key = event.keyCode

    //Jugador uno (izquierda)
    //Tecla W
    if (key == 87 && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed
    }

    //Tecla S
    if (key == 83 && leftPaddleY + paddleHeight < canvas.height) {
        leftPaddleY += paddleSpeed
    }

    //Jugador 2 (derecha)
    //Tecla Arriba
    if (key == 38 && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed
    }

    //Tecla Abajo
    if (key == 40 && rightPaddleY + paddleHeight < canvas.height) {
        rightPaddleY += paddleSpeed
    }
}