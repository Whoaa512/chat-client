
var message = {};


$(document).ready(function(){
  $('form').keypress(function(e){
    if (e.which == 13) {
      e.preventDefault();
      message["username"] = $("#username").val();
      message["text"] = $("#text").val();
      sendMessage(JSON.stringify(message));
    }
  })
})


var sendMessage = function(message){
  $.ajax("http://127.0.0.1:8080/1/classes/messages", {
  	beforeSend: headerSetter,    
  	type: "POST",
  	contentType: "application/json",
  	data: message,
  	success: function(){
      $('#text').val('');  
  	},
  	error: function() {}
  });
}


