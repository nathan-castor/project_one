
var imgObj = null;
var animate ;
var $sky = $('.sky')
var bamPic = 'images/BAM.png'
var bamPic2 = 'images/bam-md.png'
var game = {
  currentPlayer: '',
  playerOne: '',
  playerTwo: '',
  init: '',
  round: [1,2,3],
  level: 1,
  winner: ''
}

function start() {
  var numDucks = game.level + 2
  for (var i = 0; i < numDucks; i++) {
    new Duck()
  }
}

function Duck(){
  this.id = $('.duck').length
  $sky.append('<img class="duck" id="duck-' +this.id+ '" ' + 'src="images/duck_hunt_bird.GIF" />')
  this.selector = $('#duck-' + this.id)
  this.selector.css({
  top: Math.floor(Math.random() * 400) + 'px',
  //position: 'relative',
  // left: '0px',
  height: '55px',
  })
// every other duck start at opposite side
  if(this.id % 2 == 0){
    this.selector.css({
      left: '0px',
      position: 'relative'
    })
    this.selector.animate({
     left: "880px" //change to window.length
   }, ((Math.random() * 2000) + 4000)).animate({
     left: '0px'
   }, 2000, function(){
     $(this).remove()
   })
    }else {
      this.selector.css({
        right: '0px',
        position: 'absolute'
      })
      this.selector.animate({
       right: "880px" //change to window.length
     }, ((Math.random() * 2000) + 4000)).animate({
       right: '0px'
     }, 2000, function () {
       $(this).remove()
      })
    }

  this.selector.click(function () {
   console.log("BOOM!");
   $(this).attr('src',bamPic2)
   // add to player score
  })
}
