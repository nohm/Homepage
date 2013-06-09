$(document).ready(function() {

	// Random background image
	var images = [
    	'1.jpg','2.jpg','3.jpg'
  	];

	$('body').css({
		'background-image': 'url(img/' + images[Math.floor(Math.random() * images.length)] + ')'
	});

	// Page rotation
	var shownPage = 1;
	var fadespeed = 'slow';

	$('#page2').hide();
	$('#page3').hide();

	$('#nav-left').click(function() {
		switch (shownPage) {
			case 1:
				$('#page1').fadeOut(fadespeed, function() {
					$('#page3').fadeIn();
				});
				shownPage = 3;
				break;
			case 2:
				$('#page2').fadeOut(fadespeed, function() {
					$('#page1').fadeIn();
				});
				shownPage = 1;
				break;
			case 3:
				$('#page3').fadeOut(fadespeed, function() {
					$('#page2').fadeIn();
				});
				shownPage = 2;
				break;
		}
	});

	$('#nav-right').click(function() {
		switch (shownPage) {
			case 1:
				$('#page1').fadeOut(fadespeed, function() {
					$('#page2').fadeIn();
				});
				shownPage = 2;
				break;
			case 2:
				$('#page2').fadeOut(fadespeed, function() {
					$('#page3').fadeIn();
				});
				shownPage = 3;
				break;
			case 3:
				$('#page3').fadeOut(fadespeed, function() {
					$('#page1').fadeIn();
				});
				shownPage = 1;
				break;
		}
	});
});