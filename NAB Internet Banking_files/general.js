// $Revision: 1.5 $
// $Workfile: general.js $

//If the user has attempted to open a new window from within the IB app (eg. CTRL-N), load a blank page instead of loading IB
// PD - Special handling of Safari which does not set the window.name properly
isSafari = (navigator.appVersion.indexOf("Safari")!=-1);
if (!isSafari)
{
 if (window.name == "") {window.location="about:blank"}
}

NS4 = (document.layers);
IE4 = (document.all);
ver4 = (NS4 || IE4);
IE5 = (IE4 && navigator.appVersion.indexOf("5.")!=-1);
if( IE5 )
  IE4 = false;
isMac = (navigator.appVersion.indexOf("Mac") != -1);

//  This should NOT be commented out when going live
if(navigator.appName.indexOf("Microsoft") != -1)document.oncontextmenu=function(){return false}

var onKDHandler;
function initKey( handler ) {
  onKDHandler = handler;
  if(document.layers) {
    document.captureEvents(Event.KEYDOWN);
  }
  document.onkeydown =
  
  function(e) {
    whichASC = (navigator.appName == "Netscape") ? e.which : window.event.keyCode;
 	  if((whichASC==13) || (whichASC==3 && isMac)) {
			if (NS4) {
				var thisTarget = new String();
				thisTarget = String(e.target) 

				if (-1 == thisTarget.indexOf("textarea")) {
          return onKDHandler() 
        } else {
          return true
        }				
			} else {
        return onKDHandler()
      }
		}
	}
}

function init(){}

function disstatus()
{
  window.status = "";
  //function()
  //{return true;}
}

function getCookieVal(offset)
{
  var es = document.cookie.indexOf(";", offset);
  if(es==-1)es=document.cookie.length;
  return unescape(document.cookie.substring(offset,es));
}

function getCookie(name)
{
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while ( i < clen)
  {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal(j);
    i = document.cookie.indexOf(" ", i) + 1;
    if ( i == 0) break;
  }
  return null;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}



/**
 * This is called by onUnload event to logout user if the user shutdowns the browser.
 * This is a 'hack' and it will not work in all possible circumstances. onUnload event
 * is called when (1) browser is paged, (2) browser is refreshed and (3) browser is closed.
 *
 * The logout process is only interested in catching the browser close event. It works by
 * opening a child window and detect if the parent window == null to determine if the
 * browser is closed. If the browser is closed, user loggout is sent.
 *
 * As a side effect, the child window is visible in NS, Safari and some mac browsers.
 * AFAIK, Safari 1.0 does not call onUnload event when the browser is closed, which defeats
 * this purpose.
 */
var canClose = true;
function logout()
{

  if(canClose) {
  	    // Send the child window away at the last pixel of the screen. In Safari, if it
  	    // is sent away more than the screen size, it is returned to 0,0. In NS, it is
  	    // bounded at the maximum. 
        
        //All browser will use these values as the default.
        var top = 4000;
        var left = 4000;
        
        //Safari will use the following values.
        if (isSafari)
        {
        	top = screen.height - 1;
        	left = screen.width - 1;
	    }

	    index = logouturl.indexOf("?sess");
	    if (index != -1) {
	    	logouturl = logouturl.substring(0,index);
	    }
	    window.open(logouturl,'logout','top=' + top + ',left=' + left + ',width=1,height=1');
  }
}

function sendMenuRequest(actionString){
  if( actionString.indexOf("javascript:") != -1)
  {
  	indexStart = actionString.indexOf(":");
  	jsFunc = actionString.substring(indexStart+1,actionString.length);
  	eval(jsFunc);
  	return;
  }
  
  if( !confirmCreateExit() ) return;
  if ( actionString == "logout.ctl" ){
    if (!confirm("Thank you for banking with NAB.\n Are you sure you want to exit Internet Banking?") ) return;
  } else if ( actionString == "declineTcsLogin" ){
    if (!confirm("Are you sure you want to decline these Terms and Conditions and Exit Login?") ) return;
		actionString = "logout.ctl";
  }
  submitMenu(actionString);
  return true;
}

function submitMenu(actionString)
{
  canClose = false;
  document.menuForm.action=actionString;
  document.menuForm.submit();
}

// Change the action of the first form of the page and submit it using the given error code as a parameter
function exitToErrorPage(errorCode)
{
  document.forms[0].action = "error_message.ctl?error=" + errorCode;
  document.forms[0].submit();
}

