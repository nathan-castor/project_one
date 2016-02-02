
var imgObj = null;
var animate ;
var $sky = $('.sky')
var bamPic = 'images/BAM.png'
var bamPic2 = 'images/bam-md.png'

var game = {
  playerOne: {
    score: 0,
    misses: 0
  },
  playerTwo: {
    score: 0,
    misses: 0
  },
  round: 1,
  level: 1,
  winner: '',
  escapeSpeed: 3500,
  ducksThisRound: 0
}
game.currentPlayer = game.playerOne

function start() { //startROUND
  var numDucks = game.level + 2

  for (var j = 0; j < numDucks; j+=1) { //making the ducks based on current level
    console.log("Made duck " + j);
    new Duck()
    game.ducksThisRound += 1
  }
}

function checkEndofRound() {
  if (game.ducksThisRound == 0) { // checking if round is over
    console.log("It's the end of round");
    if (checkEndofGame()) {  //checking for a loss
      window.alert("game over")
      window.alert("your score: " + game.currentPlayer.score)
    }else { // iterating to next round
      console.log("starting next round");
      if (game.round <= 3) {
        game.round += 1
        console.log('start round  ' + game.round)
        start()
      }else {
        window.alert("You passed this Level");
      }
    }//end else
  }else{
    console.log("There's still ducks");
  }//end check for no ducks
}//end function
function checkEndofGame() {
  return game.currentPlayer.misses == 3
}

// Add click event everywhere in body that makes a gun shot sound
//$('body').click()

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
     checkEndofRound()
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
       checkEndofRound()
      })
    }

  this.selector.click(function () {
    console.log('this is the duck element',this);
    $(this).attr('src',bamPic2)
    $(this).stop().stop().hide(500, function () {
      $(this).remove()
    })
    // add noise to click event
    // Noise here
    // remove ducks
    game.ducksThisRound -= 1
    console.log('ducks this round ' + game.ducksThisRound);
    // add to player score
    game.currentPlayer.score++
    checkEndofRound()
  })
}//END of DUCK CONSTRUCTOR
