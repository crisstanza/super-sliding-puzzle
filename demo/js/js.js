(function() {
	//
	var SCREEN_OPENING = 1;
	var SCREEN_SELECT_LEVEL = 2;
	var SCREEN_GAME = 3;
	//
	var DELAY_SCREEN_CHANGE = 1000 * 1;
	var DELAY_OBJECTS_CHANGE = 400 * 1;
	//
	var CURRENT_LEVEL = 0;
	//
	var logger = {
		log: false,
		console: {
			log: function(msg) {
				if ( logger.log ) {
					console.log(msg);
				}
			}
		}
	};
	//
	// exposes the logger object so it can be turned
	// on/off from external debugging console:
	window.logger = logger;
	//
	function animateLogo(screen) {
		//
		logger.console.log('animateLogo('+screen+')');
		//
		var imgLogo = $('#img_logo');
		//
		if ( screen == SCREEN_OPENING ) {
			imgLogo.animate(
				{ left: 65, top: 125, width: 642, height: 311 },
				{ duration: DELAY_OBJECTS_CHANGE }
			);		
		} else if ( screen == SCREEN_SELECT_LEVEL ) {
			imgLogo.animate(
				{ left: 50, top: 55, width: 642/5, height: 311/5 },
				{ duration: DELAY_OBJECTS_CHANGE }
			);
		}
	}
	//
	function goToScreen(screen) {
		//
		logger.console.log('goToScreen('+screen+')');
		//
		var imgTitle = $('#img_title');
		var imgLogo = $('#img_logo');
		var panelButtons = $('#screen_1_buttons');
		var mainBack = $('#main_back');
		//
		if ( screen == SCREEN_OPENING ) {
			animateLogo(screen);
			panelButtons.fadeOut(DELAY_OBJECTS_CHANGE * 2);
			imgTitle.fadeOut(DELAY_OBJECTS_CHANGE);
			setTimeout(function() { goToScreen(SCREEN_SELECT_LEVEL); }, DELAY_SCREEN_CHANGE );
		} else if ( screen == SCREEN_SELECT_LEVEL ) {
			animateLogo(screen);
			imgTitle.fadeIn(DELAY_OBJECTS_CHANGE);
			imgLogo.fadeIn(DELAY_OBJECTS_CHANGE);
			panelButtons.fadeIn(DELAY_OBJECTS_CHANGE * 2);
			$('#main_board_1').fadeOut(DELAY_OBJECTS_CHANGE);
			$('#main_board_2').fadeOut(DELAY_OBJECTS_CHANGE);
			$('#main_board_3').fadeOut(DELAY_OBJECTS_CHANGE);
			mainBack.fadeOut(DELAY_OBJECTS_CHANGE);
		} else if ( screen == SCREEN_GAME ) {
			imgTitle.fadeOut(DELAY_OBJECTS_CHANGE);
			imgLogo.fadeOut(DELAY_OBJECTS_CHANGE);
			panelButtons.fadeOut(DELAY_OBJECTS_CHANGE);
			$('#main_board_'+CURRENT_LEVEL).fadeIn(DELAY_OBJECTS_CHANGE);
			mainBack.fadeIn(DELAY_OBJECTS_CHANGE);
		}
	}
	//
	function init() {
		//
		logger.console.log('init()');
		//
		var links = $('#screen_1_buttons a');
		var length = links.length - 1;
		for ( var i = length ; i >=0 ; i-- ) {
			var link = $(links[i]);
			link.click(function(evt) {
				CURRENT_LEVEL = $(evt.target).attr('href').split('#')[1];
				goToScreen(SCREEN_GAME);
			});
		}
		//
		var linkMainBack = $('#main_back');
		linkMainBack.click(function(evt) {
			CURRENT_LEVEL = $(evt.target).attr('href').split('#')[1];
			goToScreen(SCREEN_SELECT_LEVEL);
		});
		//
		// goToScreen(SCREEN_OPENING);
		setTimeout(function() { goToScreen(SCREEN_OPENING); }, DELAY_SCREEN_CHANGE );
		// setTimeout(function() { goToScreen(SCREEN_OPENING); }, 0 );
	}
	//
	$(document).ready(init);
	//
})();