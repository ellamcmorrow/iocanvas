**Multi user realtime whiteboard**

This is a multiple drawer canvas which uses node.js, express.js, socket.io, p5.js and JQuery.</br>
The application uses server-side programming created with node.js. P5.js and JQuery are</br>
used for the client-side the programming. A socket is a real-time connection that allows</br>
people to communicate. There are two client files, index.html, and sketch.js. When the</br>
client draws on the p5 canvas it talks to the server using sockets. Similarly, when a</br>
username is submitted in the HTML file on the client a JQuery event handles the request</br>
and using sockets and sends it to the server. The server then sends this to the other clients</br>
connected to the socket.