const startBtn = document.getElementById("start-button")
const playBtn = document.getElementById("play")
const title = document.getElementById("game-title")
const titleRoom = document.getElementById("title-room")
const barfGif = document.getElementById("barf-gif")
const gameScreen = document.getElementsByClassName("game-area")[0]
const mrBarf = document.getElementById("barf")
let barfImg = document.createElement("img")
barfImg.src = "./game-images/creature-2.png"
barfImg.id = "jumpBarf"

let bgImg = document.createElement("img")
bgImg.src = "./game-images/total-bg.png"
bgImg.id = "background"

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
let lvlWav = new Audio('./sounds/music2.mp3')
let okWav = new Audio('./sounds/okay2.wav')
let overWav = new Audio('./sounds/gameover.wav')
let replayWav = new Audio('./sounds/music1.mp3')

let topSlot = "200px"
let btmSlot = "100px"
let rightSlot = "-100px"

startBtn.addEventListener("click", startGame)
againTitle.addEventListener("click", reloadGame)

playBtn.addEventListener("click", loadIn)

let gameOver = false
let verticalMatch = false
let horizontalMatch = false
let addNew = true
let count = 0
let livesLost = 0

function loadIn() {
    $("#game-title").fadeIn(1500, function(){
        okWav.currentTime = 0
        okWav.volume = 0.7
        okWav.play()
        $("#barf-gif").fadeIn(1500, function(){
            $("#start-button").fadeIn(500)
        })
    })
    introMusic()
    gameScreen.style.visibility = "visible"
    playBtn.style.display = "none"
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
        left: 900
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
    document.getElementById("score").style.right = "35px"
    document.getElementById("score").style.top = "-30px"
    replayWav.pause()
    count = 0
    livesLost = 0
    gameOver = false
    $("#score").fadeIn()
    mrBarf.style.left = "-50px"
    mrBarf.style.bottom = "100px"
    $("#barf").animate({
        left: "100px"
    }, 200, 'linear')
    gameScreen.append(bgImg)
    $("#background").fadeIn()
    generateBaddies()
    letsGo.currentTime = 0
    letsGo.play()
    setTimeout(levelMusic, 550)
    collisionCheck()
    removeBaddies()
    showHearts()
}

function reloadGame() {
    let barfNoise = Math.floor(Math.random() * 7)
    let restartWav = new Audio('./sounds/barfnoise' + barfNoise + '.wav')
    restartWav.currentTime = 0
    setTimeout(restartWav.play(), 500)
    $("#againT").fadeOut()
    barfAgain()
    $("#barf").animate({
        left: "-100px"
    }, 1000, 'linear', function(){
        mrBarf.style.transform = "scaleX(1)"
        $("#score").fadeOut()
        $("#gOverT").fadeOut(function() {
            newGame()
    });
    })
}

function barfAgain() {
    mrBarf.style.left = "1000px"
    mrBarf.style.bottom = "100px"
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
    let groundWav = new Audio('./sounds/land' + groundNum + '.wav')
    groundWav.currentTime = 0
    groundWav.volume = 1
    groundWav.play()
}

function jumpSound() {
    jumpNum = Math.floor((Math.random() * 7) + 1)
    let jumpWav = new Audio('./sounds/jump' + jumpNum + '.wav')
    jumpWav.currentTime = 0
    jumpWav.volume = 0.5
    jumpWav.play()
}

function levelMusic() {
    lvlWav.currentTime = 0
    lvlWav.volume = 0.3
    lvlWav.play()
    lvlWav.loop = true
}

function introMusic() {
    introWav.currentTime = 0
    introWav.volume = 0.3
    introWav.play()
    introWav.loop=true
}

function titleBarfFalls () {
    $("#barf-gif").animate({
        top: 700
    }, 500, 'swing', function (){
        barfGif.style.right = "527px"
        barfGif.style.top = "-500px"
        $("#title-room").fadeIn("3000")
        $("#barf-gif").animate({
            top: 427
        }, 700, 'swing', function(){
            $("#barf-gif").hide()
            barfAppears()
        })
    })
}

let dblJump = false

