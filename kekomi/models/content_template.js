steal('jquery/model', function(){

/**
 * @class Kekomi.Models.ContentTemplate
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend content_template services.  
 */
$.Model('Kekomi.Models.ContentTemplate',
/* @Static */
{
	findAll: "/content_templates.json",
	findOne : "/content_templates/{id}.json", 
	create : "/content_templates.json",
	update : "/content_templates/{id}.json",
	destroy : "/content_templates/{id}.json"
},
/* @Prototype */
{});

})