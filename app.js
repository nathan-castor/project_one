
var imgObj = null;
var animate ;
var $sky = $('.sky')

function start() {
  Duck()
  Duck()
  Duck()
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

//start button does start function which calls a round function which happens 3 times per level
//the round function calls a number of Duck based on the level (two for level one)
// also the speed in moveDuck goes up based on level.
// The ducks then
