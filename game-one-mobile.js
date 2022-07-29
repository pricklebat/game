const startBtn = document.getElementById("start-button")
const playBtn = document.getElementById("play")
const title = document.getElementById("game-title")
const titleRoom = document.getElementById("title-room")
const barfGif = document.getElementById("barf-gif")
const gameScreen = document.getElementsByClassName("game-area")[0]
const mrBarf = document.getElementById("barf")
const volBtn = document.getElementById("volumeBtn")
let barfImg = document.createElement("img")
let enemies = document.querySelectorAll(".bad")
barfImg.src = "./game-images/creature-2.png"
barfImg.id = "jumpBarf"

let bgImg = document.createElement("img")
bgImg.src = "./game-images/total-bg.png"
bgImg.id = "background"

let flagpole = document.createElement("img")
flagpole.src = "./game-images/flagpole.png"
flagpole.id = "fpole"

let heart0 = document.createElement("img")
let heart1 = document.createElement("img")
let heart2 = document.createElement("img")
heart0.src = "./game-images/heart.png"
heart1.src = "./game-images/heart.png"
heart2.src = "./game-images/heart.png"
heart0.id = "hrt0"
heart1.id = "hrt1"
heart2.id = "hrt2"
heart0.classList.add("hearts")
heart1.classList.add("hearts")
heart2.classList.add("hearts")

let gameOverTitle = document.createElement("img")
let againTitle = document.createElement("img")
gameOverTitle.src = "./game-images/game-over.gif"
gameOverTitle.id = "gOverT"
againTitle.src = "./game-images/again.gif"
againTitle.id = "againT"
 

let baddie = document.createElement("img")
baddie.classList.add("enemy")
let airBaddie = document.createElement("img")
airBaddie.classList.add("airEnemy")

let runWav = new Audio('./sounds/running.wav')
let landWav = new Audio('./sounds/landing.wav')
let letsGo = new Audio('./sounds/letsgo.wav')
let introWav = new Audio('./sounds/music0.mp3')
let lvlWav = new Audio
let okWav = new Audio('./sounds/okay2.wav')
let overWav = new Audio('./sounds/gameover.wav')
let replayWav = new Audio('./sounds/music1.mp3')
let groundWav = new Audio()
let jumpWav = new Audio()
let owWav = new Audio()
let restartWav = new Audio()
let yayWav = new Audio()
let deathWav = new Audio()
let winWav = new Audio()

runWav.classList.add("sfx", "sounds")
landWav.classList.add("sfx", "sounds")
letsGo.classList.add("sfx", "sounds")
okWav.classList.add("sfx", "sounds")
overWav.classList.add("sfx", "sounds")

introWav.classList.add("msc", "sounds")
lvlWav.classList.add("msc", "sounds")
replayWav.classList.add("msc", "sounds")

startBtn.addEventListener("click", startGame)
againTitle.addEventListener("click", reloadGame)
volBtn.addEventListener("click", muting)
playBtn.addEventListener("click", loadIn)

let gameOver = true
let verticalMatch = false
let horizontalMatch = false
let addNew = true
let count = 0
let livesLost = 0
let levelWon = false
let stage = 0

function loadIn() {
    barfGif.src = "./game-images/creature-happy.gif"
    resetVolume()
    $("#volumeBtn").fadeIn()
    $("#game-title").fadeIn(1500, function(){
        okWav.currentTime = 0
        okWav.play()
        $("#barf-gif").fadeIn(1500, function(){
            $("#start-button").fadeIn(500)
        })
    })
    introMusic()
    gameScreen.style.visibility = "visible"
    playBtn.style.display = "none"
}

let mutedSound = false

function resetVolume() {
    introWav.volume = 0.3
    okWav.volume = 0.7
    groundWav.volume = 1
    jumpWav.volume = 0.5
    replayWav.volume = 0.8
    lvlWav.volume = 0.3
    overWav.volume = 0.8
    owWav.volume = 0.7
    letsGo.volume = 1
    runWav.volume = 1
    landWav.volume = 1
    restartWav.volume = 1
    yayWav.volume = 1
    deathWav.volume = 0.7
    winWav.volume = 0.3
}

function muting() {
    if (!mutedSound) {
        console.log("mute")
        introWav.volume = 0
        okWav.volume = 0
        groundWav.volume = 0
        jumpWav.volume = 0
        replayWav.volume = 0
        lvlWav.volume = 0
        overWav.volume = 0
        owWav.volume = 0
        letsGo.volume = 0
        runWav.volume = 0
        landWav.volume = 0
        restartWav.volume = 0
        yayWav.volume = 0
        deathWav.volume = 0
        winWav.volume = 0
        mutedSound = true
        volBtn.src= "./game-images/music-icon-transp1.png"
    } else {
        console.log("unmute")
        resetVolume()
        mutedSound = false
        volBtn.src= "./game-images/music-icon-transp0.png"
    }
}

