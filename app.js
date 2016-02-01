
var imgObj = null;
var animate ;
var $sky = $('.sky')

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
  position: 'relative',
  left: '0px',
  height: '55px'
  })
  this.selector.animate({
   left: "880px"
  }, ((Math.random() * 2000) + 4000), function () {
   $(this).remove()
  })
  this.selector.click(function () {
   console.log("BOOM!");
   $(this).attr('src','images/bam-md.png')
  })
}
