//This popup code is configurable depending on how you have the attributes set
// in the following format:
//     ('genURL', 'extwinName', 'windowwidth', 'windowheight', 'scrollbars', 'toolbar', 'menubar', 'resizable', 'status', 'directories')
//     Where 	genURL 		= the html page that appears in the popup
//                extwinName 	= a name you give to the window
//                windowwidth 	= window width
//                windowheight 	= window height
//                scrollbars 	= yes or no
//                toolbar 		= yes or no
//                menubar 		= yes or no
//                resizeable 	= yes or no
//                status 		= yes or no
//                directories 	= yes or no
//                left          = pixels window appears from left of screen
//                top           = pixels window appears from top of screen
//                location    = display location bar. Yes to display, no or blank for don't display.

function openPopUpWindow(genURL, extwinName, windowwidth, windowheight, scrollbars, toolbar, menubar, resizable, status, directories, left, top, location)	{

	var generatedURL = genURL;
	var winName      = extwinName;
	var targetFound  = false;
	var idx          = opnwinIdx;
	var eleName      = null;
	var eleReff      = null;
   var winWidth 	 = windowwidth;
	var winHeight 	 = windowheight;
   var winScroll    = scrollbars;
   var winToolbar   = toolbar;
   var winMenubar   = menubar;
   var winResizable = resizable;
   var winStatus    = status;
   var winDirectories = directories;
   var winScreenX   = left;
   var winScreenY   = top;
   var location1 = (location == "yes") ? "yes" : "no";

	var options = "width=" + winWidth + ",height=" + winHeight +  ",scrollbars=" + winScroll + ",";
		 options += "toolbar=" + winToolbar + ",menubar=" + winMenubar + ",";
       options += "resizable=" + winResizable + ",status=" + winStatus + ",";
       options += "directories=" + winDirectories + ",";
       options += "screenX=" + winScreenX + ",screenY=" + winScreenY + ",";
       options += "left=" + winScreenX + ",top=" + winScreenY + ",";
		 options += "location=" + location1 + ", channelmode=no,";

		// The following lines are for tracking multiple windows being opened.
		var opnwinNameArray = new Array();
        var opnwinIDArray = new Array();
		var eleReference = null;
		var opnwinIdx = 0;

		function selectedValue(control) {
			return control.options[control.selectedIndex].value;
		}


		// Search the array to see if the target window already exits.
		for(var i=0; i < idx; i++)
		{
			eleName = opnwinNameArray[i]

			// if there is a match, exit the for loop, else set the temp varibles to blanks.
			if (eleName == winName) {
				eleReff = opnwinIDArray[i]
				targetFound = true;
				break;
			}
			else
			{
				eleName = "";
			}
		}

		// Check to see if the target is empty or closed. If so then a new window will be opened. If not
		// then the window already is opened and the focus will be shifted to it.

	    if (targetFound) {
			if ((eleReff == null) || (eleReff.closed))
			{
				opnwinIDArray[i] = window.open(generatedURL, winName, options);
				self.opnwinIDArray[i].focus();
			}
			else
			{
				self.opnwinIDArray[i].focus();
			}
		}
		else
		{
			// If the target window is new, add it to the open windows arrays.
			opnwinIDArray[opnwinIdx] = window.open(generatedURL, winName,  options)
			opnwinNameArray[opnwinIdx] = winName;
			opnwinIdx = ++idx;
		}
	}