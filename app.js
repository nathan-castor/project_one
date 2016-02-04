
var imgObj = null;
var animate ;
var $sky = $('.sky')
var bamPic = 'images/BAM.png'
var bamPic2 = 'images/bam-md.png'
var duckImg = 'images/duck_hunt_bird.GIF'

// Add click event everywhere in body that makes a gun shot sound
//$('body').click()
// Later Add a click event in the footer that reloads your gun
// $('footer').click()

var game = {
  startClicks: 0,
  playerOne: {
    name: 'Player One',
    score: 0,
    misses: 0,
    level: 1,
    round: 1,
    done: false
  },
  playerTwo: {
    name: 'Player Two',
    score: 0,
    misses: 0,
    level: 1,
    round: 1,
    done: false
  },
  escapeSpeed: 5000,
  ducksThisRound: 0,
  pause: false
}
// var currentPlayer = game.currentPlayer
// start the game with player One
game.currentPlayer = game.playerOne

function gameON() {
  if (game.startClicks == 0) {
    game.startClicks += 1
    startRound()
  }else{
    whoWon()
    setTimeout(startRound, 3000)
  }
}
// ********* Start the Round ********************************
function startRound() { //startROUND
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

// *********************Duck Constructor**********************

// Create ducks with all the functionality built in
function Duck(heading){
  this.id = $('.duck').length
  $sky.append('<img class="duck duck-' +this.id+ '" ' + 'src="images/duck_hunt_bird.GIF" />')
  this.selector = $('.duck-' + this.id)
  this.selector.css({
  top: Math.floor((Math.random() * 325)+50) + 'px',
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
// every other duck start at opposite side
  // if(game.ducksThisRound % 2 == 0){ // start duck on the left
  var cssObjLast = {}
  var cssObjFirst = {}
  var randomSpeed = ((Math.random() * 2000) + 2000)
  cssObjLast[heading] = '0px'
  cssObjFirst[heading]= '880px'
  // var duckx = $(this)
  var duckx = this.selector
  fly(duckx, heading, cssObjFirst, cssObjLast)

  this.selector.click(function () {
    if (game.pause == false) {
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
    // $(this).attr('src',duckImg)
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

  //maybe set up an event listener for click and execute below after translating to my shit
	// $box.hover(function() {
	// 	$box.pause();
	// }, function() {
	// 	$box.resume();
	// });
	//phase1();

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
  if (game.playerOne.score > game.playerTwo.score) {
    $('#alerts').html("game over " +game.playerOne.name+" wins! <br>player one score: " + game.playerOne.score + "<br>player two score: "+game.playerTwo.score).show(0)
  }else if (game.playerOne.score < game.playerTwo.score) {
    $('#alerts').html("game over " +game.playerTwo.name+" wins! <br>player one score: " + game.playerOne.score + "<br>player two score: "+game.playerTwo.score).show(0)
  }else {
    $('#alerts').html("Tie Game! <br>player one score: " + game.playerOne.score + "<br>player two score: "+game.playerTwo.score).show(0)
  }
  game.currentPlayer = game.playerOne
  game.playerOne.level = 1
  game.playerOne.round = 1
  game.playerOne.score = 0
  game.playerOne.misses = 0
  game.playerOne.done = false
  $('#playerOne-score').html("Score: "+ game.playerOne.score)
  $('#playerOne-misses').html("Misses: "+ game.playerOne.misses)
  game.playerTwo.level = 1
  game.playerTwo.round = 1
  game.playerTwo.score = 0
  game.playerTwo.misses = 0
  game.playerTwo.done = false
  $('#playerTwo-score').html("Score: "+ game.playerTwo.score)
  $('#playerTwo-misses').html("Misses: "+ game.playerTwo.misses)
  game.ducksThisRound = 0
  $sky.html('')
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

var clicks = 0
function paused() {
  if (clicks % 2 == 0) {
    game.pause = true
    $('.duck').pause()
    $('#alerts').pause()
    clicks++
  }else{
    game.pause = false
    $('.duck').resume()
    $('#alerts').resume()
    clicks++
  }
}
