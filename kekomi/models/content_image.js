steal('jquery/model', function(){

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
		caption: "string",
		asset_id: "integer"
	}
},
/* @Prototype */
{});

})