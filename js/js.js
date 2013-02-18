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
addEvent(window, 'load', initCorners); 	// input to fix is set in initcorners.js
addEvent(window, 'load', startTime); 	// shows the clock
addEvent(window, 'load', showAvatar); 	// set the avatar

// CLOCK/DATE //
// Needed for full date // var monthNames=[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
// Needed for full date // var dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    /* AM/PM add 'a+' after 's+' to use
    var a = "am";
    if (h > 12) h = h-12; a="pm";*/
	if (h < 10) h = "0"+h;
	if (m < 10) m = "0"+m;
	if (s < 10) s = "0"+s;
	// Full date
    //document.getElementById('date').innerHTML = h+":"+m+":"+s+"<br />"+dayNames[today.getDay()]+"<br />"+today.getDate()+" "+ monthNames[today.getMonth()]+"<br />"+today.getFullYear();
	// Simple date
	document.getElementById('date').innerHTML = h+":"+m+":"+s+"<br />"+today.getDate()+"/"+ (today.getMonth()+1)+"/"+today.getFullYear();
	t = setTimeout('startTime()',500);
}

// CLEAR INPUT BOX //
function initCorners() {
	var setting = { tl: { radius: 0 }, tr: { radius: 0 }, bl: { radius: 0 }, br: { radius: 0 }, antiAlias: true }; // I don't use this, just use it for clearing layout
	curvyCorners(setting, '.searchBox');
}

// RANDOM AVATAR //
var avImages = [ 'png/png_av1.png', 'png/png_av2.png', //png
                 'jpg/jpg_av1.jpg', 'jpg/jpg_av2.jpg', 'jpg/jpg_av3.jpg', 'jpg/jpg_av4.jpg', //jpg
                 'jpg/jpg_av5.jpg', 'jpg/jpg_av6.jpg', 'jpg/jpg_av7.jpg', 'jpg/jpg_av8.jpg', //jpg
                 'gif/gif_av1.gif', 'gif/gif_av2.gif' ]; //gif
var p = avImages.length;
var avPreBuffer = new Array();
for (i = 0; i < p; i++){
	avPreBuffer[i] = new Image();
	avPreBuffer[i].src = avImages[i];
}
var avImage = Math.round(Math.random()*(p-1));
function showAvatar() {
	document.getElementById('avatar_img').src = 'img/avatars/'+avImages[avImage];
}

//////////////
// IMPORTED //
//////////////

/*
 * Clear Default Text: functions for clearing and replacing default text in
 * <input> elements.
 *
 * by Ross Shannon, http://www.yourhtmlsource.com/
 */

addEvent(window, 'load', init, false);

function init() {
    var formInputs = document.getElementsByTagName('input');
    for (var i = 0; i < formInputs.length; i++) {
        var theInput = formInputs[i];
        
        if (theInput.type == 'text' && theInput.className.match(/\bcleardefault\b/)) {  
            /* Add event handlers */          
            addEvent(theInput, 'focus', clearDefaultText, false);
            addEvent(theInput, 'blur', replaceDefaultText, false);
            
            /* Save the current value */
            if (theInput.value != '') {
                theInput.defaultText = theInput.value;
            }
        }
    }
}

function clearDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == target.defaultText) {
        target.value = '';
    }
}

function replaceDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == '' && target.defaultText) {
        target.value = target.defaultText;
    }
}

/*
 * Curvycorners (minimal)
 */
