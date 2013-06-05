addEvent(window, 'load', startTime); 	// shows the clock

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