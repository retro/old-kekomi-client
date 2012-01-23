steal('jquery/model', 'jquery/model/store', 'jquery/model/list', function(){

var i = 0;
/**
 * @class Kekomi.Models.AssetFolder
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend asset_folder services.  
 */
$.Model('Kekomi.Models.AssetFolder',
/* @Static */
{
	findAll: "/asset_folders.json",
	findOne : "/asset_folders/{id}.json", 
	create : "/asset_folders.json",
	update : "/asset_folders/{id}.json",
	destroy : "/asset_folders/{id}.json",

	attributes : {
		name: 'string',
		parent_id: 'integer'
	},

	defaults : {
		parent_id : null
	}

},
/* @Prototype */
{
	hasChildren: function(){
		return this.child_count > 0;
	}

});

$.Model.List('Kekomi.Models.AssetFolder.List');
})