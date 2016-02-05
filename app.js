
var imgObj = null;
var animate ;
var $sky = $('.sky')
var bamPic = 'images/BAM.png'
var bamPic2 = 'images/bam-md.png'
var duckImg = 'images/duck_hunt_bird.GIF'
var $bullsEye = $("#bullsEye")[0]
var $allAudio = $("audio")
var $dogSelector = $('.dog')
var $gunShot = $("#gunShot")[0]
var $clickSound = $("#clickSound")[0]
var $reload = $('#shotgunReload')[0]
var dogFartCounter = 1

var game = {
  started: false,
  playerOne: {
    name: 'Player One',
    score: 0,
    misses: 0,
    level: 1,
    round: 1,
    bullets: 6,
    done: false
  },
  playerTwo: {
    name: 'Player Two',
    score: 0,
    misses: 0,
    level: 1,
    round: 1,
    bullets: 6,
    done: false
  },
  escapeSpeed: 5000,
  ducksThisRound: 0,
  pause: false
}

game.currentPlayer = game.playerOne

function gameON() {
  if (game.started == false) {
    game.started = true
    startRound()
    dogPhase1()
  }else{
    whoWon()
  }
}
// ********* Start the Round ********************************
function startRound() { //startROUND
  $sky.html('')
  var numDucks = game.currentPlayer.level + 2
  $('#alerts').html(game.currentPlayer.name +"<br><h3>ROUND " +game.currentPlayer.round + "</h3>").show(0).animate({display: 'block'},2000,function () {
    $(this).hide(400, function(){
      for (var j = 0; j < numDucks; j+=1) { //making the ducks based on current level
        if(game.ducksThisRound % 2 == 0){
          new Duck('right')
          game.ducksThisRound += 1
        }else {
          new Duck('left')
          game.ducksThisRound += 1
        }
      }
    })
  })
}

// ************************************************************************
// ------------------------------ Duck Constructor ---------------------
// ************************************************************************

// Create ducks with all the functionality built in
function Duck(heading){
  this.id = $('.duck').length
  $sky.append('<img class="duck duck-' +this.id+ '" ' + 'src="images/duck_hunt_bird.GIF" />')
  this.selector = $('.duck-' + this.id)
  this.selector.css({
  top: Math.floor((Math.random() * 325)+55) + 'px',
  height: '55px',
  position: 'absolute'
  })
  if (heading == 'right') {
    this.selector.css({
      "-moz-transform": "scaleX(-1)",
      "-o-transform": "scaleX(-1)",
      "-webkit-transform": "scaleX(-1)",
      "transform": "scaleX(-1)",
      "filter": "FlipH",
      "-ms-filter": "FlipH"
    })
  }
  this.selector.css({
    "height": "70px"
  })
// every other duck start at opposite side
  // if(game.ducksThisRound % 2 == 0){ // start duck on the left
  var cssObjLast = {}
  var cssObjFirst = {}
  var randomSpeed = ((Math.random() * 2000) + 2000)
  cssObjLast[heading] = '0px'
  cssObjFirst[heading]= '880px'

  var duckx = this.selector
  fly(duckx, heading, cssObjFirst, cssObjLast)

  this.selector.click(function () {
    stopSound()
    //$allAudio.stop()
    if (game.pause == false && game.currentPlayer.bullets > 0) {
      $bullsEye.play()
      $(this).attr('src',bamPic2)
      $(this).stop().stop().hide(200, function () {
        $(this).remove()
      })
      // add noise to click event
      // Noise here
      // remove ducks
      game.ducksThisRound -= 1
      // add to player score
      game.currentPlayer.score++
      $('#player'+ game.currentPlayer.name.slice(7,10)+"-score").html("Score: "+ game.currentPlayer.score)
      checkEOR()
    }
  })
}//END of DUCK CONSTRUCTOR
// ********************* End Duck Constructor**********************

