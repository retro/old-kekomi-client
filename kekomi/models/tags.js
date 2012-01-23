steal('jquery/model', function(){

/**
 * @class Kekomi.Models.Tags
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend tags services.  
 */
$.Model('Kekomi.Models.Tags',
/* @Static */
{
	findAll: "/tags.json",
  	findOne : "/tags/{id}.json", 
  	create : "/tags.json",
 	update : "/tags/{id}.json",
  	destroy : "/tags/{id}.json"
},
/* @Prototype */
{});

})