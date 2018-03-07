var socket;
var cnv;
var text;
var text2;
var text3;


function setup() {
  cnv=createCanvas(800, 600);
  cnv.position(350,50);
  background(220, 180, 200);
  text3 = createDiv('<h4>--------------------</h4>');
  text3.position(10, 25);

  text = createDiv('<h4>MULTI DRAWER CANVAS</h4>');
  text.position(10, 55);

  text2 = createDiv('<h4>--------------------</h4>');
  text2.position(10, 85);


  // Connecting to the socket server 
  socket = io.connect('http://localhost:3000');

  /* client recieving the socket data*/
//socket event called the mouse function holds the data passed into it 
socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("GOT: " + data.x + " " + data.y);
      //draw circle at the points received   
      noStroke();
      fill(155);
      ellipse(data.x, data.y, 20, 20);  
    })
}  

function mouseDragged() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,20,20);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// function to send coordinates
function sendmouse(xpos, ypos) {
  // this shows up in terminal
  console.log("SEND COORDS: " + xpos + " " + ypos);
 //hold the x,y positions in a data object
 var data = {
  x: xpos,
  y: ypos
};
// send the data object to the socket 
socket.emit('mouse',data);



}