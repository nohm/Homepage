$(document).ready(function() {

	// Read the config and make the elements
	// Need to clean this dirty hacking.
	for (var i = 0; i < config.pages.length; i++) {
		var page = config.pages[i];
		var pageId = 'page' + (i + 1);
		$('body').append('<div class="tabbed-interface" id="' + pageId + '"></div>');
		$('#' + pageId).append('<ul id="table-' + pageId + '"></ul>');

		for (var j = 0; j < page.blocks.length; j++) {
			var block = page.blocks[j];
			$('#table-' + pageId).append(
				'<li class="block n' + (j + 1) + '">' + 
					'<a href="' + block.link + '">' +
						'<span class="' + block.icon + '"></span>' +
						'<p>' + block.label + '</p>'+
					'</a>' +
				'</li>'
			);
		}
	}

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
