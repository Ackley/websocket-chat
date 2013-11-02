var template = Hogan.compile('<div id={{tweetId}} class="media" style="display: block;"><a class="pull-left" href="#"><img src="./images/{{firstUrlImage}}" alt={{firstUrlImage}} width="150px" class="img-thumbnail"></a><div class="media-body"><h4 class="media-heading"><img src="{{user.userIcon}}" width="58px" height="58px" class="img-thumbnail">@{{user.screenName}}({{user.userName}}) <div class="btn-group btn-group-xs"><button id="rt" value={{tweetId}} type="button" class="btn btn-default">RT</button><button id="fav" value={{tweetId}} type="button" class="btn btn-default">Fav</button></div></h4>{{{formattedText}}}<p class="text-muted"><em>{{localDate}}</em></p></div></div>');

$(window).on("scroll", function() {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        var startId = $(".media").get().reverse()[0].id;
        socket.emit('getOldTweets', {startId: startId, num: 10});
    }
});



