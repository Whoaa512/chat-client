var Messages = Backbone.Collection.extend({

	refreshMessages: function(room) {
		// get all the messages for this chatroom from dataManager and return them
		return dataManager.chatRooms[room][0];
	}

});