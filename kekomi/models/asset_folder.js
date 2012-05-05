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
	findOne : "/api/asset_folders/{id}.json", 
	create  : "/api/asset_folders.json",
	update  : "/api/asset_folders/{id}.json",
	destroy : "/api/asset_folders/{id}.json",

	findAll : function(params, success, error){
		if(params.parent_id === null){
			delete params.parent_id
		}
		return $.ajax({
			url: "/api/asset_folders.json",
			data : params,
			success: success,
			error: error,
			dataType: "json asset_folder.models"
		})
	},

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