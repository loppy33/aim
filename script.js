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

let gameInterval;


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
        timer.innerHTML = 'Circle'

        start.onclick = function(){
            accuracyMode()
        }
    }

    if(mode == 'reaction'){
        title.innerHTML = 'Reaction Training'
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
        let time = 60
        time -= 1
        timer.innerHTML = 'Time: '+time

        gameInterval = setInterval(function(){
            time -= 1
            timer.innerHTML = 'Time: '+time
            if(time == 0){
                clearInterval(gameInterval)
                start.innerHTML = 'GO!'
            }
        }, 1000)
    }
    else{
        start.innerHTML = 'GO!'
        clearInterval(gameInterval)
    }
}


function getCircle(){
    console.log('Canvas')
    ctx.beginPath() 
    ctx.arc(500, 300, 40, 0, 2*Math.PI)
    ctx.lineWidth = '20'
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ctx.fill()

    ctx.beginPath() 
    ctx.arc(500, 300, 20, 0, 2*Math.PI)
    ctx.lineWidth = '20'
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ctx.fill()

    ctx.beginPath() 
    ctx.arc(500, 300, 10, 0, 2*Math.PI)
    ctx.fillStyle = '#000'
    ctx.fill()
}
