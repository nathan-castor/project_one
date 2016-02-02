
var imgObj = null;
var animate ;
var $sky = $('.sky')
var bamPic = 'images/BAM.png'
var bamPic2 = 'images/bam-md.png'

// Add click event everywhere in body that makes a gun shot sound
//$('body').click()
// Later Add a click event in the footer that reloads your gun
// $('footer').click()

var game = {
  playerOne: {
    score: 0,
    misses: 0,
    level: 1,
    round: 1,
  },
  playerTwo: {
    score: 0,
    misses: 0,
    level: 1,
    round: 1,
  },
  winner: '',
  escapeSpeed: 3500,
  ducksThisRound: 0
}

// start the game with player One
game.currentPlayer = game.playerOne

// ********* Start the Round ********************************
function startRound() { //startROUND
  var numDucks = game.currentPlayer.level + 2

  for (var j = 0; j < numDucks; j+=1) { //making the ducks based on current level
    console.log("Made duck " + j);
    new Duck()
    game.ducksThisRound += 1
  }
}

// *********************Duck Constructor**********************
// Create ducks with all the functionality built in
function Duck(){
  this.id = $('.duck').length
  $sky.append('<img class="duck duck-' +this.id+ '" ' + 'src="images/duck_hunt_bird.GIF" />')
  this.selector = $('.duck-' + this.id)
  this.selector.css({
  top: Math.floor(Math.random() * 400) + 'px',
  height: '55px',
  position: 'absolute'
  })
// every other duck start at opposite side
  if(game.ducksThisRound % 2 == 0){ // start duck on the left
    this.selector.css({
      left: '0px',
    })
    this.selector.animate({
     left: "880px" //change to window.length
   }, ((Math.random() * 2000) + 2000)).animate({
     left: '0px'
   }, game.escapeSpeed, function(){
     $(this).remove()
     game.currentPlayer.misses +=1
     console.log('misses ' + game.currentPlayer.misses);
     game.ducksThisRound -= 1
     console.log('ducks this round ' + game.ducksThisRound);
     checkEOR()
   })
  }else { // start duck on the right
      this.selector.css({
        right: '0px',
      })
      this.selector.animate({
       right: "880px" //change to window.length
     }, ((Math.random() * 2000) + 2000)).animate({
       right: '0px'
     }, game.escapeSpeed, function () {
       $(this).remove()
       game.currentPlayer.misses +=1
       game.ducksThisRound -= 1
       checkEOR()
      })
    }

  this.selector.click(function () {
    $(this).attr('src',bamPic2)
    $(this).stop().stop().hide(200, function () {
      $(this).remove()
    })
    // add noise to click event
    // Noise here
    // remove ducks
    game.ducksThisRound -= 1
    console.log('ducks this round ' + game.ducksThisRound);
    // add to player score
    game.currentPlayer.score++
    checkEOR()
  })
}//END of DUCK CONSTRUCTOR
// ********************* End Duck Constructor**********************


// ************************************************************************
// --------- the game logic ----------
// ************************************************************************
function checkEOR() {
  if (eor()) { // checking if round is over
    console.log("It's the end of round");
    if (loss()) { // check if end of game for one player
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
    console.log("There's still ducks");
  }//end check for no ducks
}//end function

// ************************************************************************
// --------- Below are the functions that make up the game logic ----------
// ************************************************************************

function eor() {
  return game.ducksThisRound == 0
}
function loss() {
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
  window.alert(game.currentPlayer + " You're done!")
  switchPlayers()
  window.alert(game.currentPlayer + " Get READY")
  setTimeout(startRound, 3000)
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
    window.alert("game over " +game.playerOne+"wins! \nplayer one score: " + game.playerOne.score + "\nplayer two score: "+game.playerTwo.score)
  }else if (game.playerOne.score > game.playerTwo.score) {
    window.alert("game over " +game.playerTwo+"wins! \nplayer one score: " + game.playerOne.score + "\nplayer two score: "+game.playerTwo.score)
  }else {
    window.alert("Tie Game! \nplayer one score: " + game.playerOne.score + "\nplayer two score: "+game.playerTwo.score)
  }
}
function nextRound() {
  game.currentPlayer.round += 1
  console.log(game.currentPlayer + 'start round:  ' + game.currentPlayer.round)
  startRound()
}
function nextLevel() {
    window.alert(game.currentPlayer+ " You passed this Level. Next player!");
    game.currentPlayer.misses = 0
    game.currentPlayer.round = 1
    game.currentPlayer.level += 1
    // switch to other player
    switchPlayers()
    // Add delay
    setTimeout(start, 3000)
}
