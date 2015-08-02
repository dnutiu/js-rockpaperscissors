$(document).ready( function() {
	
	var $player = $('#username');
	var $header = $('.game-slide header');
	var $nameInput = $('#username-input');
	var $saveButton = $('#save-username');

	var controller = {
		init: function() {
			var username = localStorage.getItem('username') ? localStorage.getItem('username') : "Player";

			this.initFSVS();
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
		}
	};

	var view = {
		setPlayer: function(username) {
			$player.text(username);
		},
		editUsername: function() {
			$nameInput.val($player.text());
			$header.toggleClass('editMode');
		},
		saveUsername: function() {
			$header.toggleClass('editMode');
			$player.text($nameInput.val());

			username = $player.text();
			localStorage.setItem("username", username);
		}
	};

	controller.init();
});