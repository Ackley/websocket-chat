var socket    = io.connect('http://ws.yutaka-j.org/');
var filtering = false;
var regex     = null;

jQuery(function($){
    socket.on('prependTweets-Daily', function(tweets){
        prependTweets(tweets);
    });

    socket.on('appendTweets-Daily', function(tweets){
        appendTweets(tweets);
    });

    socket.on('favoriteRet', function(result){
        notifyFavoriteResult(JSON.parse(result));
    });

    socket.on('retweetRet', function(result){
        notifyRetweetResult(JSON.parse(result));
    });

    function prependTweets(tweets){
        tweets.forEach(function(tweet){
            var output = template.render(JSON.parse(tweet));
            $("#tweets").prepend(output);
        });
        if(filtering){
            tweetFiltering(regex);
        }
    }

    function appendTweets(tweets){
        tweets.forEach(function(tweet){
            var output = template.render(JSON.parse(tweet));
            $("#tweets").append(output);
        });             
        if(filtering){
            tweetFiltering(regex);
        }
    }

    function notifyFavoriteResult(resultJSON){
        var result = resultJSON['result'];
        if(result == 'Success'){
            $.jGrowl(result + ':' + resultJSON['message'], {theme: 'success'});
        } else {
            $.jGrowl(result + ':' + resultJSON['message'], {theme: 'error'});
        }
    }

    function notifyRetweetResult(resultJSON){
        var result = resultJSON['result'];
        if(result == 'Success'){
            $.jGrowl(result + ':' + resultJSON['message'], {theme: 'success'});
        } else {
            $.jGrowl(result + ':' + resultJSON['message'], {theme: 'error'});
        }
    }
});

function tweetFiltering(regex){
    filtering = true;
    $(".media").show();
    $(".media").each(function(){
        if(!$(this).html().match(regex)){
            $(this).hide();
        }
    });
}

$("a").click(function(){
    $("li").removeClass("active");
    $("li#" + this.id).addClass("active");
});

$("form#filter").submit(function(){
    $("li").removeClass("active");
    $("li#" + this.id).addClass("active"); 

    try{
        regex = new RegExp($("input#filter").val());
    } catch(err) {
        $.jGrowl(err, {sticky: true, theme: 'error'});
        return false;
    } 
    tweetFiltering(regex);

    return false;
});

$(document).on("click", '#rt', function(){
    socket.emit('retweetReq', {tweetId: $(this).val()});
});

$(document).on("click", '#fav', function(){
    socket.emit('favoriteReq', {tweetId: $(this).val()});
});

$("#tweetDate").change(function(){
    var strDate = $(this).val();
    var date = new Date(strDate);
    var unixTime = date.toString();
    if(unixTime == "Invalid Date"){
        alert("error");
    } else {
        $(".media").remove();
        socket.emit('dailyReportReq', {specifiedDay: unixTime});       
    }
});