function stripCharsInBag (s, bag)
{
  re=new RegExp("["+bag+"]","g");
  return(s.replace(re,""));
}

function trimLeft(s){return (s.replace(/^\s+|\s+$/g,""));}

function trimCharacters(field, values) {
  var fvalue = field.value;
  return (stripCharsInBag(fvalue,values));
}

function validateNumber(field, valid) {
  var fvalue = trimLeft(field.value);
  var re = new RegExp("^[" + valid + "]+$");
  return (fvalue.match(re));
}

function validateWord(field, characters) {
  var fvalue = trimLeft(field.value);
  var re = new RegExp("^[" + characters + "]+$");
  return (fvalue.match(re));
}

function validateAlphaNumeric(field) {
  var fvalue = trimLeft(field.value);
  var re = new RegExp("^[0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]+$");
  return (fvalue.match(re));
}

function convertToDate(thatDate)
{
  var i = thatDate.indexOf("/");
  var j = thatDate.substring(i+1).indexOf("/") + i + 1;
  var theDate = thatDate.substring(0, i);
  var theMonth = thatDate.substring(i+1, j);
  var theYear = thatDate.substring(j+1);
  while (theMonth.substring(0, 1) == "0")
    theMonth = theMonth.substring(1);
  while (theDate.substring(0, 1) == "0")
    theDate = theDate.substring(1);

  if (theYear.length == 2)
      theYear = "20" + theYear;
  var resultDate = new Date(theYear, parseInt(theMonth)-1, parseInt(theDate)+1);
  return resultDate;
}

function formatAmount(amount)
{
  var amt = trimLeft(amount);
  if (amt.indexOf(".") == -1)
    amt = amt + ".00";

  if (amt.length < 7)
    return amt;

  var pos = amt.indexOf(".");
  var temp = amt.substring(pos);
  var num = (amt.length - 4 )/3;
  while (num > 0) {
    temp = amt.substring (pos -3, pos) + temp;
    num = num - 1;
    pos = pos - 3;
    if (num > 0) 
      temp = "," + temp;
    else if (pos > 0)
      temp = amt.substring(0, pos) + "," + temp;
  }
  return temp;
}

function validatePassword(field){
  var passwordStrength   = 0;
  var password = field.value;

  if ((password.length >0) && (password.length <=5)){ 
		passwordStrength=1;
  }else {
	  if (password.length >= 6) passwordStrength=1;
	
	  if (password.match(/[a-z]/)) passwordStrength++;
				
	  if (password.match(/[A-Z]/)) passwordStrength++;
	
	  if (password.match(/\d+/)) passwordStrength++;
	
	  if (password.match(/[^a-zA-Z0-9]/))	passwordStrength++;
  }
    
  return (passwordStrength >=3);
}

function validateMaxLengthPassword(field){
   var password = field.value;
   return (password.length >500);
}

function validateNum(field) {
  var reg1=/^[0-9]+$/;
  return reg1.test(field.value);
}

function validateNumber(field) {
  var reg1=/^[0-9]+$/;
  return reg1.test(field);
}

function validateAlphaNum(field) {
  var reg3=/^[0-9a-zA-Z\s\-\.\*\/]+$/;
  return reg3.test(field.value);
}

function validateDate(field) {
  var reg1=/^((([0]{1})+([1-9]{1}))|(([1-3]{1})+([\d]{1})))+\/+((([0]{1})+([1-9]{1}))|(([1]{1})+([0-2]{1})))+\/+(([0-9]{1})+([0-9]{1}))$/;
  if (reg1.test(field.value) == true)
    return isDateValid(field.value);
  return false;
}

function isDateValid(dateStr)
{
  var len = dateStr.length;
  if (len == 0)
    return false;
  var datePat = /^(\d{1,2})(\/)(\d{1,2})\2(\d{2}|\d{4})$/;
  var matchArray = dateStr.match(datePat);
  if (matchArray == null) 
    return false;
  month = matchArray[3];
  day = matchArray[1];
  year = matchArray[4];

  if( month.length != 2 || day.length != 2 || (year.length != 2 && year.length != 4) )
    return false;
  if (month < 1 || month > 12)
    return false;

  if (day < 1 || day > 31) 
    return false;
  if ((month==4 || month==6 || month==9 || month==11) && day==31)
    return false;
  if (month == 2)
  { 
    var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
    if (day>29 || (day==29 && !isleap)) 
      return false;
  }
  return true;
}

