function Game() {
}
//
Game._POSITIONS = [
	[0, 0], [0, 1], [0, 2], [0, 3],
	[1, 0], [1, 1], [1, 2], [1, 3],
	[2, 0], [2, 1], [2, 2], [2, 3],
	[3, 0], [3, 1], [3, 2], [3, 3]
];
//
Game.currentState = undefined;
Game._SIDE = 100;
Game._N = 4;
Game._BACKGROUND_POSITIONS = [
	[Game._SIDE*0, +Game._SIDE*0], [-Game._SIDE*1, +Game._SIDE*0], [-Game._SIDE*2, +Game._SIDE*0], [-Game._SIDE*3, +Game._SIDE*0],
	[Game._SIDE*0, -Game._SIDE*1], [-Game._SIDE*1, -Game._SIDE*1], [-Game._SIDE*2, -Game._SIDE*1], [-Game._SIDE*3, -Game._SIDE*1],
	[Game._SIDE*0, -Game._SIDE*2], [-Game._SIDE*1, -Game._SIDE*2], [-Game._SIDE*2, -Game._SIDE*2], [-Game._SIDE*3, -Game._SIDE*2],
	[Game._SIDE*0, -Game._SIDE*3], [-Game._SIDE*1, -Game._SIDE*3], [-Game._SIDE*2, -Game._SIDE*3], [-Game._SIDE*3, -Game._SIDE*3]
];
//
Game.getInitialState = function() {
	var url = document.location.href;
	var x = 'currentState=';
	var p = url.indexOf(x);
	return (
		p >= 0 ?
			url.substring(p + x.length).split(',')
		:
			[
				'03', '02', '01', '00', 
				'04', '05', '06', '07', 
				'08', '09', '10', '11', 
				'12', '13', '14', '15'
			]
	);
};
//
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
			startBoard();
			mainBack.fadeIn(DELAY_OBJECTS_CHANGE);
		}
	}
	//
	function startBoard() {
		//
		logger.console.log('startBoard()');
		//
		var currentBoard = $('#main_board_'+CURRENT_LEVEL);
		currentBoard.html('');
		//
		Game.currentState = Game.getInitialState();
		var x = 0;
		for ( var i = 0 ; i < Game._N ; i++ ) {
			for ( var j = 0 ; j < Game._N ; j++ ) {
				var character = new Number(Game.currentState[x]);
				var visibleCharacter = character;
				visibleCharacter = '';
				var backgroundPosition = Game._BACKGROUND_POSITIONS[character];
				if ( character == 0 ) {
					currentBoard.append('<div id="_'+character+'" data-p="'+x+'" class="PieceEmpty '+(character == x ? 'PieceRight' : 'PieceWrong')+'" style="background-position: '+backgroundPosition[0]+'px '+backgroundPosition[1]+'px;">'+visibleCharacter+'</div>');
				} else {
					currentBoard.append('<div id="_'+character+'" data-p="'+x+'" onclick="move(this)" class="Piece '+(character == x ? 'PieceRight' : 'PieceWrong')+'" style="background-position: '+backgroundPosition[0]+'px '+backgroundPosition[1]+'px;">'+visibleCharacter+'</div>');
				}
				x++;
			}
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