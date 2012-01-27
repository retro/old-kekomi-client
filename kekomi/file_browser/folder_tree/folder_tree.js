steal(
'jquery/controller',
'jquery/view/ejs',
'mxui/data/tree',
'kekomi/models/asset_folder.js',
'steal/less',
'jquery/dom/route',
'jquery/event/drop',
'widgets/inline_edit'
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
	},
	listensTo : ["leafExpanded"]
},
/** @Prototype */
{
	init : function(){
		//store.findAll({}, this.proxy(this.renderTree))
		this.find('ul').mxui_data_tree({
			model: Kekomi.Models.AssetFolder,
			parentId: 'parent_id',
			state : this.options.state,
			collapseClass : "ui-icon-triangle-1-s",
			expandClass : "ui-icon-triangle-1-e",
			view: "//kekomi/file_browser/folder_tree/views/list.ejs"
		});
	},
	".name-wrapper click" : function(el, ev){
		if($(ev.target).hasClass('ui-toggle')) return;
		if(el.hasClass('active')){
			$.route.removeAttr('folder');
		} else {
			var model = el.find('.asset_folder').model();
			if(typeof model.id != 'undefined'){
				$.route.attr('folder', model.id + "");
			}
		}
	},
	"{$.route} folder change" : function(route, ev, attr, how, newVal, oldVal){
		this.find('.kekomi_models_asset_folder_' + oldVal).closest('.name-wrapper').removeClass('active')
		this.find('.kekomi_models_asset_folder_' + newVal).closest('.name-wrapper').addClass('active')
	},
	"{$.route} folder remove" : function(route, ev){
		this.find('.active').removeClass('active')
	},
	".name-wrapper dropover" : function(el, ev, drop, drag){
		el.addClass('drop');
	},
	".name-wrapper dropout" : function(el, ev, drop, drag){
		el.removeClass('drop');
	},
	".name-wrapper dropon" : function(el, ev, drop, drag){
		el.removeClass('drop');
		var assets = drag.movingElement.data('assets'),
				folder = el.find('.asset_folder').model();
		for(var i = 0; i < assets.length; i++){
			assets[i].attr('folder_id', folder.id);
			assets[i].save();
		}
	},
	".edit-folder click" : function(el, ev){
		this.find('.active .inline_edit').trigger('edit');
	},
	'.add-folder click' : function(el, ev){
		var ul     = $.route.attr('folder') ? this.find('.active').siblings('ul') : this.find('.mxui_data_tree'),
				parent = ul.siblings('.name-wrapper').find('.asset_folder');
		if(parent.length > 0){
			var parentModel = parent.model(),
					expanded    = 'expanded.' + parentModel.id;
			if(this.options.state.attr(expanded) === true){
				this.addFolder(parentModel);
			} else {
				this._addFolderTo = parentModel.id;
				this.options.state.attr(expanded, true)
			}
		} else {
			this.addFolder();
		}
		
	},
	"leafExpanded" : function(el, ev, leaf){
		if(!!!this._addFolderTo) return;
		var parentEl = $(leaf).siblings('.name-wrapper').find('.asset_folder');
		if(parentEl && parentEl.model().id == this._addFolderTo){
			delete this._addFolderTo;
			this.addFolder(parentEl.model())
		}
	},
	addFolder : function(folder){
		var model = new Kekomi.Models.AssetFolder({name : 'New folder'}),
				ul, view;
		if(folder){
			ul = folder.elements(this.element).parent('.name-wrapper').siblings('ul');
			model.parent_id = folder.id;
		} else {
			ul = this.find('.mxui_data_tree');
		}
		view = $($.View("//kekomi/file_browser/folder_tree/views/list.ejs", [model]));
		ul.append(view);
		$(view).find('.inline_edit').trigger('edit');
	},
	"{Kekomi.Models.AssetFolder} created" : function(AssetFolder, ev, asset_folder){
		var undefinedFolders = this.find('.kekomi_models_asset_folder_undefined');
		for(var i = 0; i < undefinedFolders.length; i++){
			var el = $(undefinedFolders[i]),
					model = el.model();
			if(model.id == asset_folder.id){
				el.removeClass('kekomi_models_asset_folder_undefined').addClass(model.identity());
				el.closest('ul').siblings('.name-wrapper').find('.ui-icon').css('visibility', 'visible');
			}
		}
	},
	".name-wrapper noChange" : function(el, ev, model){
		if(model.isNew()){
			el.closest('li').remove();
		}
	}
})

});