function validateDecimal(field){
	if(!isNaN(field))
	{
 		var reg1=/^[0-9\.]+$/;
	  	return reg1.test(field);
	}
	else
		return false;
}

function validateZero(field){
  var reg1=/^0*[1-9][0-9]*$/;
  return reg1.test(field.value);
}

function isNonZeroInteger(field)
{
  var reg1=/^[1-9]{1,}[0-9]*$/
  return reg1.test(field.value);
}

function validateTele(field) 
{
  var reg1=/^[0-9a-zA-Z\s\-\(\)\+]+$/;
  return reg1.test(field.value);
}

function validateBSB(field)
{
  var reg1=/^[0]{1,6}$/
  return !reg1.test(field.value);
}

function reformatDate(newDate)
{
  var reg2 = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/;
  var matchArray = newDate.match(reg2);
  var month = matchArray[3];
  var day = matchArray[1];
  var year = matchArray[4];
  var month2 = month - 1;
  if ((year >= 00) && (year < 70)){
  year = '2' + '0' + year;
  DateOne = new Date(Date.UTC( year, month2, day));
  valueDate = DateOne.valueOf();
  return valueDate;
  }
  else if ((year >= 70) && (year <= 99)){
  year = '1' + '9' + year;
  DateOne = new Date(Date.UTC( year, month2, day));
  valueDate = DateOne.valueOf();
  return valueDate;
  }
}

function isEmpty(s){return ((s == null) || (s.length == 0))}

function isDigit(c){return ((c >= "0") && (c <= "9"))}

/**
 * This function will return true if the array contains the specified value, otherwise false.
 * arrayVar - Array of values
 * valueVar - Value to search on
 */
function containsValue(arrayVar, valueVar)
{
    var found = false;
    for (j=0; j<arrayVar.length; j++)
    {
        if (arrayVar[j] == valueVar)
        {
            found = true;
            break;
        }
    }
    
    return found;
}
/*
	Do an asynchronous call to a URL.
	
	This function make an asynchronous call to the supplied URL
	(getURL).

	When the call returns, the supplied method is called to process the data
	(readyStateChangeFunction).  The method should accept an httpRequest as
	its single argument.
	
	If you do not need to process the returned data, supply a null for the
	callback function.
*/

function asynchGet(getURL, readyStateChangeFunction) {

	var httpRequest;

	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		httpRequest = new XMLHttpRequest();
	} 
	else if (window.ActiveXObject) { // IE
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) {}
		}
	}

	if (!httpRequest) {
		return false;
	}
	
	// Assign the callback function to process the returned data.
	// See asynchGetDataProcess() below for an example.
	
	if (readyStateChangeFunction != null) {
		httpRequest.onreadystatechange = function() { readyStateChangeFunction(httpRequest); };
	}
		
	// Go ahead and make the call (async == true).
	
	httpRequest.open("GET", getURL, true);
	httpRequest.send("");
}

/*
	An example of a callback method to supply to the asynchGet function.  Note
	that these callbacks have to accept an httpRequest object instance as their
	first and only argument.
*/

function asynchGetDataProcess(httpRequest) {

	if (httpRequest.readyState == 4) {
	
		if (httpRequest.status == 200) {
			alert(httpRequest.responseText);
		}
		else {
			alert("There was a problem with the request.");
		}
	}
}

function check(p,k,a) {
  return encode(p,k,a);
}

// returns true if parameter supplied to function is numeric
function IsNumeric(sText)
{
   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) {
         IsNumber = false;
      }
    }
   return IsNumber;
}

/* 
 * Performs page URL nagivation and ensuring there is a HTTP referer.
 *
 * Regular location.href is problematic because IE don't carry referer
 * during location.href. 
 *
 * This implementation dynamically creates a form '#navigateTo'
 * and configures the correct form action and parameters based
 * on a URL with valid query string parameter. The form is automatically
 * submitted to emulate a page navigation behaviour. Using this
 * approach all tested browsers appear to supply HTTP REFERER.
 *
 * This also used by the generated javascript in ConfirmTag.java.
 * This method REQUIRES JQUERY to function.
 */
