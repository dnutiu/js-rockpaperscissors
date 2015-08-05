$(document).ready( function() {
	
	var 
	    $player        =  $('#username'),
	    $header        =  $('.game-slide header'),
	    $moves         =  $('.moves img'),
	    $nameInput     =  $('#username-input'),
	    $saveButton    =  $('#save-username'),
	    $goButton      =  $('#go'),
        $playerScore   =  $('.player-score'),
        $computerScore =  $('.computer-score');

	var game = {
		username: null,
		playerMove: null,
		computerMove: null,
		playerScore: 0,
		computerScore: 0,
		MOVES: ["Rock", "Paper", "Scissors"],
		play: function() {
			this.setComputerMove();
			this.announceWinner();
			view.updateHighScore();
		},
		announceWinner: function() {
			var playerMove = this.playerMove;
			var computerMove = this.computerMove;

			if (playerMove.greaterThan(computerMove)) {
				swal("You're Winner!", 
					"Congratulations, you have won!", 
					"success");
				this.playerScore++;
			} else if (computerMove.greaterThan(playerMove)) {
				swal("You lose!",
				 	"The computer defeated you. :(",
					"error");
				this.computerScore++;
			} else if (playerMove.equal(computerMove)) {
				swal("It's a draw!")
			} else {
				swal("Woops!", "Something went wrong, if the error"
					+ "persists reaload the page", "error");
			}
		},
		setComputerMove: function() {
			var length= this.MOVES.length;
			var index = Math.floor(Math.random() * length);

			var move = this.checkValidMove(this.MOVES[index]);
			this.computerMove = move;
		},
		checkValidMove: function(move) {
			switch(move.toLowerCase()) {
				case "rock":
					return new Rock();
					break;
				case "paper":
					return new Paper();
					break;
				case "scissors":
					return new Scissors();
					break;		
				default:
					swal("Woops!", "Something went wrong, if the error"
						+ "persists reaload the page", "error");	 
			}
		}				
	}
	var controller = {
		init: function() {
			var username = localStorage.getItem('username') ? localStorage.getItem('username') : "Player";
			
			this.initFSVS();
			
			game.username = username;
			view.setPlayer(username);
			
			this.bindEvents();
		},
		initFSVS: function() {
			var fsvs = $.fn.fsvs({
				speed : 1000,
				bodyID : 'fsvs-body',
				selector : '> .slide',
				mouseSwipeDisance : 540,
				afterSlide : function(){},
				beforeSlide : function(){},
				endSlide : function(){},
				mouseWheelEvents : true,
				mouseDragEvents : false,
				touchEvents : true,
				arrowKeyEvents : true,
				pagination : true,
				nthClasses : false,
				detectHash : true
			});
		},
		bindEvents: function() {
			var self = this;

			$player.on("click", function() {
				view.editUsername();
			}).on("tap", function() {
				view.editUsername();
			});

			$nameInput.on("keypress", function(e) {
				var key = e.keyCode || e.which;
				if (key == '13') {
					view.saveUsername();
				}
			}).on("dblclick", function() {
				view.saveUsername();
			});

			$saveButton.on("click", function() {
				view.saveUsername();
			});

			$moves.on("click", function() {
				view.selectMove(this);

				var move = $(this).attr('alt')
				game.playerMove = game.checkValidMove(move);
			});

			$goButton.on("click", function() {
				game.play();
			});	
		}
	};

	var view = {
		setPlayer: function(username) {
			$player.text(username);
		},
		selectMove: function(move) {
			$moves.removeClass('selected');
			$(move).addClass('selected');
		},
		editUsername: function() {
			$nameInput.val($player.text());
			$header.toggleClass('editMode');
		},
		saveUsername: function() {
			$header.toggleClass('editMode');
			$player.text($nameInput.val());

			username = $player.text();
			game.username = username;
			localStorage.setItem("username", username);
		},
		updateHighScore: function() {
			$playerScore.text(game.playerScore);
			$computerScore.text(game.computerScore);
		}
	};

	controller.init();
});