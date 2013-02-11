var ChatEntryView = Backbone.View.extend({

  tagName: "div",

  template: _.template("<span class='message'><span class='username'><%= username %>: </span><span><%= text %></span><span class='time'> (<%= moment(createdAt).fromNow() %>)</span></span>"),

  render: function(){
    console.log(this.model);
    return this.$el.html(this.template(this.model));
  }
});