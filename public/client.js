var socket = io();

$('form').submit(function(e) {
    e.preventDefault();

    var message = {
        text : $('#m').val()
    };
	
    if (message.text.trim().length !== 0) {
      socket.emit('chat-message', message);
    }
	
    emptyInputMessage();
     focusInputMessage();
});

socket.on('chat-message', function (message) {
  $('#messages').append($('<li>').html('<span class="username">' + message.username + '</span> ' + message.text));
});

socket.on('service-message', function (message) {  
  $('#messages').append($('<li class="' + message.type + '">').html('<span class="info">information</span> ' + message.text));
});

$('#login form').submit(function (e) {
  e.preventDefault();
  var user = {
    username : $('#login input').val().trim()
  };
  if (user.username.length > 0) {
    socket.emit('user-login', user);
    hideCnxForm();
    focusInputMessage();
  }
});

function hideCnxForm() {
	$('body').removeAttr('id');
}

function focusInputMessage() {
	$('#chat input').focus();
}

function emptyInputMessage() {
	$('#m').val('');
}