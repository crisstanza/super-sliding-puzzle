function Utils() {
}

Utils.trunc = function(str, lim) {
	if ( str.length < (lim - 3) ) {
		return str;
	} else {
		return str.substr(0, lim) + '...';
	}
}