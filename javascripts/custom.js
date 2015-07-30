$(document).ready( function() {
	var username = localStorage.getItem('username') ? localStorage.getItem('username') : "Player";
	
	var $player = $('.game-slide header label');
	var $header = $('.game-slide header');
	var $nameInput = $('#name');
	var $saveButton = $('.game-slide header button');

	$player.text(username);

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


	$player.on("click", function() {
		$nameInput.val($player.text());
		$header.toggleClass('editMode');

	});

	$nameInput.on("keypress", function(e) {
		var key = e.keyCode || e.which;
		if (key == '13') {
			$saveButton.click();
		}
	});

	$saveButton.on("click", function() {
		$header.toggleClass('editMode');
		$player.text($nameInput.val());

		username = $player.text();
		localStorage.setItem("username", username);
	});

});