// start button!
    // remove start button, title, and little Barf gif
    // making starting area appear
    // move Barf into position

function startGame() {
    $("#start-button").fadeOut("fast");
    $("#game-title").fadeOut("fast");
    barfGif.src = "./game-images/creature-2.png"
    titleBarfFalls()
}



function barfAppears () {
    barf.append(barfImg)
    setTimeout(landSound, 50)
    $("#barf").delay(90).show( function(){
        $("#jumpBarf").attr("src", "./game-images/creature-1.png")
        setTimeout(barfRunAni, 700)
    })
}

function barfRunAni() {
    $("#jumpBarf").attr("src", "./game-images/creature-run.gif")
    $("#barf").animate({
        left: 450
    }, 1500, 'swing')
    setTimeout(runSound, 50)
    setTimeout(byeTitle, 1500)
    setTimeout(newGame, 2000)
}

function byeTitle() {
    introWav.pause()
    $("#title-room").fadeOut("5000", function(){
        runWav.pause()
        runWav.currentTime = 0
    })
}

function newGame() {
    resetGameCounts()
    document.getElementById("score").style.right = "18px"
    document.getElementById("score").style.top = "-22px"
    replayWav.pause()
    winWav.pause()
    levelWon = false
    gameOver = false
    $("#score").fadeIn()
    mrBarf.style.left = "-25px"
    mrBarf.style.bottom = "50px"
    barfImg.src = "./game-images/creature-happy.gif"
    $("#barf").show()
    $("#barf").animate({
        left: "50px"
    }, 200, 'linear')
    gameScreen.append(bgImg)
    gameScreen.append(flagpole)
    switchStage()
    $("#background").fadeIn()
    generateBaddies()
    letsGo.currentTime = 0
    letsGo.play()
    setTimeout(srsBarf, 700)
    setTimeout(levelMusic, 550)
    collisionCheck()
    removeBaddies()
    showHearts()
}

function switchStage() {
    bgImg.style.animation = "animatedBackground 4s linear infinite"
    switch (stage) {
        case 0:
            bgImg.src = "./game-images/total-bg.png"
            lvlWav.src = './sounds/music2.mp3'
            break;
        case 1:
            bgImg.src = "./game-images/snow-bg.png"
            lvlWav.src = './sounds/music10.mp3'
            break;
        default:
            bgImg.src = "./game-images/total-bg.png"    
            break;
    }
}

function srsBarf() {
    barfImg.src = "./game-images/creature-run.gif"
}

function reloadGame() {
    let barfNoise = Math.floor(Math.random() * 7)
    restartWav.src = './sounds/barfnoise' + barfNoise + '.wav'
    restartWav.currentTime = 0
    setTimeout(restartWav.play(), 500)
    $("#againT").fadeOut()
    barfAgain()
    $("#barf").animate({
        left: "-50px"
    }, 1000, 'linear', function(){
        mrBarf.style.transform = "scaleX(1)"
        $("#score").fadeOut()
        $("#gOverT").fadeOut(function() {
            newGame()
    });
    })
}

function barfAgain() {
    mrBarf.style.left = "500px"
    mrBarf.style.bottom = "50px"
    mrBarf.style.transform = "scaleX(-1)"
}

function landSound() {
    landWav.currentTime = 0
    landWav.play()
}

function runSound() {
    runWav.currentTime = 0
    runWav.play()
    runWav.loop=true
}

function groundSound() {
    groundNum = Math.floor((Math.random() * 3) + 1)
    groundWav.src = './sounds/land' + groundNum + '.wav'
    groundWav.currentTime = 0
    groundWav.play()
}

function jumpSound() {
    jumpNum = Math.floor((Math.random() * 7) + 1)
    jumpWav.src = './sounds/jump' + jumpNum + '.wav'
    jumpWav.currentTime = 0
    jumpWav.play()
}

function levelMusic() {
    lvlWav.currentTime = 0
    lvlWav.play()
    lvlWav.loop = true
}

function introMusic() {
    introWav.currentTime = 0
    introWav.play()
    introWav.loop=true
}

function yaySound() {
    yayNum = Math.floor(Math.random() * 3)
    yayWav.src = './sounds/yay' + yayNum + '.wav'
    yayWav.currentTime = 0
    yayWav.play()
}


