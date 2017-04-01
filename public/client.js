var socket = io();

$('form').submit(function(e) {
    e.preventDefault();

    var message = {
        text : $('#m').val()
    };
	
    if (message.text.trim().length !== 0) {
      socket.emit('chat-message', message);
    }
	
    $('#m').val(''); 
    $('#chat input').focus();
});