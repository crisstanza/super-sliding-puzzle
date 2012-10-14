(function() {
	//
	var SCREEN_OPENING = 1;
	var SCREEN_SELECT_LEVEL = 2;
	var SCREEN_GAME = 3;
	//
	var DELAY_SCREEN_CHANGE = 1000 * 1;
	var DELAY_OBJECTS_CHANGE = 400 * 1;
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
	function animateTitle(screen) {
		//
		logger.console.log('animateTitle('+screen+')');
		//
		var imgTitle = $('#img_title');
		//
		if ( screen == SCREEN_OPENING ) {
			imgTitle.fadeOut(DELAY_OBJECTS_CHANGE);
		} else 	if ( screen == SCREEN_SELECT_LEVEL ) {
			imgTitle.fadeIn(DELAY_OBJECTS_CHANGE);
		}
	}
	//
	function animateButtons(screen) {
		//
		logger.console.log('animateButtons('+screen+')');
		//
		var panelButtons = $('#screen_1_buttons');
		//
		if ( screen == SCREEN_OPENING ) {
			panelButtons.fadeOut(DELAY_OBJECTS_CHANGE * 2);
		} else 	if ( screen == SCREEN_SELECT_LEVEL ) {
			panelButtons.fadeIn(DELAY_OBJECTS_CHANGE * 2);
		}
	}
	//
	function goToScreen(screen) {
		//
		logger.console.log('goToScreen('+screen+')');
		//
		if ( screen == SCREEN_OPENING ) {
			animateLogo(screen);
			animateTitle(screen);
			setTimeout(function() { goToScreen(SCREEN_SELECT_LEVEL); }, DELAY_SCREEN_CHANGE );
		} else if ( screen == SCREEN_SELECT_LEVEL ) {
			animateLogo(screen);
			animateTitle(screen);
			animateButtons(screen);
		}
	}
	//
	function init() {
		//
		logger.console.log('init()');
		//
		// goToScreen(SCREEN_OPENING);
		setTimeout(function() { goToScreen(SCREEN_OPENING); }, DELAY_SCREEN_CHANGE );
		// setTimeout(function() { goToScreen(SCREEN_OPENING); }, 0 );
	}
	//
	$(document).ready(init);
	//
})();