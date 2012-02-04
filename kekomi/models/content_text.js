steal('jquery/model', function(){

/**
 * @class Kekomi.Models.Content_Text
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend content_text services.  
 */
$.Model('Kekomi.Models.Content_Text',
/* @Static */
{
	findAll: "/content_texts.json",
  	findOne : "/content_texts/{id}.json", 
  	create : "/content_texts.json",
 	update : "/content_texts/{id}.json",
  	destroy : "/content_texts/{id}.json"
},
/* @Prototype */
{
	attributes : {
		content : "string",
		type : "string"
	}
});

})