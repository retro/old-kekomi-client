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
	findAll: "/assets.json",
	findOne : "/assets/{id}.json", 
	create : "/assets.json",
	update : "/assets/{id}.json",
	destroy : "/assets/{id}.json",

	attributes : {
		name       : 'string',
		url        : 'string',
		type       : 'string', // image, document, video
		size       : 'integer',
		filename   : 'string',
		folder_id  : 'integer',
		tags       : 'array',
		created_at : 'date'
	},
	convert : {
		date : function(raw){
			if(typeof raw == 'string'){
				return moment(raw, 'YYYY-MM-DDThh:mm:ssZ').native();
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

})