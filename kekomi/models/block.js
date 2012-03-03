steal('jquery/model', function(){

/**
 * @class Kekomi.Models.Block
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend block services.  
 */
$.Model('Kekomi.Models.Block',
/* @Static */
{
	findAll: "/blocks.json",
  	findOne : "/blocks/{id}.json", 
  	create : "/blocks.json",
 	update : "/blocks/{id}.json",
  	destroy : "/blocks/{id}.json"
},
/* @Prototype */
{});

})