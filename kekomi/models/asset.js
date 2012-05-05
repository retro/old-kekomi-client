steal('jquery/model', 'jquery/model/list', 'kekomi/vendor/moment', function(){

/**
 * @class Kekomi.Models.Asset
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend asset services.  
 */
$.Model('Kekomi.Models.Asset',
/* @Static */
{
	findOne : "/api/assets/{id}.json", 
	create  : "/api/assets.json",
	update  : "/api/assets/{id}.json",
	destroy : "/api/assets/{id}.json",

	findAll : function(params, success, error){
		if(params.key === null) delete params.key;
		if(params.type === null) delete params.type;
		return $.ajax({
			url: '/api/assets.json',
			type: 'get',
			dataType: 'json asset.models',
			data: params,
			success: success,
			error: error,
			fixture: "-assets"
		})
	},

	attributes : {
		name       : 'string',
		url        : 'string',
		type       : 'string', // image, document, video
		size       : 'integer',
		filename   : 'string',
		folder_id  : 'integer',
		tags       : 'array',
		created_at : 'date',
		upload     : 'string'
	},
	convert : {
		date : function(raw){
			if(typeof raw == 'string'){
				return moment(raw, 'YYYY-MM-DDTHH:mm:ssZ').native();
			}
			return moment(raw).native();
		}
	}
},
/* @Prototype */
{
	removeTag : function(tag){
		var index = this.tags.indexOf(tag);
		if(index > -1){
			this.tags.splice(index, 1);
			this.save();
		}
	},
	setCreatedAt : function(date){
		this.moment = moment(date);
		return date;
	}
});

$.Model.List('Kekomi.Models.Asset.List', {}, {
	ids : function(){
		return this.map(function(asset){
			return asset.id;
		})
	},
	missing : function(ids){
		var self = this;
		return this.grep(function(asset){
			return $.inArray(asset.id, ids) == -1;
		});
	},
	pushUnique : function(assets){
		var ids     = this.ids(),
				missing = assets.missing(ids);
		this.push.apply(this, missing);
	}
})

})