// ************************************************************************
// --------- functions used inside Duck Constructor ----------
// ************************************************************************
function flipImg(duckx,heading) {
  if (heading == 'left') {
    duckx.css({
      "-moz-transform": "scaleX(-1)",
      "-o-transform": "scaleX(-1)",
      "-webkit-transform": "scaleX(-1)",
      "transform": "scaleX(-1)",
      "filter": "FlipH",
      "-ms-filter": "FlipH"
    })
  }else {
    duckx.css({
      "-moz-transform": "scaleX(1)",
      "-o-transform": "scaleX(1)",
      "-webkit-transform": "scaleX(1)",
      "transform": "scaleX(1)",
      "filter": "FlipH",
      "-ms-filter": "FlipH"
    })
  }
}
function fly(duckx, heading, firstPlace, lastPlace) {
  phase1(duckx, firstPlace, lastPlace, heading)
}
function phase1(duckx, firstPlace, lastPlace, heading) {
  var randomSpeed = ((Math.random() * 2000) + 2000)
	duckx.animate(firstPlace, randomSpeed, function () {
      flipImg($(this),heading) //possible issue with scope here
      phase2(duckx, lastPlace)
    })
}
function phase2(duckx, lastPlace) {
	duckx.animate(lastPlace, game.escapeSpeed, function(){
   $(this).remove()
   game.currentPlayer.misses +=1
   $('#player'+ game.currentPlayer.name.slice(7,10)+"-misses").html("Misses: "+ game.currentPlayer.misses)
   game.ducksThisRound -= 1
   checkEOR()
 })
}

// ************************************************************************
// ------------------ Below is mostly Dog related -------------------
// ************************************************************************
// dog walking
function dogPhase1() {
  $('.ground').prepend('<img class="dog" src="images/dog_walking.gif" alt="" />')
  var dogHeading = 'left'
  var lastPlace = {}
  var firstPlace = {}
  lastPlace[dogHeading] = '0px'
  firstPlace[dogHeading]= '900px'
	$('.dog').animate({left: "900px"}, 8000, function () {
      console.log("animate dog phase 1")
      flipImg($(".dog"),dogHeading) //possible issue with scope here
      dogPhase2(lastPlace)
    })
}
function dogPhase2(lastPlace) {
  console.log('made it to dog phase two')
	$('.dog').animate(lastPlace, 8000,function () {
    console.log('executing dog phase two')
    $('.dog').remove()
	  dogPhase1()
	})
}

//clicking the dog functins
$('body').on("click",'.dog', function() {
  console.log("clicked dog")
  stopSound()
  if (dogFartCounter < 6) {
    $('#dogFart'+dogFartCounter)[0].play()
    dogFartCounter += 1
    console.log("dog farts " +dogFartCounter );
  }else {
    dogFartCounter = 0
    $('#dogFart'+dogFartCounter)[0].play()
  }
  $('.dog').pause().delay(1500).resume()
})

// ************************************************************************
// --------- the game logic ----------
// ************************************************************************
function checkEOR() {
  if (eor()) { // checking if round is over
    if (checkLoss()) { // check if end of game for one player
      if (eog()) { // check if game is over
        whoWon()
      }else { // if game is not over end game for current player and switch players
        loss()
      }
    }else { // if no loss
      if (eol()) { // if end of level switch players
        nextLevel()
      }else { // if not end of level go to next round
        nextRound()
      }
    }
  }else{ // if not end of round
    //There's still ducks do nothing
  }//end check for no ducks
}//end function

// ************************************************************************
// --------- Below are the functions that make up the game logic ----------
// ************************************************************************

