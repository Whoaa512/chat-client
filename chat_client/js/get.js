$.ajax("http://127.0.0.1:8080/1/classes/messages", {
	beforeSend: headerSetter,    
	type: "get",
	contentType: "application/json",
	success: function(data){
		console.log(data.results[0].text);
		$('#main').append(data.results[0].text);
	},
	error: function() {alert("failed!")}
});