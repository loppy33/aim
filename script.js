let timeButton = document.getElementById('timeButton')
let accuracyButton = document.getElementById('accuracyButton')
let reactionButton = document.getElementById('reactionButton')

let game = document.getElementsByClassName('game')[0]

let start = document.getElementById('start')

let myCanvas = document.getElementById('myCanvas')
let ctx = myCanvas.getContext('2d')

myCanvas.width = game.offsetWidth
game.style.display = 'none'
myCanvas.height = window.innerHeight/1.5



let title = document.getElementById('title')
let scoreboard = document.getElementById('scoreboard')
let timer = document.getElementById('timer')

let back = document.getElementById('back')

let mode = 'time'

let time = 0
let score = 0
let circles = 0
let attemps = 0

let currentTime = 0

let gameInterval;
let gameTimeout;


timeButton.onclick = function(){
    mode = 'time';
    removeCards()
    createGame()
}

accuracyButton.onclick = function(){
    mode = 'accuracy';
    removeCards()
    createGame()
}

reactionButton.onclick = function(){
    mode = 'reaction';
    removeCards()
    createGame()
}


back.onclick = function(){
    showCards()
    start.innerHTML = 'GO!'
    scoreboard.innerHTML = 'Score'
    clearInterval(gameInterval)
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height)

}

function removeCards(){
    timeButton.classList.remove('visible')
    accuracyButton.classList.remove('visible')
    reactionButton.classList.remove('visible')

    game.style.display = 'block'
    setTimeout(function(){
        game.style.opacity = '1'
    }, 0)
}

function showCards(){

    game.style.opacity = '0'
    setTimeout(function(){
        game.style.display = 'none'
        timeButton.classList.add('visible')
        accuracyButton.classList.add('visible')
        reactionButton.classList.add('visible')
    }, 700)

}

function createGame(){
    if(mode == 'time'){
        title.innerHTML = 'Time Training'
        timer.innerHTML = 'Time'

        start.onclick = function(){
            timeMode()
        }
    }

    if(mode == 'accuracy'){
        title.innerHTML = 'Accuracy Training'
        timer.innerHTML = 'Circles'

        start.onclick = function(){
            accuracyMode()
        }
    }

    if(mode == 'reaction'){
        title.innerHTML = 'Reaction Training'
        scoreboard.innerHTML = 'Timer'
        timer.innerHTML = 'Attempts'

        start.onclick = function(){
            reactionMode()
        }
    }
}


function timeMode(){
    if(start.innerHTML == 'GO!'){
        start.innerHTML = 'STOP'

        getCircle()
        
        time = 60
        score = 0

        time -= 1
        timer.innerHTML = 'Time: '+time
        scoreboard.innerHTML = 'Score: '+score

        gameInterval = setInterval(function(){
            time -= 1
            timer.innerHTML = 'Time: '+time
            if(time == 0){
                clearInterval(gameInterval)
                start.innerHTML = 'GO!'
                ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
                timer.innerHTML = 'Finished!'
                scoreboard.innerHTML = 'Your score is '+score
            }
        }, 1000)
    }
    else{
        start.innerHTML = 'GO!'
        clearInterval(gameInterval)
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height)

    }
}

function getCircle(){

    ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
    let circleX = Math.random()*(game.offsetWidth-160)+80
    let circleY = Math.random()*(window.innerHeight/1.5-160)+80

    ctx.beginPath() 
    ctx.arc(circleX, circleY, 40, 0, 2*Math.PI)
    ctx.lineWidth = '20'
    ctx.strokeStyle = 'maroon'
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ctx.fill()

    ctx.beginPath() 
    ctx.arc(circleX, circleY, 20, 0, 2*Math.PI)
    ctx.lineWidth = '20'
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ctx.fill()

    ctx.beginPath() 
    ctx.arc(circleX, circleY, 10, 0, 2*Math.PI)
    ctx.fillStyle = '#000'
    ctx.fill()
}


myCanvas.onclick = function(event){
    // console.log(ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data)
    // console.log(event.offsetX, event.offsetY)
    
    if(ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[0] == 187){
        clearInterval(gameInterval)
        attemps --
        timer.innerHTML = 'Attemps: '+attemps
        if(currentTime < score){
            score = currentTime
        }

        if(attemps == 0){
            start.innerHTML = 'GO!'
            timer.innerHTML = 'Finished!'
            scoreboard.innerHTML = 'High Score '+score+'s'
            clearInterval(gameInterval)
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
        }

        else{
            getReaction()
        }
    }

    else if(ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[3] == 255){
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
        accuracyInterval()
        score++
        // circles--
        scoreboard.innerHTML = 'Score: '+score
        timer.innerHTML = 'Circles: '+circles
        if(circles == 0){
            start.innerHTML = 'GO!'
            clearInterval(gameInterval)
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height)  
            timer.innerHTML = 'Finished!'
            scoreboard.innerHTML = 'Your score is '+score  
        }
    }
}


function accuracyMode(){
    if(start.innerHTML == 'GO!'){
        start.innerHTML = 'STOP'
        getCircle()
        score = 0
        circles = 20
        scoreboard.innerHTML = 'Score: '+score
        timer.innerHTML = 'Circles: '+circles
        accuracyInterval()

    }
    else{
        start.innerHTML = 'GO!'
        clearInterval(gameInterval)
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height)

    }
}

function accuracyInterval(){
    clearInterval(gameInterval)
    gameInterval = setInterval(function(){
        circles--
        timer.innerHTML = 'Circles: '+circles
        getCircle()
        if(circles == 0){
            start.innerHTML = 'GO!'
            clearInterval(gameInterval)
            ctx.clearRect(0,0,myCanvas.width,myCanvas.height)  
            timer.innerHTML = 'Finished!'
            scoreboard.innerHTML = 'Your score is '+score  
        }
    }, 800)
}


function reactionMode(){
    if(start.innerHTML == 'GO!'){
        start.innerHTML = 'STOP'
        
        attemps = 5
        score = 1000000
        timer.innerHTML = 'Attemps: '+attemps
        getReaction()

    }
    else{
        start.innerHTML = 'GO!'
        clearInterval(gameInterval)
        clearTimeout(gameTimeout)
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
        
    } 
}


function getReaction(){
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
    ctx.beginPath()
    ctx.rect(0,0,myCanvas.width,myCanvas.height)
    ctx.fillStyle = 'rgba(187, 11, 11, 255)'
    gameTimeout = setTimeout(function(){
        clearInterval(gameInterval)
        time = 0
        let seconds = 0
        ctx.fill() 
        gameInterval = setInterval(function(){
            time++
            if(time < 10){
                currentTime = seconds+'.0'+time
            }
            else{
                currentTime = seconds+'.'+time
            }            
            scoreboard.innerHTML = 'Timer: '+ currentTime
            if(time==100){
                seconds++
                time = 0
            }
        }, 10)
    }, 1000)
}

// 1. Пофиксить несколько интервалов # не понял задание
// 2. Отнимать круглишки по клику на мешень во втором режиме! # Готово