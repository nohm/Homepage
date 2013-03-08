/* js.js*/
/*                    _                                     
 ___ _ __   __ _  ___| | __  _    ___ _ __ __ _ _   _  __ _ 
/ __| '_ \ / _` |/ __| |/ / (_)  / _ \ '__/ _` | | | |/ _` |
\__ \ | | | (_| | (__|   <   _  |  __/ | | (_| | |_| | (_| |
|___/_| |_|\__,_|\___|_|\_\ (_)  \___|_|  \__,_|\__, |\__,_|
                                                |___/          
 */

////////////
// CUSTOM //
////////////

// SETUP //
addEvent(window, 'load', startTime); 	// shows the clock
addEvent(window, 'load', showAvatar); 	// set the avatar
addEvent(window, 'load', updateWeather);// get the weather

// WEATHER //
var loc = 'wilsum';
var url = 'http://api.wunderground.com/api/bf6fcb121000e936/geolookup/conditions/q/' + encodeURIComponent(loc) + '.json'; 
function updateWeather() {  
    $.ajax({
        dataType: 'jsonp',
        url: url,
        timeout: 5000,
        success: function(data) {
        	 var location = data['location']['city'];
        	 var type = data['current_observation']['weather'];
        	 if (type.length > 15) type = type.substring(0, 12) + '...' // Cut off ridiculous names
        	 var temp_c = data['current_observation']['temp_c'];
        	 document.getElementById('weather').innerHTML = location + '<br />' + type + '<br />' + temp_c + '&deg;C';
        },
    	error: function() {
             document.getElementById('weather').innerHTML = '';
        }
    });
    t = setTimeout('updateWeather()',900000); // Update after 15m
}

// CLOCK/DATE //
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	if (h < 10) h = '0'+h;
	if (m < 10) m = '0'+m;
	if (s < 10) s = '0'+s;
	document.getElementById('date').innerHTML = h + ':' + m + ':' + s + '<br />' + today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
	t = setTimeout('startTime()',500);
}

// RANDOM AVATAR //
var avImages = [ 'png/png_av1.png', 'png/png_av2.png', 'png/png_av3.png', //png
                 'jpg/jpg_av1.jpg', 'jpg/jpg_av2.jpg', 'jpg/jpg_av3.jpg', 'jpg/jpg_av4.jpg', //jpg
                 'jpg/jpg_av5.jpg', 'jpg/jpg_av6.jpg', 'jpg/jpg_av7.jpg', 'jpg/jpg_av8.jpg', //jpg
                 'gif/gif_av1.gif', 'gif/gif_av2.gif', 'gif/gif_av3.gif', 'gif/gif_av4.gif', //gif
                 'gif/gif_av5.gif' ]; //gif
var p = avImages.length;
var avPreBuffer = new Array();
for (i = 0; i < p; i++) {
	avPreBuffer[i] = new Image();
	avPreBuffer[i].src = avImages[i];
}
function showAvatar() {
	var avImage = Math.round(Math.random() * (p - 1));
	document.getElementById('avatar_img').src = 'img/avatars/' + avImages[avImage];
	t = setTimeout('showAvatar()',900000); // Update after 15m
}

//////////////
// IMPORTED //
//////////////

// Cross-browser event handling, by Scott Andrew //
function addEvent(element, eventType, lamdaFunction, useCapture) {
    if (element.addEventListener) {
        element.addEventListener(eventType, lamdaFunction, useCapture);
        return true;
    } else if (element.attachEvent) {
        var r = element.attachEvent('on' + eventType, lamdaFunction);
        return r;
    } else {
        return false;
    }
}