function eor() {
  return game.ducksThisRound == 0
}
function checkLoss() {
  return game.currentPlayer.misses >= 3
}
function eol() {
  return game.currentPlayer.round >= 3
}
function eog() {
  return (game.playerOne.misses >= 3 && game.playerTwo.misses >= 3)
}
function loss() {
  console.log("end of game for "+ game.currentPlayer);
  $('#alerts').html(game.currentPlayer.name +" You're done!").show(0).animate({display: 'block'},2000,function () {
    $(this).hide(400,function() {
    game.currentPlayer.done = true
    switchPlayers()
    $('#alerts').html(game.currentPlayer.name + " Get READY for level" + game.currentPlayer.level).show(0).animate({display: 'block'},2000,function () {
      $(this).hide(400, function () {
      setTimeout(startRound, 3000)
    })
  })
})
})
}
function switchPlayers() {
  switch (game.currentPlayer) {
    case game.currentPlayer = game.playerOne:
      game.currentPlayer = game.playerTwo;
      break;
    case game.currentPlayer = game.playerTwo:
      game.currentPlayer = game.playerOne;
      break;
    default:
      game.playerOne;
  }
}
function whoWon() {
  $('.duck').remove() // clear ducks from the sky

  if (game.playerOne.score > game.playerTwo.score) {
    $('#alerts').html("game over " +game.playerOne.name+" wins! <br>player one score: " + game.playerOne.score + "<br>player two score: "+game.playerTwo.score).show(0)
  }else if (game.playerOne.score < game.playerTwo.score) {
    $('#alerts').html("game over " +game.playerTwo.name+" wins! <br>player one score: " + game.playerOne.score + "<br>player two score: "+game.playerTwo.score).show(0)
  }else {
    $('#alerts').html("Tie Game! <br>player one score: " + game.playerOne.score + "<br>player two score: "+game.playerTwo.score).show(0)
  }
  game = {
    started: false,
    playerOne: {
      name: 'Player One',
      score: 0,
      misses: 0,
      level: 1,
      round: 1,
      bullets: 6,
      done: false
    },
    playerTwo: {
      name: 'Player Two',
      score: 0,
      misses: 0,
      level: 1,
      round: 1,
      bullets: 6,
      done: false
    },
    escapeSpeed: 5000,
    ducksThisRound: 0,
    pause: false
  }
  game.currentPlayer = game.playerOne
  $('#playerOne-score').html("Score: "+ game.playerOne.score)
  $('#playerOne-misses').html("Misses: "+ game.playerOne.misses)

  $('#playerTwo-score').html("Score: "+ game.playerTwo.score)
  $('#playerTwo-misses').html("Misses: "+ game.playerTwo.misses)

}

function nextRound() {
  game.currentPlayer.round += 1
  console.log(game.currentPlayer.name + 'start round:  ' + game.currentPlayer.round)
  startRound()
}

function nextLevel() {
  $('#alerts').html(game.currentPlayer.name+ " You passed this Level!").show().animate({display: 'block'},2000,function () {
    $(this).hide(400,function() {
      game.currentPlayer.misses = 0
      game.currentPlayer.round = 1
      game.currentPlayer.level += 1
      if (game.playerOne.done == false && game.playerTwo.done == false) {
        switchPlayers()
      }
      $('#alerts').html(game.currentPlayer.name + "<br>Level " +game.currentPlayer.level).show().animate({display: 'block'},2000,function () {
        $(this).hide(400,function() {
        // Add delay
        setTimeout(startRound, 3000)
        console.log("new level " + game.currentPlayer.level);
        })
      })
    })
  })
}


// body event listener that takes from bullets
$('.sky').click(function(){
  // stop other sounds
  stopSound()
  //$allAudio.stop()
  if (game.pause == false && game.currentPlayer.bullets > 0) {
    $gunShot.play()
    game.currentPlayer.bullets -= 1
  }else if(game.pause == false && game.currentPlayer.bullets == 0){
    $clickSound.play()
    game.currentPlayer.bullets = 0
  }
  $('#player'+ game.currentPlayer.name.slice(7,10)+"-bullets").html("Bullets: "+ game.currentPlayer.bullets)
})

$('.ground').click(function(){
  stopSound()
  //$allAudio.stop()
  $reload.play()
  game.currentPlayer.bullets = 6
  $('#player'+ game.currentPlayer.name.slice(7,10)+"-bullets").html("Bullets: "+ game.currentPlayer.bullets)
})
function stopSound() {
  if (!$('audio').paused) {
    $('audio').each(function(){
    this.pause(); // Stop playing
    this.currentTime = 0; // Reset time
    });
  }
}
var clicks = 0
function pauseButton() {
  stopSound()
  if (clicks % 2 == 0) {
    console.log("paused");
    game.pause = true
    $('.duck').pause()
    $('#alerts').pause()
    $('.dog').pause()
    clicks++
  }else{
    console.log("unpaused");
    game.pause = false
    $('.duck').resume()
    $('#alerts').resume()
    $('.dog').resume()
    clicks++
  }
}
