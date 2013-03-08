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

// CLOCK/DATE //
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	if (h < 10) h = '0'+h;
	if (m < 10) m = '0'+m;
	if (s < 10) s = '0'+s;
	document.getElementById('clock').innerHTML = h + ':' + m + ':' + s;
	t = setTimeout('startTime()',500);
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