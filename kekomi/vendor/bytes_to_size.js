steal('jquery/view/ejs').then(function(){
	var bytesToSize = function (bytes) {
	    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	    if (!bytes || bytes == 0) return 'n/a';
	    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	    return Math.round(bytes / Math.pow(1024, i), 2) + '&nbsp;' + sizes[[i]];
	};
	$.extend($.EJS.Helpers.prototype, {bytesToSize : bytesToSize});
})