steal('jquery/model', function(){

var convertFromFile = function(file){
	var caption = file.name,
			extStart = caption.lastIndexOf('.');
	caption = caption.substring(0, extStart)
									 .replace(/_/, ' ')
									 .replace(/^[a-z]/, function(str){
											return str.toUpperCase();
									 });
	return {
		filename : file.filename,
		caption  : caption,
		asset_id : file.id
	};
}

/**
 * @class Kekomi.Models.ContentImage
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend content_image services.  
 */
$.Model('Kekomi.Models.ContentImage',
/* @Static */
{
	attributes : {
		filename: "string",
		caption: "text",
		asset_id: "integer"
	},
	newFromFile : function(file){ 
		return new Kekomi.Models.ContentImage(convertFromFile(file));
	}
},
/* @Prototype */
{
	updateFromFile : function(file){
		this.attrs(convertFromFile(file));
	}
});

})