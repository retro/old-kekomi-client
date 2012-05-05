steal('jquery/model', function(){

/**
 * @class Kekomi.Models.ContentFile
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend content_file services.  
 */
$.Model('Kekomi.Models.ContentFile',
/* @Static */
{
	findAll : "/api/content_files.json",
	findOne : "/api/content_files/{id}.json", 
	create  : "/api/content_files.json",
	update  : "/api/content_files/{id}.json",
	destroy : "/api/content_files/{id}.json",
	newFromFile : function(file){
		return new Kekomi.Models.ContentFile({
			filename : file.filename,
			title    : file.name,
			asset_id : file.id,
			size     : file.size
		})
	}
},
/* @Prototype */
{});

})