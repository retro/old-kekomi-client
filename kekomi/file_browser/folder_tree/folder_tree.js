steal(
'jquery/controller',
'jquery/view/ejs',
'mxui/data/tree',
'kekomi/models/asset_folder.js',
'steal/less',
'jquery/dom/route'
).then('./views/list.ejs', './folder_tree.less', function($){


	var store = Kekomi.Models.AssetFolder.Store;
/**
 * @class Kekomi.FileBrowser.FolderTree
 */
$.Controller('Kekomi.FileBrowser.FolderTree',
/** @Static */
{
	defaults : {
		state: new $.Observe({expanded: {}})
	}
},
/** @Prototype */
{
	init : function(){
		//store.findAll({}, this.proxy(this.renderTree))
		this.element.mxui_data_tree({
			model: Kekomi.Models.AssetFolder,
			parentId: 'parent_id',
			state : this.options.state,
			collapseClass : "ui-icon-triangle-1-s",
			expandClass : "ui-icon-triangle-1-e",
			view: "//kekomi/file_browser/folder_tree/views/list.ejs"
		});
	},
	".name-wrapper click" : function(el, ev){
		if($(ev.srcElement).hasClass('ui-toggle')) return;
		if(el.hasClass('active')){
			$.route.removeAttr('folder');
		} else {
			var model = el.find('.asset_folder').model();
			this.find('.active').removeClass('active');
			el.addClass('active');
			$.route.attr('folder', model.id + "");
		}
	},
	"{$.route} folder remove" : function(route, ev){
		this.find('.active').removeClass('active')
	}
})

});