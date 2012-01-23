steal('jquery/model', function(){

/**
 * @class Kekomi.Models.Item
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend item services.  
 */
$.Model('Kekomi.Models.Item',
/* @Static */
{
	findAll: "/items.json",
  	findOne : "/items/{id}.json", 
  	create : "/items.json",
 	update : "/items/{id}.json",
  	destroy : "/items/{id}.json"
},
/* @Prototype */
{});

})