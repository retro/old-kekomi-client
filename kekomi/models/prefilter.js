steal('jquery', 'jquery/lang/json', function(){
	$.ajaxPrefilter(function(options, originalOptions, xhr){
		if(options.type.toUpperCase() !== "GET"){
			var data = originalOptions.data;
			options.data = $.toJSON(data);
			options.contentType = "application/json; charset=UTF-8";
			xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		}
	})
})