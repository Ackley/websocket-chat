var template = Hogan.compile('<p>{{name}}:{{message}}</p>');
var socket = io.connect('http://192.168.0.33:3001');

function messageReload(){
    $.ajax({
	type: "GET",
	url: "http://192.168.0.33/get_all_message",
	dataType: "json",
	success: function(data){
	    $(".container p").remove();
	    data.forEach(function(log){
		var output = template.render(JSON.parse(log));
		$("#messages").prepend(output);
	    });
	},
	error: function(err){
	    alert("ERROR");
	}
    });
}


$("#reload").submit(function(event){
    messageReload();
    return false;
});

$('#post_message').submit(function(event){
    $.ajax({
        url: 'http://192.168.0.33/post_message',
        type: 'POST',
        dataType: 'json',
        data: {name: $('#name').val(), message: $('#message').val()},
        success: function(data){
        },
        error: function(data){
        }
    });
    return false;
});

socket.on('reload', function(json){
    messageReload();
    return false;
});