function browserdetect(){var b=navigator.userAgent.toLowerCase();this.isIE=b.indexOf("msie")>-1;if(this.isIE){this.ieVer=/msie\s(\d\.\d)/.exec(b)[1];this.quirksMode=!document.compatMode||document.compatMode.indexOf("BackCompat")>-1;this.get_style=function(f,h){if(!(h in f.currentStyle)){return""}var d=/^([\d.]+)(\w*)/.exec(f.currentStyle[h]);if(!d){return f.currentStyle[h]}if(d[1]==0){return"0"}if(d[2]&&d[2]!=="px"){var c=f.style.left;var g=f.runtimeStyle.left;f.runtimeStyle.left=f.currentStyle.left;f.style.left=d[1]+d[2];d[0]=f.style.pixelLeft;f.style.left=c;f.runtimeStyle.left=g}return d[0]};this.supportsCorners=false}else{this.ieVer=this.quirksMode=0;this.get_style=function(c,d){d=d.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();return document.defaultView.getComputedStyle(c,"").getPropertyValue(d)};this.isSafari=b.indexOf("safari")!=-1;this.isWebKit=b.indexOf("webkit")!=-1;this.isOp="opera" in window;if(this.isOp){this.supportsCorners=(this.isOp=window.opera.version())>=10.5}else{if(!this.isWebkit){if(!(this.isMoz=b.indexOf("firefox")!==-1)){for(var a=document.childNodes.length;--a>=0;){if("style" in document.childNodes[a]){this.isMoz="MozBorderRadius" in document.childNodes[a].style;break}}}}this.supportsCorners=this.isWebKit||this.isMoz}}}var curvyBrowser=new browserdetect;if(curvyBrowser.isIE){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}}function curvyCnrSpec(a){this.selectorText=a;this.tlR=this.trR=this.blR=this.brR=0;this.tlu=this.tru=this.blu=this.bru="";this.antiAlias=true}curvyCnrSpec.prototype.setcorner=function(b,c,a,d){if(!b){this.tlR=this.trR=this.blR=this.brR=parseInt(a);this.tlu=this.tru=this.blu=this.bru=d}else{var f=b.charAt(0)+c.charAt(0);this[f+"R"]=parseInt(a);this[f+"u"]=d}};curvyCnrSpec.prototype.get=function(d){if(/^(t|b)(l|r)(R|u)$/.test(d)){return this[d]}if(/^(t|b)(l|r)Ru$/.test(d)){var c=d.charAt(0)+d.charAt(1);return this[c+"R"]+this[c+"u"]}if(/^(t|b)Ru?$/.test(d)){var b=d.charAt(0);b+=this[b+"lR"]>this[b+"rR"]?"l":"r";var a=this[b+"R"];if(d.length===3&&d.charAt(2)==="u"){a+=this[b="u"]}return a}throw new Error("Don't recognize property "+d)};curvyCnrSpec.prototype.radiusdiff=function(a){if(a!=="t"&&a!=="b"){throw new Error("Param must be 't' or 'b'")}return Math.abs(this[a+"lR"]-this[a+"rR"])};curvyCnrSpec.prototype.setfrom=function(a){this.tlu=this.tru=this.blu=this.bru="px";if("tl" in a){this.tlR=a.tl.radius}if("tr" in a){this.trR=a.tr.radius}if("bl" in a){this.blR=a.bl.radius}if("br" in a){this.brR=a.br.radius}if("antiAlias" in a){this.antiAlias=a.antiAlias}};curvyCnrSpec.prototype.cloneOn=function(f){var j=["tl","tr","bl","br"];var k=0;var d,g;for(d in j){if(!isNaN(d)){g=this[j[d]+"u"];if(g!==""&&g!=="px"){k=new curvyCnrSpec;break}}}if(!k){k=this}else{var c,b,h=curvyBrowser.get_style(f,"left");for(d in j){if(!isNaN(d)){c=j[d];g=this[c+"u"];b=this[c+"R"];if(g!=="px"){var a=f.style.left;f.style.left=b+g;b=f.style.pixelLeft;f.style.left=a}k[c+"R"]=b;k[c+"u"]="px"}}f.style.left=h}return k};curvyCnrSpec.prototype.radiusSum=function(a){if(a!=="t"&&a!=="b"){throw new Error("Param must be 't' or 'b'")}return this[a+"lR"]+this[a+"rR"]};curvyCnrSpec.prototype.radiusCount=function(a){var b=0;if(this[a+"lR"]){++b}if(this[a+"rR"]){++b}return b};curvyCnrSpec.prototype.cornerNames=function(){var a=[];if(this.tlR){a.push("tl")}if(this.trR){a.push("tr")}if(this.blR){a.push("bl")}if(this.brR){a.push("br")}return a};function operasheet(c){var a=document.styleSheets.item(c).ownerNode.text;a=a.replace(/\/\*(\n|\r|.)*?\*\//g,"");var d=new RegExp("^\\s*([\\w.#][-\\w.#, ]+)[\\n\\s]*\\{([^}]+border-((top|bottom)-(left|right)-)?radius[^}]*)\\}","mg");var h;this.rules=[];while((h=d.exec(a))!==null){var g=new RegExp("(..)border-((top|bottom)-(left|right)-)?radius:\\s*([\\d.]+)(in|em|px|ex|pt)","g");var f,b=new curvyCnrSpec(h[1]);while((f=g.exec(h[2]))!==null){if(f[1]!=="z-"){b.setcorner(f[3],f[4],f[5],f[6])}}this.rules.push(b)}}operasheet.contains_border_radius=function(a){return/border-((top|bottom)-(left|right)-)?radius/.test(document.styleSheets.item(a).ownerNode.text)};function curvyCorners(){var g,c,d,b,l;if(typeof arguments[0]!=="object"){throw curvyCorners.newError("First parameter of curvyCorners() must be an object.")}if(arguments[0] instanceof curvyCnrSpec){b=arguments[0];if(!b.selectorText&&typeof arguments[1]==="string"){b.selectorText=arguments[1]}}else{if(typeof arguments[1]!=="object"&&typeof arguments[1]!=="string"){throw curvyCorners.newError("Second parameter of curvyCorners() must be an object or a class name.")}c=arguments[1];if(typeof c!=="string"){c=""}if(c!==""&&c.charAt(0)!=="."&&"autoPad" in arguments[0]){c="."+c}b=new curvyCnrSpec(c);b.setfrom(arguments[0])}if(b.selectorText){l=0;var h=b.selectorText.replace(/\s+$/,"").split(/,\s*/);d=new Array;for(g=0;g<h.length;++g){if((c=h[g].lastIndexOf("#"))!==-1){h[g]=h[g].substr(c)}d=d.concat(curvyCorners.getElementsBySelector(h[g].split(/\s+/)))}}else{l=1;d=arguments}for(g=l,c=d.length;g<c;++g){var k=d[g];var a=false;if(!k.className){k.className="curvyIgnore"}else{a=k.className.indexOf("curvyIgnore")!==-1;if(!a){k.className+=" curvyIgnore"}}if(!a){if(k.className.indexOf("curvyRedraw")!==-1){if(typeof curvyCorners.redrawList==="undefined"){curvyCorners.redrawList=new Array}curvyCorners.redrawList.push({node:k,spec:b,copy:k.cloneNode(false)})}var f=new curvyObject(b,k);f.applyCorners()}}}curvyCorners.prototype.applyCornersToAll=function(){throw curvyCorners.newError("This function is now redundant. Just call curvyCorners(). See documentation.")};curvyCorners.redraw=function(){if(curvyBrowser.supportsCorners){return}if(!curvyCorners.redrawList){throw curvyCorners.newError("curvyCorners.redraw() has nothing to redraw.")}var h=curvyCorners.block_redraw;curvyCorners.block_redraw=true;for(var c in curvyCorners.redrawList){if(isNaN(c)){continue}var g=curvyCorners.redrawList[c];if(!g.node.clientWidth){continue}var d=g.copy.cloneNode(false);for(var f=g.node.firstChild;f!==null;f=f.nextSibling){if(f.className.indexOf("autoPadDiv")!==-1){break}}if(!f){curvyCorners.alert("Couldn't find autoPad DIV");break}g.node.parentNode.replaceChild(d,g.node);var a=f.getElementsByTagName("script");for(var b=a.length-1;b>=0;--b){a[b].parentNode.removeChild(a[b])}while(f.firstChild){d.appendChild(f.removeChild(f.firstChild))}g=new curvyObject(g.spec,g.node=d);g.applyCorners()}curvyCorners.block_redraw=h};curvyCorners.adjust=function(obj,prop,newval){if(!curvyBrowser.supportsCorners){if(!curvyCorners.redrawList){throw curvyCorners.newError("curvyCorners.adjust() has nothing to adjust.")}var i,j=curvyCorners.redrawList.length;for(i=0;i<j;++i){if(curvyCorners.redrawList[i].node===obj){break}}if(i===j){throw curvyCorners.newError("Object not redrawable")}obj=curvyCorners.redrawList[i].copy}if(prop.indexOf(".")===-1){obj[prop]=newval}else{eval("obj."+prop+"='"+newval+"'")}};curvyCorners.handleWinResize=function(){if(!curvyCorners.block_redraw){curvyCorners.redraw()}};curvyCorners.setWinResize=function(a){curvyCorners.block_redraw=!a};curvyCorners.newError=function(a){return new Error("curvyCorners Error:\n"+a)};curvyCorners.alert=function(a){if(typeof curvyCornersVerbose==="undefined"||curvyCornersVerbose){alert(a)}};function curvyObject(){var B;this.box=arguments[1];this.settings=arguments[0];this.topContainer=this.bottomContainer=this.shell=B=null;var p=this.box.clientWidth;if(("canHaveChildren" in this.box&&!this.box.canHaveChildren)||this.box.tagName==="TABLE"){throw new Error(this.errmsg("You cannot apply corners to "+this.box.tagName+" elements.","Error"))}if(!p&&curvyBrowser.isIE){this.box.style.zoom=1;p=this.box.clientWidth}if(!p&&curvyBrowser.get_style(this.box,"display")==="inline"){this.box.style.display="inline-block";curvyCorners.alert(this.errmsg("Converting inline element to inline-block","warning"));p=this.box.clientWidth}if(!p){if(!this.box.parentNode){throw this.newError("box has no parent!")}for(B=this.box;;B=B.parentNode){if(!B||B.tagName==="BODY"){this.applyCorners=function(){};curvyCorners.alert(this.errmsg("zero-width box with no accountable parent","warning"));return}if(curvyBrowser.get_style(B,"display")==="none"){break}}var u=B.style.display;B.style.display="block";p=this.box.clientWidth}if(!p){curvyCorners.alert(this.errmsg("zero-width box, cannot display","error"));this.applyCorners=function(){};return}if(arguments[0] instanceof curvyCnrSpec){this.spec=arguments[0].cloneOn(this.box)}else{this.spec=new curvyCnrSpec("");this.spec.setfrom(this.settings)}var J=curvyBrowser.get_style(this.box,"borderTopWidth");var o=curvyBrowser.get_style(this.box,"borderBottomWidth");var h=curvyBrowser.get_style(this.box,"borderLeftWidth");var c=curvyBrowser.get_style(this.box,"borderRightWidth");var n=curvyBrowser.get_style(this.box,"borderTopColor");var k=curvyBrowser.get_style(this.box,"borderBottomColor");var b=curvyBrowser.get_style(this.box,"borderLeftColor");var I=curvyBrowser.get_style(this.box,"borderRightColor");var d=curvyBrowser.get_style(this.box,"borderTopStyle");var m=curvyBrowser.get_style(this.box,"borderBottomStyle");var g=curvyBrowser.get_style(this.box,"borderLeftStyle");var a=curvyBrowser.get_style(this.box,"borderRightStyle");var i=curvyBrowser.get_style(this.box,"backgroundColor");var f=curvyBrowser.get_style(this.box,"backgroundImage");var F=curvyBrowser.get_style(this.box,"backgroundRepeat");var z,x;if(this.box.currentStyle&&this.box.currentStyle.backgroundPositionX){z=curvyBrowser.get_style(this.box,"backgroundPositionX");x=curvyBrowser.get_style(this.box,"backgroundPositionY")}else{z=curvyBrowser.get_style(this.box,"backgroundPosition");z=z.split(" ");x=z.length===2?z[1]:0;z=z[0]}var w=curvyBrowser.get_style(this.box,"position");var G=curvyBrowser.get_style(this.box,"paddingTop");var K=curvyBrowser.get_style(this.box,"paddingBottom");var y=curvyBrowser.get_style(this.box,"paddingLeft");var H=curvyBrowser.get_style(this.box,"paddingRight");var s=curvyBrowser.ieVer>7?curvyBrowser.get_style(this.box,"filter"):null;var l=this.spec.get("tR");var r=this.spec.get("bR");var D=function(L){if(typeof L==="number"){return L}if(typeof L!=="string"){throw new Error("unexpected styleToNPx type "+typeof L)}var t=/^[-\d.]([a-z]+)$/.exec(L);if(t&&t[1]!="px"){throw new Error("Unexpected unit "+t[1])}if(isNaN(L=parseInt(L))){L=0}return L};var A=function(t){return t<=0?"0":t+"px"};try{this.borderWidth=D(J);this.borderWidthB=D(o);this.borderWidthL=D(h);this.borderWidthR=D(c);this.boxColour=curvyObject.format_colour(i);this.topPadding=D(G);this.bottomPadding=D(K);this.leftPadding=D(y);this.rightPadding=D(H);this.boxWidth=p;this.boxHeight=this.box.clientHeight;this.borderColour=curvyObject.format_colour(n);this.borderColourB=curvyObject.format_colour(k);this.borderColourL=curvyObject.format_colour(b);this.borderColourR=curvyObject.format_colour(I);this.borderString=this.borderWidth+"px "+d+" "+this.borderColour;this.borderStringB=this.borderWidthB+"px "+m+" "+this.borderColourB;this.borderStringL=this.borderWidthL+"px "+g+" "+this.borderColourL;this.borderStringR=this.borderWidthR+"px "+a+" "+this.borderColourR;this.backgroundImage=((f!="none")?f:"");this.backgroundRepeat=F}catch(E){throw this.newError(E.message)}var j=this.boxHeight;var C=p;if(curvyBrowser.isOp){var v;z=D(z);x=D(x);if(z){v=C+this.borderWidthL+this.borderWidthR;if(z>v){z=v}z=(v/z*100)+"%"}if(x){v=j+this.borderWidth+this.borderWidthB;if(x>v){x=v}x=(v/x*100)+"%"}}if(curvyBrowser.quirksMode){}else{this.boxWidth-=this.leftPadding+this.rightPadding;this.boxHeight-=this.topPadding+this.bottomPadding}this.contentContainer=document.createElement("div");if(s){this.contentContainer.style.filter=s}while(this.box.firstChild){this.contentContainer.appendChild(this.box.removeChild(this.box.firstChild))}if(w!="absolute"){this.box.style.position="relative"}this.box.style.padding="0";this.box.style.border=this.box.style.backgroundImage="none";this.box.style.backgroundColor="transparent";this.box.style.width=(C+this.borderWidthL+this.borderWidthR)+"px";this.box.style.height=(j+this.borderWidth+this.borderWidthB)+"px";var q=document.createElement("div");q.style.position="absolute";if(s){q.style.filter=s}if(curvyBrowser.quirksMode){q.style.width=(C+this.borderWidthL+this.borderWidthR)+"px"}else{q.style.width=C+"px"}q.style.height=A(j+this.borderWidth+this.borderWidthB-l-r);q.style.padding="0";q.style.top=l+"px";q.style.left="0";if(this.borderWidthL){q.style.borderLeft=this.borderStringL}if(this.borderWidth&&!l){q.style.borderTop=this.borderString}if(this.borderWidthR){q.style.borderRight=this.borderStringR}if(this.borderWidthB&&!r){q.style.borderBottom=this.borderStringB}q.style.backgroundColor=i;q.style.backgroundImage=this.backgroundImage;q.style.backgroundRepeat=this.backgroundRepeat;q.style.direction="ltr";this.shell=this.box.appendChild(q);p=curvyBrowser.get_style(this.shell,"width");if(p===""||p==="auto"||p.indexOf("%")!==-1){throw this.newError("Shell width is "+p)}this.boxWidth=(p!==""&&p!="auto"&&p.indexOf("%")==-1)?parseInt(p):this.shell.clientWidth;this.applyCorners=function(){this.backgroundPosX=this.backgroundPosY=0;if(this.backgroundObject){var Z=function(ar,ap,aq){if(ar===0){return 0}if(ar==="right"||ar==="bottom"){return aq-ap}if(ar==="center"){return(aq-ap)/2}if(ar.indexOf("%")>0){return(aq-ap)*100/parseInt(ar)}return D(ar)};this.backgroundPosX=Z(z,this.backgroundObject.width,C);this.backgroundPosY=Z(x,this.backgroundObject.height,j)}else{if(this.backgroundImage){this.backgroundPosX=D(z);this.backgroundPosY=D(x)}}if(l){q=document.createElement("div");q.style.width=this.boxWidth+"px";q.style.fontSize="1px";q.style.overflow="hidden";q.style.position="absolute";q.style.paddingLeft=this.borderWidth+"px";q.style.paddingRight=this.borderWidth+"px";q.style.height=l+"px";q.style.top=-l+"px";q.style.left=-this.borderWidthL+"px";this.topContainer=this.shell.appendChild(q)}if(r){q=document.createElement("div");q.style.width=this.boxWidth+"px";q.style.fontSize="1px";q.style.overflow="hidden";q.style.position="absolute";q.style.paddingLeft=this.borderWidthB+"px";q.style.paddingRight=this.borderWidthB+"px";q.style.height=r+"px";q.style.bottom=-r+"px";q.style.left=-this.borderWidthL+"px";this.bottomContainer=this.shell.appendChild(q)}var ah=this.spec.cornerNames();for(var al in ah){if(!isNaN(al)){var ad=ah[al];var ae=this.spec[ad+"R"];var af,ai,O,ag;if(ad=="tr"||ad=="tl"){af=this.borderWidth;ai=this.borderColour;ag=this.borderWidth}else{af=this.borderWidthB;ai=this.borderColourB;ag=this.borderWidthB}O=ae-ag;var Y=document.createElement("div");Y.style.height=this.spec.get(ad+"Ru");Y.style.width=this.spec.get(ad+"Ru");Y.style.position="absolute";Y.style.fontSize="1px";Y.style.overflow="hidden";var W,V,T;var R=s?parseInt(/alpha\(opacity.(\d+)\)/.exec(s)[1]):100;for(W=0;W<ae;++W){var Q=(W+1>=O)?-1:Math.floor(Math.sqrt(Math.pow(O,2)-Math.pow(W+1,2)))-1;if(O!=ae){var N=(W>=O)?-1:Math.ceil(Math.sqrt(Math.pow(O,2)-Math.pow(W,2)));var L=(W+1>=ae)?-1:Math.floor(Math.sqrt(Math.pow(ae,2)-Math.pow((W+1),2)))-1}var t=(W>=ae)?-1:Math.ceil(Math.sqrt(Math.pow(ae,2)-Math.pow(W,2)));if(Q>-1){this.drawPixel(W,0,this.boxColour,R,(Q+1),Y,true,ae)}if(O!=ae){if(this.spec.antiAlias){for(V=Q+1;V<N;++V){if(this.backgroundImage!==""){var M=curvyObject.pixelFraction(W,V,O)*100;this.drawPixel(W,V,ai,R,1,Y,M>=30,ae)}else{if(this.boxColour!=="transparent"){var ac=curvyObject.BlendColour(this.boxColour,ai,curvyObject.pixelFraction(W,V,O));this.drawPixel(W,V,ac,R,1,Y,false,ae)}else{this.drawPixel(W,V,ai,R>>1,1,Y,false,ae)}}}if(L>=N){if(N==-1){N=0}this.drawPixel(W,N,ai,R,(L-N+1),Y,false,0)}T=ai;V=L}else{if(L>Q){this.drawPixel(W,(Q+1),ai,R,(L-Q),Y,false,0)}}}else{T=this.boxColour;V=Q}if(this.spec.antiAlias&&this.boxColour!=="transparent"){while(++V<t){this.drawPixel(W,V,T,(curvyObject.pixelFraction(W,V,ae)*R),1,Y,ag<=0,ae)}}}var ak;for(v=0,ak=Y.childNodes.length;v<ak;++v){var X=Y.childNodes[v];var aj=parseInt(X.style.top);var an=parseInt(X.style.left);var ao=parseInt(X.style.height);if(ad=="tl"||ad=="bl"){X.style.left=(ae-an-1)+"px"}if(ad=="tr"||ad=="tl"){X.style.top=(ae-ao-aj)+"px"}X.style.backgroundRepeat=this.backgroundRepeat;if(this.backgroundImage){switch(ad){case"tr":X.style.backgroundPosition=(this.backgroundPosX-this.borderWidthL+ae-C-an)+"px "+(this.backgroundPosY+ao+aj+this.borderWidth-ae)+"px";break;case"tl":X.style.backgroundPosition=(this.backgroundPosX-ae+an+1+this.borderWidthL)+"px "+(this.backgroundPosY-ae+ao+aj+this.borderWidth)+"px";break;case"bl":X.style.backgroundPosition=(this.backgroundPosX-ae+an+1+this.borderWidthL)+"px "+(this.backgroundPosY-j-this.borderWidth+(curvyBrowser.quirksMode?aj:-aj)+ae)+"px";break;case"br":if(curvyBrowser.quirksMode){X.style.backgroundPosition=(this.backgroundPosX-this.borderWidthL-C+ae-an)+"px "+(this.backgroundPosY-j-this.borderWidth+aj+ae)+"px"}else{X.style.backgroundPosition=(this.backgroundPosX-this.borderWidthL-C+ae-an)+"px "+(this.backgroundPosY-j-this.borderWidth+ae-aj)+"px"}}}}switch(ad){case"tl":Y.style.top=Y.style.left="0";this.topContainer.appendChild(Y);break;case"tr":Y.style.top=Y.style.right="0";this.topContainer.appendChild(Y);break;case"bl":Y.style.bottom=Y.style.left="0";this.bottomContainer.appendChild(Y);break;case"br":Y.style.bottom=Y.style.right="0";this.bottomContainer.appendChild(Y)}}}var aa={t:this.spec.radiusdiff("t"),b:this.spec.radiusdiff("b")};for(var U in aa){if(typeof U==="function"){continue}if(!this.spec.get(U+"R")){continue}if(aa[U]){var am=(this.spec[U+"lR"]<this.spec[U+"rR"])?U+"l":U+"r";var P=document.createElement("div");P.style.height=aa[U]+"px";P.style.width=this.spec.get(am+"Ru");P.style.position="absolute";P.style.fontSize="1px";P.style.overflow="hidden";P.style.backgroundColor=this.boxColour;if(s){P.style.filter=s}P.style.backgroundImage=this.backgroundImage;P.style.backgroundRepeat=this.backgroundRepeat;switch(am){case"tl":P.style.bottom=P.style.left="0";P.style.borderLeft=this.borderStringL;P.style.backgroundPosition=this.backgroundPosX+"px "+(this.borderWidth+this.backgroundPosY-this.spec.tlR)+"px";this.topContainer.appendChild(P);break;case"tr":P.style.bottom=P.style.right="0";P.style.borderRight=this.borderStringR;P.style.backgroundPosition=(this.backgroundPosX-this.boxWidth+this.spec.trR)+"px "+(this.borderWidth+this.backgroundPosY-this.spec.trR)+"px";this.topContainer.appendChild(P);break;case"bl":P.style.top=P.style.left="0";P.style.borderLeft=this.borderStringL;P.style.backgroundPosition=this.backgroundPosX+"px "+(this.backgroundPosY-this.borderWidth-this.boxHeight+aa[U]+this.spec.blR)+"px";this.bottomContainer.appendChild(P);break;case"br":P.style.top=P.style.right="0";P.style.borderRight=this.borderStringR;P.style.backgroundPosition=(this.borderWidthL+this.backgroundPosX-this.boxWidth+this.spec.brR)+"px "+(this.backgroundPosY-this.borderWidth-this.boxHeight+aa[U]+this.spec.brR)+"px";this.bottomContainer.appendChild(P)}}var S=document.createElement("div");if(s){S.style.filter=s}S.style.position="relative";S.style.fontSize="1px";S.style.overflow="hidden";S.style.width=this.fillerWidth(U);S.style.backgroundColor=this.boxColour;S.style.backgroundImage=this.backgroundImage;S.style.backgroundRepeat=this.backgroundRepeat;switch(U){case"t":if(this.topContainer){if(curvyBrowser.quirksMode){S.style.height=100+l+"px"}else{S.style.height=100+l-this.borderWidth+"px"}S.style.marginLeft=this.spec.tlR?(this.spec.tlR-this.borderWidthL)+"px":"0";S.style.borderTop=this.borderString;if(this.backgroundImage){var ab=this.spec.tlR?(this.borderWidthL+this.backgroundPosX-this.spec.tlR)+"px ":this.backgroundPosX+"px ";S.style.backgroundPosition=ab+this.backgroundPosY+"px";this.shell.style.backgroundPosition=this.backgroundPosX+"px "+(this.backgroundPosY-l+this.borderWidthL)+"px"}this.topContainer.appendChild(S)}break;case"b":if(this.bottomContainer){if(curvyBrowser.quirksMode){S.style.height=r+"px"}else{S.style.height=r-this.borderWidthB+"px"}S.style.marginLeft=this.spec.blR?(this.spec.blR-this.borderWidthL)+"px":"0";S.style.borderBottom=this.borderStringB;if(this.backgroundImage){var ab=this.spec.blR?(this.backgroundPosX+this.borderWidthL-this.spec.blR)+"px ":this.backgroundPosX+"px ";S.style.backgroundPosition=ab+(this.backgroundPosY-j-this.borderWidth+r)+"px"}this.bottomContainer.appendChild(S)}}}this.contentContainer.style.position="absolute";this.contentContainer.className="autoPadDiv";this.contentContainer.style.left=this.borderWidthL+"px";this.contentContainer.style.paddingTop=this.topPadding+"px";this.contentContainer.style.top=this.borderWidth+"px";this.contentContainer.style.paddingLeft=this.leftPadding+"px";this.contentContainer.style.paddingRight=this.rightPadding+"px";U=C;if(!curvyBrowser.quirksMode){U-=this.leftPadding+this.rightPadding}this.contentContainer.style.width=U+"px";this.contentContainer.style.textAlign=curvyBrowser.get_style(this.box,"textAlign");this.box.style.textAlign="left";this.box.appendChild(this.contentContainer);if(B){B.style.display=u}};if(this.backgroundImage){z=this.backgroundCheck(z);x=this.backgroundCheck(x);if(this.backgroundObject){this.backgroundObject.holdingElement=this;this.dispatch=this.applyCorners;this.applyCorners=function(){if(this.backgroundObject.complete){this.dispatch()}else{this.backgroundObject.onload=new Function("curvyObject.dispatch(this.holdingElement);")}}}}}curvyObject.prototype.backgroundCheck=function(b){if(b==="top"||b==="left"||parseInt(b)===0){return 0}if(!(/^[-\d.]+px$/.test(b))&&!this.backgroundObject){this.backgroundObject=new Image;var a=function(d){var c=/url\("?([^'"]+)"?\)/.exec(d);return(c?c[1]:d)};this.backgroundObject.src=a(this.backgroundImage)}return b};curvyObject.dispatch=function(a){if("dispatch" in a){a.dispatch()}else{throw a.newError("No dispatch function")}};curvyObject.prototype.drawPixel=function(k,h,a,g,i,j,c,f){var b=document.createElement("div");b.style.height=i+"px";b.style.width="1px";b.style.position="absolute";b.style.fontSize="1px";b.style.overflow="hidden";var d=this.spec.get("tR");b.style.backgroundColor=a;if(c&&this.backgroundImage!==""){b.style.backgroundImage=this.backgroundImage;b.style.backgroundPosition="-"+(this.boxWidth-(f-k)+this.borderWidth)+"px -"+((this.boxHeight+d+h)-this.borderWidth)+"px"}if(g!=100){curvyObject.setOpacity(b,g)}b.style.top=h+"px";b.style.left=k+"px";j.appendChild(b)};curvyObject.prototype.fillerWidth=function(b){var a,c;a=curvyBrowser.quirksMode?0:this.spec.radiusCount(b)*this.borderWidthL;if((c=this.boxWidth-this.spec.radiusSum(b)+a)<0){throw this.newError("Radius exceeds box width")}return c+"px"};curvyObject.prototype.errmsg=function(c,d){var b="\ntag: "+this.box.tagName;if(this.box.id){b+="\nid: "+this.box.id}if(this.box.className){b+="\nclass: "+this.box.className}var a;if((a=this.box.parentNode)===null){b+="\n(box has no parent)"}else{b+="\nParent tag: "+a.tagName;if(a.id){b+="\nParent ID: "+a.id}if(a.className){b+="\nParent class: "+a.className}}if(d===undefined){d="warning"}return"curvyObject "+d+":\n"+c+b};curvyObject.prototype.newError=function(a){return new Error(this.errmsg(a,"exception"))};curvyObject.IntToHex=function(b){var a=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];return a[b>>>4]+""+a[b&15]};curvyObject.BlendColour=function(m,k,h){if(m==="transparent"||k==="transparent"){throw this.newError("Cannot blend with transparent")}if(m.charAt(0)!=="#"){m=curvyObject.format_colour(m)}if(k.charAt(0)!=="#"){k=curvyObject.format_colour(k)}var d=parseInt(m.substr(1,2),16);var l=parseInt(m.substr(3,2),16);var g=parseInt(m.substr(5,2),16);var c=parseInt(k.substr(1,2),16);var j=parseInt(k.substr(3,2),16);var f=parseInt(k.substr(5,2),16);if(h>1||h<0){h=1}var i=Math.round((d*h)+(c*(1-h)));if(i>255){i=255}if(i<0){i=0}var b=Math.round((l*h)+(j*(1-h)));if(b>255){b=255}if(b<0){b=0}var a=Math.round((g*h)+(f*(1-h)));if(a>255){a=255}if(a<0){a=0}return"#"+curvyObject.IntToHex(i)+curvyObject.IntToHex(b)+curvyObject.IntToHex(a)};curvyObject.pixelFraction=function(i,h,a){var k;var f=a*a;var b=new Array(2);var g=new Array(2);var j=0;var c="";var d=Math.sqrt(f-Math.pow(i,2));if(d>=h&&d<(h+1)){c="Left";b[j]=0;g[j]=d-h;++j}d=Math.sqrt(f-Math.pow(h+1,2));if(d>=i&&d<(i+1)){c+="Top";b[j]=d-i;g[j]=1;++j}d=Math.sqrt(f-Math.pow(i+1,2));if(d>=h&&d<(h+1)){c+="Right";b[j]=1;g[j]=d-h;++j}d=Math.sqrt(f-Math.pow(h,2));if(d>=i&&d<(i+1)){c+="Bottom";b[j]=d-i;g[j]=0}switch(c){case"LeftRight":k=Math.min(g[0],g[1])+((Math.max(g[0],g[1])-Math.min(g[0],g[1]))/2);break;case"TopRight":k=1-(((1-b[0])*(1-g[1]))/2);break;case"TopBottom":k=Math.min(b[0],b[1])+((Math.max(b[0],b[1])-Math.min(b[0],b[1]))/2);break;case"LeftBottom":k=g[0]*b[1]/2;break;default:k=1}return k};curvyObject.rgb2Array=function(a){var b=a.substring(4,a.indexOf(")"));return b.split(/,\s*/)};curvyObject.rgb2Hex=function(b){try{var c=curvyObject.rgb2Array(b);var h=parseInt(c[0]);var f=parseInt(c[1]);var a=parseInt(c[2]);var d="#"+curvyObject.IntToHex(h)+curvyObject.IntToHex(f)+curvyObject.IntToHex(a)}catch(g){var i="getMessage" in g?g.getMessage():g.message;throw new Error("Error ("+i+") converting RGB value to Hex in rgb2Hex")}return d};curvyObject.setOpacity=function(g,c){c=(c==100)?99.999:c;if(curvyBrowser.isSafari&&g.tagName!="IFRAME"){var b=curvyObject.rgb2Array(g.style.backgroundColor);var f=parseInt(b[0]);var d=parseInt(b[1]);var a=parseInt(b[2]);g.style.backgroundColor="rgba("+f+", "+d+", "+a+", "+c/100+")"}else{if(typeof g.style.opacity!=="undefined"){g.style.opacity=c/100}else{if(typeof g.style.MozOpacity!=="undefined"){g.style.MozOpacity=c/100}else{if(typeof g.style.filter!=="undefined"){g.style.filter="alpha(opacity="+c+")"}else{if(typeof g.style.KHTMLOpacity!=="undefined"){g.style.KHTMLOpacity=c/100}}}}}};curvyCorners.addEvent=function(d,c,b,a){if(d.addEventListener){d.addEventListener(c,b,a);return true}if(d.attachEvent){return d.attachEvent("on"+c,b)}d["on"+c]=b;return false};if(typeof addEvent==="undefined"){addEvent=curvyCorners.addEvent}curvyObject.getComputedColour=function(g){var h=document.createElement("DIV");h.style.backgroundColor=g;document.body.appendChild(h);if(window.getComputedStyle){var f=document.defaultView.getComputedStyle(h,null).getPropertyValue("background-color");h.parentNode.removeChild(h);if(f.substr(0,3)==="rgb"){f=curvyObject.rgb2Hex(f)}return f}else{var a=document.body.createTextRange();a.moveToElementText(h);a.execCommand("ForeColor",false,g);var b=a.queryCommandValue("ForeColor");var c="rgb("+(b&255)+", "+((b&65280)>>8)+", "+((b&16711680)>>16)+")";h.parentNode.removeChild(h);a=null;return curvyObject.rgb2Hex(c)}};curvyObject.format_colour=function(a){if(a!==""&&a!=="transparent"){if(a.substr(0,3)==="rgb"){a=curvyObject.rgb2Hex(a)}else{if(a.charAt(0)!=="#"){a=curvyObject.getComputedColour(a)}else{if(a.length===4){a="#"+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)+a.charAt(3)+a.charAt(3)}}}}return a};curvyCorners.getElementsByClass=function(j,g){var f=new Array;if(g===undefined){g=document}j=j.split(".");var a="*";if(j.length===1){a=j[0];j=false}else{if(j[0]){a=j[0]}j=j[1]}var d,c,b;if(a.charAt(0)==="#"){c=document.getElementById(a.substr(1));if(c){f.push(c)}}else{c=g.getElementsByTagName(a);b=c.length;if(j){var h=new RegExp("(^|\\s)"+j+"(\\s|$)");for(d=0;d<b;++d){if(h.test(c[d].className)){f.push(c[d])}}}else{for(d=0;d<b;++d){f.push(c[d])}}}return f};curvyCorners.getElementsBySelector=function(f,g){var b;var h=f[0];if(g===undefined){g=document}if(h.indexOf("#")===-1){b=curvyCorners.getElementsByClass(h,g)}else{var d=g.getElementById(h.substr(1));if(!d){return[]}b=[d]}if(f.length>1){var a=[];for(var c=b.length;--c>=0;){a=a.concat(curvyCorners.getElementsBySelector(f.slice(1),b[c]))}b=a}return b};if(curvyBrowser.supportsCorners){var curvyCornersNoAutoScan=true;curvyCorners.init=function(){}}else{curvyCorners.scanStyles=function(){function b(h){if(!parseInt(h)){return"px"}var i=/^[\d.]+(\w+)$/.exec(h);return i[1]}var f,d,c;if(curvyBrowser.isIE){function a(o){var j=o.style,h,i,m,l,n;if(curvyBrowser.ieVer>6){h=j["-moz-border-radius"]||0;i=j["-moz-border-radius-topright"]||0;m=j["-moz-border-radius-topleft"]||0;l=j["-moz-border-radius-bottomright"]||0;n=j["-moz-border-radius-bottomleft"]||0}else{h=j["moz-border-radius"]||0;i=j["moz-border-radius-topright"]||0;m=j["moz-border-radius-topleft"]||0;l=j["moz-border-radius-bottomright"]||0;n=j["moz-border-radius-bottomleft"]||0}if(h){var p=h.split("/");p=p[0].split(/\s+/);if(p[p.length-1]===""){p.pop()}switch(p.length){case 3:m=p[0];i=n=p[1];l=p[2];h=false;break;case 2:m=l=p[0];i=n=p[1];h=false;case 1:break;case 4:m=p[0];i=p[1];l=p[2];n=p[3];h=false;break;default:curvyCorners.alert("Illegal corners specification: "+h)}}if(h||m||i||l||n){var k=new curvyCnrSpec(o.selectorText);if(h){k.setcorner(null,null,parseInt(h),b(h))}else{if(i){k.setcorner("t","r",parseInt(i),b(i))}if(m){k.setcorner("t","l",parseInt(m),b(m))}if(n){k.setcorner("b","l",parseInt(n),b(n))}if(l){k.setcorner("b","r",parseInt(l),b(l))}}curvyCorners(k)}}for(f=0;f<document.styleSheets.length;++f){try{if(document.styleSheets[f].imports){for(d=0;d<document.styleSheets[f].imports.length;++d){for(c=0;c<document.styleSheets[f].imports[d].rules.length;++c){a(document.styleSheets[f].imports[d].rules[c])}}}for(d=0;d<document.styleSheets[f].rules.length;++d){a(document.styleSheets[f].rules[d])}}catch(g){if(typeof curvyCornersVerbose!=="undefined"&&curvyCornersVerbose){alert(g.message+" - ignored")}}}}else{if(curvyBrowser.isOp){for(f=0;f<document.styleSheets.length;++f){if(operasheet.contains_border_radius(f)){c=new operasheet(f);for(d in c.rules){if(!isNaN(d)){curvyCorners(c.rules[d])}}}}}else{curvyCorners.alert("Scanstyles does nothing in Webkit/Firefox/Opera")}}};curvyCorners.init=function(){if(arguments.callee.done){return}arguments.callee.done=true;if(curvyBrowser.isWebKit&&curvyCorners.init.timer){clearInterval(curvyCorners.init.timer);curvyCorners.init.timer=null}curvyCorners.scanStyles()}}if(typeof curvyCornersNoAutoScan==="undefined"||curvyCornersNoAutoScan===false){if(curvyBrowser.isOp){document.addEventListener("DOMContentLoaded",curvyCorners.init,false)}else{curvyCorners.addEvent(window,"load",curvyCorners.init,false)}};

/* 
 * Cross-browser event handling, by Scott Andrew
 */
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

/* 
 * Kills an event's propagation and default action
 */
function knackerEvent(eventObject) {
    if (eventObject && eventObject.stopPropagation) {
        eventObject.stopPropagation();
    }
    if (window.event && window.event.cancelBubble ) {
        window.event.cancelBubble = true;
    }
    
    if (eventObject && eventObject.preventDefault) {
        eventObject.preventDefault();
    }
    if (window.event) {
        window.event.returnValue = false;
    }
}

/* 
 * Safari doesn't support canceling events in the standard way, so we must
 * hard-code a return of false for it to work.
 */
function cancelEventSafari() {
    return false;        
}

/* 
 * Cross-browser style extraction, from the JavaScript & DHTML Cookbook
 * <http://www.oreillynet.com/pub/a/javascript/excerpt/JSDHTMLCkbk_chap5/index5.html>
 */
function getElementStyle(elementID, CssStyleProperty) {
    var element = document.getElementById(elementID);
    if (element.currentStyle) {
        return element.currentStyle[toCamelCase(CssStyleProperty)];
    } else if (window.getComputedStyle) {
        var compStyle = window.getComputedStyle(element, '');
        return compStyle.getPropertyValue(CssStyleProperty);
    } else {
        return '';
    }
}

/* 
 * CamelCases CSS property names. Useful in conjunction with 'getElementStyle()'
 * From <http://dhtmlkitchen.com/learn/js/setstyle/index4.jsp>
 */
function toCamelCase(CssProperty) {
    var stringArray = CssProperty.toLowerCase().split('-');
    if (stringArray.length == 1) {
        return stringArray[0];
    }
    var ret = (CssProperty.indexOf("-") == 0)
              ? stringArray[0].charAt(0).toUpperCase() + stringArray[0].substring(1)
              : stringArray[0];
    for (var i = 1; i < stringArray.length; i++) {
        var s = stringArray[i];
        ret += s.charAt(0).toUpperCase() + s.substring(1);
    }
    return ret;
}

/*
 * Disables all 'test' links, that point to the href '#', by Ross Shannon
 */
function disableTestLinks() {
  var pageLinks = document.getElementsByTagName('a');
  for (var i=0; i<pageLinks.length; i++) {
    if (pageLinks[i].href.match(/[^#]#$/)) {
      addEvent(pageLinks[i], 'click', knackerEvent, false);
    }
  }
}

/* 
 * Cookie functions
 */
function createCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name) {
    var cookieCrumbs = document.cookie.split(';');
    var nameToFind = name + '=';
    for (var i = 0; i < cookieCrumbs.length; i++) {
        var crumb = cookieCrumbs[i];
        while (crumb.charAt(0) == ' ') {
            crumb = crumb.substring(1, crumb.length); /* delete spaces */
        }
        if (crumb.indexOf(nameToFind) == 0) {
            return crumb.substring(nameToFind.length, crumb.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, '', -1);
}