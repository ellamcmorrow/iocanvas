//setup arrays
users=[];
connections=[];
// Using express
var express = require('express'); //makes an express application
// stores the reult in a variable called app.
var app = express();
// Set up the server on local host 3000
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server running at:' + host + ':' + port);//terminal
}

app.use(express.static('public'));

//creating a socket ON a server -> keeps track of inputs and outputs
var io = require('socket.io')(server);



// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {

    console.log("NEW CLIENT: " + socket.id); //new id created for a new connection


  //when the client side user draws
  //server side recieves mouse data from p5 client
  socket.on('mouse',
    function(data) {
        // Data recieved from whatever is held in the data object (x,y coords)
        console.log("RECIEVED: " + data.x + " " + data.y);//coordinates spit out in the console.
    
      // Send it to the other clients connected
        socket.broadcast.emit('mouse', data);
     }
     );


  //newuser
  socket.on('new user', function(data,callback){
    callback(true);
    socket.username=data; //fetch data entered by the user
    users.push(socket.username); //add to the users array
    updateUsernames(); //calling update users array
  });


function updateUsernames(){
    io.sockets.emit('get users',users); 
  }

//disconnect
socket.on('disconnect',function(data){

  users.splice(users.indexOf(socket.username),1) //splice removes user from array
  updateUsernames();

//remove user
connections.splice(connections.indexOf(socket), 1);

console.log('CLIENT DISCONNECTED'+ connections.length);

})

});


