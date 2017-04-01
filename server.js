// Tout d'abbord on initialise notre application avec le framework Express 
// et la bibliothèque http integrée à node.
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// On gère les requêtes HTTP des utilisateurs en leur renvoyant les fichiers du dossier 'public'
app.use("/", express.static(__dirname + "/public"));

// On lance le serveur en écoutant les connexions arrivant sur le port 3000
http.listen(3000, function(){
  console.log('Server is listening on *:3000');
});

io.on('connection', function(socket) {
	
  var loggedUser;
	
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  
  socket.on('chat-message', function (message) {
	message.username = loggedUser.username;
	console.log('Message de : ' + loggedUser.username);
    console.log('message : ' + message.text);
    io.emit('chat-message', message);
  });
  
  socket.on('user-login', function (user) {
    console.log('user logged in : ' + user.username);
    loggedUser = user;
  });
  
  socket.on('disconnect', function () {
    if (loggedUser !== undefined) {
      console.log('user disconnected : ' + loggedUser.username);
      var serviceMessage = {
        text: 'User "' + loggedUser.username + '" disconnected',
        type: 'logout'
      };
      socket.broadcast.emit('service-message', serviceMessage);
    }
  });

  socket.on('user-login', function (user) {
    loggedUser = user;
    if (loggedUser !== undefined) {
      var serviceMessage = {
        text: 'User "' + loggedUser.username + '" logged in',
        type: 'login'
      };
      socket.broadcast.emit('service-message', serviceMessage);
    }
  });
  
});