function FacebookStuff() {
}

FacebookStuff.appId = '329757033789605';
FacebookStuff.scope = 'publish_actions';
FacebookStuff.userID = -1;
FacebookStuff.userName = null;
FacebookStuff.accessToken = null;
FacebookStuff.score = -1;
FacebookStuff.appUrl = document.location.protocol+"//super-sliding-puzzle.herokuapp.com";

FacebookStuff.MAX_SCORES = 10; // players
FacebookStuff.MAX_PLAYER_NAME = 12; // chars

FacebookStuff.UPDATE_SCORE = true; // MUST be true in PRODUCTION

FacebookStuff.authUser = function() {
	var url = ''+
		'http://www.facebook.com/dialog/oauth/?'+
		'client_id='+FacebookStuff.appId+
		'&redirect_uri='+FacebookStuff.appUrl+
		'&scope='+FacebookStuff.scope
	;
	window.location.href = url;
}

FacebookStuff.getUserName = function() {
	FB.api('/me', function(response) {
		FacebookStuff.userName = response.name;
	});
}