document.addEventListener("keydown", (e) => {
    if (e.repeat) { return }
    if (dblJump != false && e.key ==="w") {
        barfTallJump()
        dblJump = false
        flightTime = 200
      } else if (e.key ==="w") {
        barfShortJump()
        dblJump = true
        dblJump = setTimeout('dblJump = false', 250);
        flightTime = 150
      }
      if (e.key === "w"){
      setTimeout(barfFall, (flightTime + 80))
      }
})

let jumpTime = 0


function barfTallJump() {
    jumpSound()
    jumpTime = 230
    $("#barf").animate({
        bottom: 250
    }, 200, 'swing')
}

function barfShortJump() {
    jumpSound()
    jumpTime = 180
    $("#barf").animate({
        bottom: 200
    }, 150, 'swing')
}

function barfFall() {
    $("#barf").animate({
        bottom: 100
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
    if (gameOver) {
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
                right: 800
            }, (baddyType.speeds * spd), 'linear')
            i++
            if (i < 500){
                generateBaddies()
            }
            count++
            document.getElementById('score').innerHTML = count.toString()
    }, (Math.floor(Math.random() * gap1 + gap2)))
}
}

let enemies = document.querySelectorAll(".bad");

// check for collisions... too much maths
function collisionCheck() {
    if (gameOver) {
        
    } else {
    baddiesCount.forEach((enem, index) => {
    let barfPos = mrBarf.getBoundingClientRect()
    let baddiePos = baddiesCount[index].getBoundingClientRect()

    if ((baddiePos.top > barfPos.top && baddiePos.top < (barfPos.bottom - 20))||((baddiePos.bottom + 20) > barfPos.top && baddiePos.bottom < barfPos.bottom)) {
        verticalMatch = true
      } else{
        verticalMatch = false
      }
      
      if ((baddiePos.right > (barfPos.left + 20) && baddiePos.right < barfPos.right)||(baddiePos.left < (barfPos.right - 20) && baddiePos.left > barfPos.left)) {
        horizontalMatch = true
      } else {
        horizontalMatch = false
      }

      if (horizontalMatch && verticalMatch && addNew){
        // let intersect = true
        addNew = false
        owNoise = Math.floor(Math.random() * 6)
        let owWav = new Audio('./sounds/ow' + owNoise +'.wav')
        owWav.currentTime = 0
        owWav.volume = 0.7
        owWav.play()
        // switch(count){
        //     case 4:
        //         count -= 4;
        //         break;
        //     case 3:
        //         count -= 3;
        //         break;
        //     case 2:
        //         count -= 2;
        //         break;
        //     case 1:
        //         count -= 1;
        //         break;
        //     case 0:
        //         count = 0;
        //         break; 
        //     default:
        //      count -= 5
        // }
        $("#jumpBarf").attr("src", "./game-images/creature-hit.gif")
        setTimeout(resetHit, 1000)
        setTimeout(collisionCheck, 1000)
        
        switch(livesLost) {
            case 0:
                heartLost = heart0
              break;
            case 1:
                heartLost = heart1
              break;
            case 2:
                heartLost = heart2
              break;
            case 3:
                barfDeath()
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
    $(".hearts").fadeIn()
    for (i = 0; i < 3; i++) {
        $("#hrt" + i).attr("src", "./game-images/heart.png")
    }

}

function barfDeath() {
    gameOver = true
    $(".hearts").fadeOut()
    $("#jumpBarf").attr("src", "./game-images/creature-hit.gif")
    $("#barf").animate({
        bottom: 150
    }, 500, 'swing', function(){
        overWav.currentTime = 0
        overWav.volume = 0.8
        overWav.play()
        lvlWav.pause()
        $("#barf").animate({
            bottom: -100
        }, 600, 'swing', function(){
            $("#background").fadeOut()
            $("#score").fadeOut()
            setTimeout(replayScreen, 1000)
        })
    })

}

function replayScreen() {
    gameScreen.append(gameOverTitle)
    gameScreen.append(againTitle)
    document.getElementById("score").style.right = "360px"
    document.getElementById("score").style.top = "220px"
    $("#gOverT").fadeIn()
    $("#againT").fadeIn()
    $("#score").fadeIn()
    replayWav.currentTime = 0
    replayWav.play()
    replayWav.volume = 0.8
    replayWav.loop = true
}

function resetGameCounts() {
    document.getElementById('score').innerHTML = "0"
    i = 0
    spd = 1
    gap1 = 900
    gap2 = 800
    baddiesCount = []
}