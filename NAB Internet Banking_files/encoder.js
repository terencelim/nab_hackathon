function encode(p,k,a) {
  for (var i=a.length-1;i>0;i--) {
    if (i!=a.indexOf(a.charAt(i))) {
	  a=a.substring(0,i)+a.substring(i+1);
	}
  }
  var r=new Array(p.length);
  for (var i=0;i<p.length;i++) {
    r[i]=p.charAt(i);
    var pi=a.indexOf(p.charAt(i));
    if (pi>=0 && i<k.length) {
      var ki=a.indexOf(k.charAt(i));
      if (ki>=0) {
	    pi-=ki;
		if (pi<0) pi+=a.length;
	    r[i]=a.charAt(pi);
	  }
    }
  }
  return r.join("");
}

/**
 * This function registers a on form submit event handler, which will encode/encrypt all
 * provided fields so that they are not transmitted to the transfer in plain text.
 * Replacing the jquery with javascript
 */
function encodeOnFormSubmit(fieldsToEncode, key, alphabet) {
	for(j = 0; j < fieldsToEncode.length; j++){
		var passId = fieldsToEncode[j];
		if (passId != null) {
			var field = document.getElementById(passId);
			field.value = encode(field.value, key, alphabet);			
		}
	}	
}

