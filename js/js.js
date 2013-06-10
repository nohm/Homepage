$(document).ready(function() {

	// Random background image
	// Add files to img/ and add the filenames to the array
	var images = [
    	'1.jpg','2.jpg','3.jpg'
  	];
  	// Picks a random background image and sets it
	$('body').css({
		'background-image': 'url(img/bg/' + images[Math.floor(Math.random() * images.length)] + ')'
	});

	// Page rotation
	// It picks up all object with class 'tabbed-interface' and ids starting with 'page'
	var pages = $('.tabbed-interface[id^=page]');
	var shownPage = 1;
	var fadespeed = 'slow';

	// No/one pages? Hide the nav.
	if (pages.length <= 1) {
		$('#nav-left').hide();
		$('#nav-right').hide();
	}

	// Hide all but the first page
	for (var i = 1; i < pages.length; i++) {
		$('#' + pages[i].id).hide();
	}

	// Rotate left on nav-left
	$('#nav-left').click(function() {
		rotate((shownPage - 1 == 0) ? pages.length : shownPage - 1);
	});

	// Rotate right on nav-right
	$('#nav-right').click(function() {
		rotate((shownPage + 1 > pages.length) ? 1 : shownPage + 1);
	});

	// Rotates the pages from > to
	function rotate(to) {
		$('#' + pages[shownPage - 1].id).fadeOut(fadespeed, function() {
			$('#' + pages[to - 1].id).fadeIn();
		});
		shownPage = to;
	}
});