function titleBarfFalls () {
    $("#barf-gif").animate({
        top: 500
    }, 500, 'swing', function (){
        barfGif.style.right = "264px"
        barfGif.style.top = "-500px"
        $("#title-room").fadeIn("3000")
        $("#barf-gif").animate({
            top: 213
        }, 700, 'swing', function(){
            $("#barf-gif").hide()
            barfAppears()
        })
    })
}

let dblJump = false
let fallSmall = false

document.addEventListener('touchstart', (e) => {
    if (e.repeat) { return 
    } else if (!gameOver) {
        if (dblJump != false) {
        barfTallJump()
        dblJump = false
        flightTime = 200
        fallSmall = false
    } else {
        barfShortJump()
        dblJump = true
        dblJump = setTimeout('dblJump = false', 250);
        flightTime = 150
        fallSmall = true
        fallSmall = setTimeout('fallSmall = false', 250);
    }
    if (fallSmall){
        setTimeout(barfFall, (flightTime + 80))
    }
    }
})

let jumpTime = 0


function barfTallJump() {
    jumpSound()
    jumpTime = 230
    $("#barf").animate({
        bottom: 125
    }, 200, 'swing')
}

function barfShortJump() {
    jumpSound()
    jumpTime = 180
    $("#barf").animate({
        bottom: 100
    }, 150, 'swing')
}

function barfFall() {
    $("#barf").animate({
        bottom: 50
    }, jumpTime, 'swing')
    if (dblJump === true) {
        setTimeout(groundSound, 280)
    } else {
        setTimeout(groundSound, 230)
    }
}

// make baddies appear!
    // run the function to randomise the baddy
    // if it's a floor baddy, make it appear on the floor
    // if it's an air baddy, put it in the air
    // repeat!

let airSp = {
    visual: "enemy0.png",
    speeds: 2000,
    type: "airE"
}

let grSp = {
    visual: "enemy3.gif",
    speeds: 2000,
    type: "grndE"
}

let wlkSp = {
    visual: "enemy2.gif",
    speeds: 2000,
    type: "grndE"
}

let pnkSqu = {
    visual: "enemy5.gif",
    speeds: 1500,
    type: "grndE"
}

let grnSqu = {
    visual: "enemy4.gif",
    speeds: 2000,
    type: "grndE"
}

let bat = {
    visual: "enemy1.gif",
    speeds: 2000,
    type: "airE"
}

let baddiesList = [airSp, grSp, wlkSp, pnkSqu, grnSqu, bat]

let i = 0
let x = 0
let baddiesCount = []
let gap1 = 1000
let gap2 = 1000

let highscoreList = []

function generateBaddies() {
    if (gameOver || levelWon) {
        $(".airEnemy").hide()
        $(".grndEnemy").hide()
    } else {
    setTimeout(function() {

        // loop it so baddies keep coming
            // randomise the baddy
            //

            baddiesCount[i] = document.createElement("img")
            baddyType = baddiesList[Math.floor(Math.random() * 6)]
            baddiesCount[i].src = "./game-images/" + baddyType.visual
            baddiesCount[i].classList.add(baddyType.type + "nemy")
            baddiesCount[i].classList.add("bad")
            gameScreen.append(baddiesCount[i])

            if (i < 7) {
                spd = 1
                gap1 = 900
                gap2 = 800
            } else if (i >= 7 && i < 15) {
                spd = 0.8
                gap1 = 800
                gap2 = 700
            } else if (i >= 15 && i < 30) {
                spd = 0.65
                gap1 = 700
                gap2 = 600
            } else if (i >= 30 && i < 60) {
                spd = 0.6
                gap1 = 600
                gap2 = 500
            } else if (i >= 60 && i < 120) {
                spd = 0.55
                gap1 = 500
                gap2 = 400
            } else if (i >= 120) {
                spd = 0.5
                gap1 = 500
                gap2 = 400
            }  
            

            
            $("." + baddyType.type + "nemy").animate({
                right: 400
            }, (baddyType.speeds * spd), 'linear')
            i++
            if (i < 500){
                generateBaddies()
            }
            count++
            if(count == 80 || count == 160) {
                endLevel()
            }
            document.getElementById('score').innerHTML = count.toString()
    }, (Math.floor(Math.random() * gap1 + gap2)))
}
}

