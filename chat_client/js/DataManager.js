(function(){
  var dataManager = window.dataManager = {
    chatRooms: {},
    sendMessage: function(message){
      $.ajax("http://127.0.0.1:8080/1/classes/"+chatRoom, {
        type: "POST",
        contentType: "application/json",
        data: message,
        success: function(){
          $('#text').val('');  
        },
        error: function() {}
      });
    }
  } 

  var fetchData = function(room){
    $.ajax("http://127.0.0.1:8080/1/classes/" + room, {
      type: "GET",
      contentType: "application/json",
      success: function(data){
        dataManager.chatRooms[room] = [];
        dataManager.chatRooms[room].push(data);
        // todo: dataManager.chatRooms.trigger('fetched');
      },
      error: function(data) {
        console.log('ERRORS!');
      }
    });
  };

  setInterval(function(){
    fetchData(chatRoom);
    chatView.render(chatRoom);
  }, 1000);

}());