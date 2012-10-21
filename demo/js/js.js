(function() {
	//
	var gsb = new GSB('g6uYq6v3T9bVLoAT1bXKZ9Mn2TLWNs3Q5s7SpB0K5f555MH1ZGeey7i1Ldhw18vN');
	//
	function Game() {
	}
	//
	Game._POSITIONS = [
		[
			[0, 0], [0, 1], [0, 2], [0, 3],
			[1, 0], [1, 1], [1, 2], [1, 3],
			[2, 0], [2, 1], [2, 2], [2, 3],
			[3, 0], [3, 1], [3, 2], [3, 3]
		],
		[
			[0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
			[1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
			[2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
			[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]
		],
		[
			[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
			[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5],
			[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5],
			[3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5],
		]
	];
	//
	Game.startTime = undefined;
	Game.mainClockLoop = undefined;
	//
	Game.gameOver = true;
	Game.currentState = undefined;
	Game.currentStateMatrix = [
		[
			[ [], [], [], [] ],
			[ [], [], [], [] ],
			[ [], [], [], [] ],
			[ [], [], [], [] ]
		],
		[
			[ [], [], [], [], [] ],
			[ [], [], [], [], [] ],
			[ [], [], [], [], [] ],
			[ [], [], [], [], [] ]
		],
		[
			[ [], [], [], [], [], [] ],
			[ [], [], [], [], [], [] ],
			[ [], [], [], [], [], [] ],
			[ [], [], [], [], [], [] ]
		]
	];
	Game._STEP = 25;
	Game._SPEED_CONTROL = 10;
	Game._SIDE = 100;
	Game.BOARD_SIZE = [
		[4, 4], [5, 4], [6, 4]
	];
	Game._BACKGROUND_POSITIONS = [
		[
			[Game._SIDE*0, +Game._SIDE*0], [-Game._SIDE*1, +Game._SIDE*0], [-Game._SIDE*2, +Game._SIDE*0], [-Game._SIDE*3, +Game._SIDE*0],
			[Game._SIDE*0, -Game._SIDE*1], [-Game._SIDE*1, -Game._SIDE*1], [-Game._SIDE*2, -Game._SIDE*1], [-Game._SIDE*3, -Game._SIDE*1],
			[Game._SIDE*0, -Game._SIDE*2], [-Game._SIDE*1, -Game._SIDE*2], [-Game._SIDE*2, -Game._SIDE*2], [-Game._SIDE*3, -Game._SIDE*2],
			[Game._SIDE*0, -Game._SIDE*3], [-Game._SIDE*1, -Game._SIDE*3], [-Game._SIDE*2, -Game._SIDE*3], [-Game._SIDE*3, -Game._SIDE*3]
		],
		[
			[Game._SIDE*0, +Game._SIDE*0], [-Game._SIDE*1, +Game._SIDE*0], [-Game._SIDE*2, +Game._SIDE*0], [-Game._SIDE*3, +Game._SIDE*0], [-Game._SIDE*4, +Game._SIDE*0],
			[Game._SIDE*0, -Game._SIDE*1], [-Game._SIDE*1, -Game._SIDE*1], [-Game._SIDE*2, -Game._SIDE*1], [-Game._SIDE*3, -Game._SIDE*1], [-Game._SIDE*4, -Game._SIDE*1],
			[Game._SIDE*0, -Game._SIDE*2], [-Game._SIDE*1, -Game._SIDE*2], [-Game._SIDE*2, -Game._SIDE*2], [-Game._SIDE*3, -Game._SIDE*2], [-Game._SIDE*4, -Game._SIDE*2],
			[Game._SIDE*0, -Game._SIDE*3], [-Game._SIDE*1, -Game._SIDE*3], [-Game._SIDE*2, -Game._SIDE*3], [-Game._SIDE*3, -Game._SIDE*3], [-Game._SIDE*4, -Game._SIDE*3]
		],
		[
			[Game._SIDE*0, +Game._SIDE*0], [-Game._SIDE*1, +Game._SIDE*0], [-Game._SIDE*2, +Game._SIDE*0], [-Game._SIDE*3, +Game._SIDE*0], [-Game._SIDE*4, +Game._SIDE*0], [-Game._SIDE*5, +Game._SIDE*0],
			[Game._SIDE*0, -Game._SIDE*1], [-Game._SIDE*1, -Game._SIDE*1], [-Game._SIDE*2, -Game._SIDE*1], [-Game._SIDE*3, -Game._SIDE*1], [-Game._SIDE*4, -Game._SIDE*1], [-Game._SIDE*5, -Game._SIDE*1],
			[Game._SIDE*0, -Game._SIDE*2], [-Game._SIDE*1, -Game._SIDE*2], [-Game._SIDE*2, -Game._SIDE*2], [-Game._SIDE*3, -Game._SIDE*2], [-Game._SIDE*4, -Game._SIDE*2], [-Game._SIDE*5, -Game._SIDE*2],
			[Game._SIDE*0, -Game._SIDE*3], [-Game._SIDE*1, -Game._SIDE*3], [-Game._SIDE*2, -Game._SIDE*3], [-Game._SIDE*3, -Game._SIDE*3], [-Game._SIDE*4, -Game._SIDE*3], [-Game._SIDE*5, -Game._SIDE*3]
		]
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
					[
						'00', '01', '02', '03',
						'04', '05', '06', '07',
						'08', '09', '10', '11',
						'12', '13', '14', '15'
					],
					[
						'00', '01', '02', '03', '04',
						'05', '06', '07', '08', '09',
						'10', '11', '12', '13', '14',
						'15', '16', '17', '18', '19'
					],
					[
						'00', '01', '02', '03', '04', '05',
						'06', '07', '08', '09', '10', '11',
						'12', '13', '14', '15', '16', '17',
						'18', '19', '20', '21', '22', '23'
					]
				][CURRENT_LEVEL - 1]
		);
	};
	//
	Game.move = function(piece) {
		//
		logger.console.log('Game.move('+piece+')');
		//
		//
		//
		if ( ! Game.gameOver ) {
			var x = 0;
			for ( var i = 0 ; i < Game.BOARD_SIZE[CURRENT_LEVEL - 1][1] ; i++ ) {
				for ( var j = 0 ; j < Game.BOARD_SIZE[CURRENT_LEVEL - 1][0] ; j++ ) {
					var character =  parseInt(Game.currentState[x], 10);
					Game.currentStateMatrix[CURRENT_LEVEL - 1][i][j] = character;
					x++;
				}
			}
			//
			var position = Game._POSITIONS[CURRENT_LEVEL - 1][piece.getAttribute('data-p')];
			var row = position[0];
			var column = position[1];
			//
			if ( row > 0 ) {
				if ( Game.currentStateMatrix[CURRENT_LEVEL - 1][row - 1][column] == 0 ) {
					//
					logger.console.log('   moveUp');
					//
					moveUpMatrix(row, column);
					moveP(piece.id);
					moveUp(piece.id, 0);
					moveDown('_0', 0);
				}
			}
			if ( row < (Game.BOARD_SIZE[CURRENT_LEVEL - 1][1] - 1) ) {
				if ( Game.currentStateMatrix[CURRENT_LEVEL - 1][row + 1][column] == 0 ) {
					//
					logger.console.log('   moveDown');
					//
					moveDownMatrix(row, column);
					moveP(piece.id);
					moveDown(piece.id, 0);
					moveUp('_0', 0);
				}
			}
			if ( column > 0 ) {
				if ( Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column - 1] == 0 ) {
					//
					logger.console.log('   moveLeft');
					//
					moveLeftMatrix(row, column);
					moveP(piece.id);
					moveLeft(piece.id, 0);
					moveRight('_0', 0);
				}
			}
			if ( column < (Game.BOARD_SIZE[CURRENT_LEVEL - 1][0] - 1) ) {
				if ( Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column + 1] == 0 ) {
					//
					logger.console.log('   moveRight');
					//
					moveRightMatrix(row, column);
					moveP(piece.id);
					moveRight(piece.id, 0);
					moveLeft('_0', 0);
				}
			}
			//
			var newCurrentState = [];
			for ( var i = 0 ; i < Game.BOARD_SIZE[CURRENT_LEVEL - 1][1] ; i++ ) {
				for ( var j = 0 ; j < Game.BOARD_SIZE[CURRENT_LEVEL - 1][0] ; j++ ) {
					var character = Game.currentStateMatrix[CURRENT_LEVEL - 1][i][j];
					newCurrentState.push(character);
				}
			}
			Game.currentState = newCurrentState;
			if ( Game.checkGameOver() ) {
				Game.gameOver = true;
				Game.end();
			}
		}
	};
	//
	Game.checkGameOver = function() {
		var length = Game.currentState.length;
		for ( var i = 0 ; i < length ; i++ ) {
			var p = parseInt(Game.currentState[i], 10);
			if ( i != p ) {
				return false;
			}
		}
		return true;
	}
	//
	Game.end = function() {
		clearInterval(Game.mainClockLoop);
		//
		var currentTime = $("#main_clock").html();
		var currentTimeInSeconds = parseInt2(currentTime);
		var score = (3599*CURRENT_LEVEL - currentTimeInSeconds)*CURRENT_LEVEL;
		//
		gsb.write('void', CURRENT_LEVEL, { fbId: 3, name: 'John Doe', score: score });
		//
		setTimeout(function() {
			alert('Congratulations!\n\nYou finished the puzzle!');
		}, (Game._SIDE / Game._STEP) * Game._SPEED_CONTROL * 2 * 2);
	}
	//
	Game.scrumble = function() {
		var n = Game.BOARD_SIZE[CURRENT_LEVEL - 1];
		var sizeHor = n[0];
		var sizeVer = n[1];
		//
		var empty = { x: 0, y: 0 };
		var newEmpty = { x: undefined, y: undefined };
		//
		for ( var i = 1 ; i >= 0 ; i-- ) {
			newEmpty.x = empty.x + (Math.floor(Math.random()*2) == 0 ? -1 : 1);
			newEmpty.y = empty.y;
			//
			newEmpty.x = newEmpty.x < 0 ? 0 : newEmpty.x;
			newEmpty.x = newEmpty.x >= sizeHor ? sizeHor - 1 : newEmpty.x;
			//
			var r1 = empty.y * sizeHor + empty.x;
			var r2 = newEmpty.y * sizeHor + newEmpty.x;
			var current = Game.currentState[r1];
			Game.currentState[r1] = Game.currentState[r2];
			Game.currentState[r2] = current;
			//
			empty.x = newEmpty.x;
			empty.y = newEmpty.y;
			//
			newEmpty.y = newEmpty.y + (Math.floor(Math.random()*2) == 0 ? -1 : 1)
			//
			newEmpty.y = newEmpty.y < 0 ? 0 : newEmpty.y;
			newEmpty.y = newEmpty.y >= sizeVer ? sizeVer - 1 : newEmpty.y;
			//
			var r1 = empty.y * sizeHor + empty.x;
			var r2 = newEmpty.y * sizeHor + newEmpty.x;
			var current = Game.currentState[r1];
			Game.currentState[r1] = Game.currentState[r2];
			Game.currentState[r2] = current;
			//
			empty.x = newEmpty.x;
			empty.y = newEmpty.y;
		}
	}
	//
	function moveLeft(id, d) {
		//
		logger.console.log('moveLeft('+id+', '+d+')');
		//
		var piece = $('#'+id);
		d += Game._STEP;
		piece[0].style.left = (px2number(piece[0].style.left) - Game._STEP) + 'px';
		if ( d < Game._SIDE ) {
			setTimeout(
				function() {
					moveLeft(id, d);
				}, Game._SPEED_CONTROL
			);
		} else {
			var x = parseInt(id.substring(1));
			var character =  parseInt(Game.currentState[x], 10);
			if ( character == x ) {
				piece.removeClass('PieceRight');
				piece.removeClass('PieceWrong');
				piece.addClass('PieceRight');
			} else {
				piece.removeClass('PieceRight');
				piece.removeClass('PieceWrong');
				piece.addClass('PieceWrong');
			}
		}
	}
	function moveRight(id, d) {
		//
		logger.console.log('moveRight('+id+', '+d+')');
		//
		var piece = $('#'+id);
		d += Game._STEP;
		piece[0].style.left = (px2number(piece[0].style.left) + Game._STEP) + 'px';
		if ( d < Game._SIDE ) {
			setTimeout(
				function() {
					moveRight(id, d);
				}, Game._SPEED_CONTROL
			);
		} else {
			var x = parseInt(id.substring(1));
			var character =  parseInt(Game.currentState[x], 10);
			if ( character == x ) {
				piece.removeClass('PieceRight');
				piece.removeClass('PieceWrong');
				piece.addClass('PieceRight');
			} else {
				piece.removeClass('PieceRight');
				piece.removeClass('PieceWrong');
				piece.addClass('PieceWrong');
			}
		}
	}
	function moveUp(id, d) {
		//
		logger.console.log('moveUp('+id+', '+d+')');
		//
		var piece = $('#'+id);
		d += Game._STEP;
		piece[0].style.top = (px2number(piece[0].style.top) - Game._STEP) + 'px';
		if ( d < Game._SIDE ) {
			setTimeout(
				function() {
					moveUp(id, d);
				}, Game._SPEED_CONTROL
			);
		} else {
			var x = parseInt(id.substring(1));
			var character =  parseInt(Game.currentState[x], 10);
			if ( character == x ) {
				piece.removeClass('PieceRight');
				piece.removeClass('PieceWrong');
				piece.addClass('PieceRight');
			} else {
				piece.removeClass('PieceRight');
				piece.removeClass('PieceWrong');
				piece.addClass('PieceWrong');
			}
		}
	}
	function moveDown(id, d) {
		//
		logger.console.log('moveDown('+id+', '+d+')');
		//
		var piece = $('#'+id);
		d += Game._STEP;
		piece[0].style.top = (px2number(piece[0].style.top) + Game._STEP) + 'px';
		if ( d < Game._SIDE ) {
			setTimeout(
				function() {
					moveDown(id, d);
				}, Game._SPEED_CONTROL
			);
		} else {
			var x = parseInt(id.substring(1));
			var character =  parseInt(Game.currentState[x], 10);
			if ( character == x ) {
				piece.removeClass('PieceRight');
				piece.removeClass('PieceWrong');
				piece.addClass('PieceRight');
			} else {
				piece.removeClass('PieceRight');
				piece.removeClass('PieceWrong');
				piece.addClass('PieceWrong');
			}
		}
	}
	//
	function moveP(id) {
		var piece = $('#'+id);
		var empty = $('#_0');
		//
		var current = piece.attr('data-p');
		piece.attr('data-p', empty.attr('data-p'));
		empty.attr('data-p', current);
	}
	//
	function moveLeftMatrix(row, column) {
		var current = Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column];
		Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column] = Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column - 1];
		Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column - 1] = current;
	}
	function moveRightMatrix(row, column) {
		var current = Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column];
		Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column] = Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column + 1];
		Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column + 1] = current;
	}
	function moveUpMatrix(row, column) {
		var current = Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column];
		Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column] = Game.currentStateMatrix[CURRENT_LEVEL - 1][row - 1][column];
		Game.currentStateMatrix[CURRENT_LEVEL - 1][row - 1][column] = current;
	}
	function moveDownMatrix(row, column) {
		var current = Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column];
		Game.currentStateMatrix[CURRENT_LEVEL - 1][row][column] = Game.currentStateMatrix[CURRENT_LEVEL - 1][row + 1][column];
		Game.currentStateMatrix[CURRENT_LEVEL - 1][row + 1][column] = current;
	}
	//
	function px2number(str) {
		return (str+'').replace(/px/, '')*1;
	}
	//
	//
	//
	window.Game = Game;
	//
	// *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * // 
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
	// *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * // 
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

	// *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   * // 
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
		var mainClock = $('#main_clock');
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
			mainClock.fadeOut(DELAY_OBJECTS_CHANGE);
		} else if ( screen == SCREEN_GAME ) {
			imgTitle.fadeOut(DELAY_OBJECTS_CHANGE);
			imgLogo.fadeOut(DELAY_OBJECTS_CHANGE);
			panelButtons.fadeOut(DELAY_OBJECTS_CHANGE);
			$('#main_board_'+CURRENT_LEVEL).fadeIn(DELAY_OBJECTS_CHANGE);
			startBoard();
			mainBack.fadeIn(DELAY_OBJECTS_CHANGE);
			mainClock.fadeIn(DELAY_OBJECTS_CHANGE);
			Game.startTime = Math.floor(new Date().getTime() / 1000);
			Game.mainClockLoop = setInterval(function() {
				var currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
				var gameTimeInSeconds = currentTimeInSeconds - Game.startTime;
				var currentTimeFormatted = formatTime(gameTimeInSeconds);
				mainClock.html(currentTimeFormatted);
				if ( gameTimeInSeconds == 3599 ) {
					clearInterval(Game.mainClockLoop);
				}
			}, 1000);
		}
	}
	//
	function formatTime(seconds) {
		var mins = Math.floor(seconds / 60);
		var secs = seconds % 60;
		return formatInt2(mins) + ':' + formatInt2(secs);
	}
	function formatInt2(number) {
		return ( number < 10 ? '0' : '' ) + number ;
	}
	function parseInt2(str) {
		var parts = str.split(':');
		return parseInt(parts[0]*60) + parseInt(parts[1]);
	}
	//
	function startBoard() {
		//
		logger.console.log('startBoard()');
		//
		if ( Game.mainClockLoop ) {
			clearInterval(Game.mainClockLoop);
		}
		$('#main_clock').html('00:00');
		//		
		$('#main_board_1').html('');
		$('#main_board_2').html('');
		$('#main_board_3').html('');
		var currentBoard = $('#main_board_'+CURRENT_LEVEL);
		//
		Game.currentState = Game.getInitialState();
		Game.scrumble();
		//
		logger.console.log('  Game.currentState: '+Game.currentState);
		//
		var x = 0;
		for ( var j = 0 ; j < Game.BOARD_SIZE[CURRENT_LEVEL - 1][0] ; j++ ) {
			for ( var i = 0 ; i < Game.BOARD_SIZE[CURRENT_LEVEL - 1][1] ; i++ ) {
				var character =  parseInt(Game.currentState[x], 10);
				var visibleCharacter = character;
				visibleCharacter = '';
				var backgroundPosition = Game._BACKGROUND_POSITIONS[CURRENT_LEVEL - 1][character];
				if ( character == 0 ) {
					currentBoard.append('<div id="_'+character+'" data-p="'+x+'" class="PieceEmpty_'+CURRENT_LEVEL+' '+(character == x ? 'PieceRight' : 'PieceWrong')+'" style="background-position: '+backgroundPosition[0]+'px '+backgroundPosition[1]+'px; _left: '+(backgroundPosition[0]*-1)+'px; _top: '+(backgroundPosition[1]*-1)+'px;">'+visibleCharacter+'</div>');
				} else {
					currentBoard.append('<div id="_'+character+'" data-p="'+x+'" onclick="Game.move(this)" class="Piece Piece_'+CURRENT_LEVEL+' '+(character == x ? 'PieceRight' : 'PieceWrong')+'" style="background-position: '+backgroundPosition[0]+'px '+backgroundPosition[1]+'px; _left: '+(backgroundPosition[0]*-1)+'px; _top: '+(backgroundPosition[1]*-1)+'px;">'+visibleCharacter+'</div>');
				}
				x++;
			}
		}
		//
		// for ( var i = 20 ; i >= 0 ; i-- ) {
		// 	Game.move($('#_'+randomMove())[0]);
		// 	Game.gameOver = false;
		// }
		//
		Game.gameOver = false;
	}
	//
	function randomMove() {
		var n = Game.BOARD_SIZE[CURRENT_LEVEL - 1];
		var nn = n[0] * n[1];
		return  Math.floor(
			Math.random() * nn
		);
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