function navigateTo(url) {
	// Parse the url
	// querystring[0] => url to reach
	// querystring[1] => querystring of parameters
	var querystring = url.split("?");
	
	// Create the navigational form ONLY if it does not exist.
	if ($("#navigateTo").html() == null) {
		$("body")
		.append("<form id='navigateTo' method='GET'></form>");
	}
		
	// Clear it, because an old one may be there
	$("#navigateTo").empty();
	
	// Specifies the desired URL to reach
	$("#navigateTo").attr("action",querystring[0]);		
	
	// Populate hidden input parameters from queryString format
	if (querystring.length > 1) {	
		var params = querystring[1].split("&");
		for (var i=0;i<params.length;i++) {
			var pair = params[i].split("=");
			$("#navigateTo").append("<input type='hidden' name='" + pair[0] + "' value='" + pair[1] + "'>");
		}	
	}
	
	// Submit it
	$("#navigateTo").get(0).submit();	
}

/* 
 * Tells the browser to alert after a small delay. This is needed in IE when the page contains
 * some jquery rules and css stylng rules. The regular popup stops the styling from completing
 * when the popup block the screen. 
 *
 * Use for showing popup alert when the page is being loaded.
 */
function onLoadAlert(message) {
	window.setTimeout(function() {
		alert(message);
	}, 300);    
}

/* Returns IB window width (in a browser compatible manner)
 */
function browserWidth() {
	return window.innerWidth != null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ?       
		   document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
} 

/* Returns IB window height (in a browser compatible manner)
 */
function browserHeight() {
	return window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ?  
		   document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
}


/**
 * Sets "ibWindowSize" cookie: value is left/X coordinate + "x" + top/Y coordinate
 * Used by registration process to size windows to allow for first time user wizard.
 */
function setIBWindowCoordCookie() {
	var ibWinSize = "";
	var exp = new Date();
	var currDate = exp.getTime();
	var newExpDate = currDate + (182 * 24 * 60 * 60 * 1000);
	exp.setTime(newExpDate);

	var winX=0;
	var winY=0;

	if($.browser.msie){
		winX=window.screenLeft;
		winY=window.screenTop;
	} else {
		winX=window.screenX;
		winY=window.screenY;
	}
	
	ibWinSize = winX+"x"+winY;
	document.cookie = "ibWindowSize=" + ibWinSize + "; expires=" + exp.toGMTString() + "; path=/";
}

/**
 * Gets "ibWindowSize" cookie: value is left/X coordinate + "x" + top/Y coordinate
 * Used by registration process to size windows to allow for first time user wizard.
 */
function getIBWindowCoordCookie() {
	var nameEq = "ibWindowSize=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++){
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length,c.length);
	}
	return null;
}

/**
 * As user types into textbox, restricts input to digits and decimal point
 * usage: onkeypress="return restrictCurrencyInput(event);"
 */
function restrictCurrencyInput(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

/**
 * As user types into textbox, restricts input to digits only
 * usage: onkeypress="return restrictDigitInput(event);"
 */
function restrictDigitInput(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
	   return false;
	
	return true;
}

function imgError(source) {    
	source.onerror ="";
	source.src ="images/blank.gif";
	source.style.border = "none";
	return true;
}

function test() {
	return false;
}

//Large clipboard pastes and other outlier scenarios to be handled by server side validation or onchange/onkeyup handlers
function limitLength(evt, obj, limit){
	if(obj.value.length > limit-1){
		var c = (evt.which) ? evt.which : event.keyCode;
		return (c==8||(c>32&&c<41)||c==46||(evt.ctrlKey&&(c==67||c==88)));
	}		
}

$(function() {
	/**
	 * This click_once is to prevent duplicate form submissions.
	 * You can apply this to all the button classes.
	 */
	//$('.click_once').click(function() {
	//	$(this).attr("disabled", "true");
	//});   
	
	$(".click_once").parents('form').submit(function(){
		$(".click_once").attr('disabled', 'true');
	});

});

(function($) {
  $.fn.nabExpandableText = function(short, long) {
    $(long).hide();
    $(this).click(function () {
      $(this).hide();
      $(short).hide();
      $(long).show();
    });
  }
})(jQuery);

function removeSpaces(string) {
	return string.replace(/\s/g, "");
}

function removeLeadingTrailingSpaces(string) {
	return string.replace(/(^\s+|\s+$)/g, "");
}

function sortBy(prop) {
	return function(a, b) {
		if (a[prop] > b[prop]) {
			return 1;
		} else if (a[prop] < b[prop]) {
			return -1;
		}
		return 0;
	}
}

function showAlertPopup(messageString) {
	if (messageString.length > 0) {	
		onLoadAlert(messageString);
	}
}