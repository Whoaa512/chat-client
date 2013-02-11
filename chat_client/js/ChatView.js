var ChatView = Backbone.View.extend({

	render : function(room){
		
    this.$el.html('');


    this.subviews = this.collection.refreshMessages(room).map(function(message){
  		return new ChatEntryView({model: message});
    })

    var that = this;
    _.each(this.subviews, function(subview){
      that.$el.append(subview.render());
    })

    $('#chatBox').html(this.$el)
  },

  message : {},

  initialize : function(){
    var that = this;
    $('form').keypress(function(e){
      if (e.which == 13) {
        e.preventDefault();
        that.message["username"] = $("#username").val();
        that.message["text"] = $("#text").val();
        that.message["createdAt"] = new Date();
        dataManager.sendMessage(JSON.stringify(that.message));
      }
    })
  }
});
