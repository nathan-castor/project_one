
var imgObj = null;
var animate ;
var sky = document.querySelector('.sky')
var counterOne = 0;
function start() {
  createDuck()
  //createDuck()
}
function createDuck(){
  sky.innerHTML ='<img id="myImage' +counterOne+ '" ' + 'src="images/duck_hunt_bird.GIF" />'
  counterOne++
  var duck = 'myImage' + counterOne.toString()
   imgObj = document.getElementById(duck);
   imgObj.style.top = Math.floor(Math.random() * 10)
   imgObj.style.position= 'relative';
   imgObj.style.left = '0px';
   moveRight()
}
function moveRight(){
  imgObj.style.left = parseInt(imgObj.style.left) + 8 + 'px';
  animate = setTimeout(moveRight,20); // call moveRight in 20msec
}
function stop(){
   clearTimeout(animate);
   imgObj.style.left = '0px';
}
//start button does start function which calls a round function which happens 3 times per level
//the round function calls a number of createDuck based on the level (two for level one)
// also the speed in moveDuck goes up based on level.
// The ducks then

// I need a random height variable