// check for collisions... too much maths
function collisionCheck() {
    if (gameOver) {
        
    } else {
        baddiesCount.forEach((enem, index) => {
        let barfPos = mrBarf.getBoundingClientRect()
        let baddiePos = baddiesCount[index].getBoundingClientRect()

    if ((baddiePos.top > barfPos.top && baddiePos.top < (barfPos.bottom - 10))||((baddiePos.bottom + 10) > barfPos.top && baddiePos.bottom < barfPos.bottom)) {
        verticalMatch = true
      } else{
        verticalMatch = false
      }
      
      if ((baddiePos.right > (barfPos.left + 10) && baddiePos.right < barfPos.right)||(baddiePos.left < (barfPos.right - 10) && baddiePos.left > barfPos.left)) {
        horizontalMatch = true
      } else {
        horizontalMatch = false
      }

      if (horizontalMatch && verticalMatch && addNew){
        // let intersect = true
        addNew = false

        $("#jumpBarf").attr("src", "./game-images/creature-hit.gif")
        setTimeout(resetHit, 1000)
        setTimeout(collisionCheck, 1000)
        
        switch(livesLost) {
            case 0:
                heartLost = heart0
                owSound()
              break;
            case 1:
                heartLost = heart1
                owSound()
              break;
            case 2:
                heartLost = heart2
                owSound()
              break;
            case 3:
                barfDeath()
                deathSound()
            default:
              
          }

        heartLost.src = "./game-images/empty-heart.png"
        livesLost++
      } else {
        // let intersect = false
      }
     })
     setTimeout(collisionCheck, 100)
    }
}

function resetHit () {
    addNew = true
    $("#jumpBarf").attr("src", "./game-images/creature-run.gif")
}

function removeBaddies () {
    if (baddiesCount.length > 5) {
    baddiesCount.shift()
    baddiesCount.shift()
    baddiesCount.shift()
    }
    baddiesCount.filter(n => n)
    setTimeout(removeBaddies, 1000)
}

function showHearts () {
    gameScreen.append(heart0)
    gameScreen.append(heart1)
    gameScreen.append(heart2)
    if (stage == 0) {
        for (i = 0; i < 3; i++) {
            $("#hrt" + i).attr("src", "./game-images/heart.png")
        }
    }
    $(".hearts").fadeIn()
}

function owSound() {
    owNoise = Math.floor(Math.random() * 6)
    owWav.src = './sounds/ow' + owNoise +'.wav'
    owWav.currentTime = 0
    owWav.play()
}

function deathSound() {
    deathNoise = Math.floor(Math.random() * 4)
    deathWav.src = './sounds/death' + deathNoise +'.wav'
    deathWav.currentTime = 0
    deathWav.play()
}

function winSound() {
    winWav.src = './sounds/music9.mp3'
    winWav.currentTime = 0
    winWav.play()
}

function barfDeath() {
    gameOver = true
    $(".hearts").fadeOut()
    $("#jumpBarf").attr("src", "./game-images/creature-sad.gif")
    $("#barf").animate({
        bottom: 75
    }, 500, 'swing', function(){
        overWav.currentTime = 0
        overWav.play()
        lvlWav.pause()
        $("#barf").animate({
            bottom: -50
        }, 600, 'swing', function(){
            $("#background").fadeOut()
            $("#score").fadeOut()
            setTimeout(replayScreen, 1000)
        })
    })

}

function replayScreen() {
    barfImg.src = "./game-images/creature-sad.gif"
    gameScreen.append(gameOverTitle)
    gameScreen.append(againTitle)
    document.getElementById("score").style.right = "180px"
    document.getElementById("score").style.top = "110px"
    $("#gOverT").fadeIn()
    $("#againT").fadeIn()
    $("#score").fadeIn()
    replayWav.currentTime = 0
    replayWav.play()
    replayWav.loop = true
}

function resetGameCounts() {
    if (gameOver) {
    count = 0
    livesLost = 0
    stage = 0
    }
    i = 0
    spd = 1
    gap1 = 900
    gap2 = 800
    baddiesCount = []
}

function endLevel() {
    yaySound()
    $(".airEnemy").hide()
    $(".grndEnemy").hide()
    flagpole.style.bottom = "50px"
    flagpole.style.right = "-25px"
    $("#fpole").show()
    bgImg.style.animation = "animatedBackground 0s linear infinite"
    flagAppear()
    levelWon = true
    barfImg.src = "./game-images/creature-happy.gif"
    $("#barf").animate({
        left: 800
    }, 2000, 'swing')
    setTimeout(bgFadeOut, 1000)
    setTimeout(newGame, 7000)
}

function bgFadeOut() {
    $("#background").fadeOut(2500)
    $("#fpole").fadeOut(2500)
    $("#barf").fadeOut(2000)
    $(".hearts").fadeOut(2500)
    $("#score").fadeOut(2500)
    winSound()
    lvlWav.pause()
    stage++
}

function flagAppear() {
    $("#fpole").animate({
        right: 50
    }, 1000)
}