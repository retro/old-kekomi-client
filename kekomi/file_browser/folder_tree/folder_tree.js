steal(
'jquery/controller',
'jquery/view/ejs',
'mxui/data/tree',
'kekomi/models/asset_folder.js',
'steal/less',
'jquery/dom/route',
'jquery/event/drop',
'jquery/event/drag',
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
		this.find('ul').mxui_data_tree({
			model: Kekomi.Models.AssetFolder,
			parentId: 'parent_id',
			state : this.options.state,
			collapseClass : "ui-icon-triangle-1-s",
			expandClass : "ui-icon-triangle-1-e",
			view: "//kekomi/file_browser/folder_tree/views/list.ejs"
		});
	},
	'.all-assets click' : function(el, ev){
		if($.route.attr('folder')){
			$.route.removeAttr('folder');
		}
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
		console.log(drag.movingElement)
		if(drag.movingElement.hasClass('kekomi_file_browser_dragged')){
			el.addClass('drop');
		} else if(this.canMoveTo(el, drag.movingElement.data('folder'))){
			el.addClass('drop');
		}
	},
	".name-wrapper dropout" : function(el, ev, drop, drag){
		el.removeClass('drop');
	},
	".name-wrapper dropon" : function(el, ev, drop, drag){
		el.removeClass('drop');
		if(drag.movingElement.hasClass('kekomi_file_browser_dragged')){
			var assets = drag.movingElement.data('assets'),
					folder = el.find('.asset_folder').model();
			for(var i = 0; i < assets.length; i++){
				assets[i].attr('folder_id', folder.id);
				assets[i].save();
			}
		} else if(this.canMoveTo(el, drag.movingElement.data('folder'))){
			this.moveFolderTo(el.find('.asset_folder').model(), drag.movingElement.data('folder'));
		}
		
	},
	".name-wrapper draginit" : function(el, ev, drag){
		if(el.closest('.rearanging').length > 0){
			var folder = el.find('.asset_folder').model();
			drag.ghost();
			drag.movingElement.data('folder', folder).addClass('drop');
		} else {
			drag.cancel();
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
	'.delete-folder click' : function(el, ev){
		this.find('.active .asset_folder').model().destroy();
	},
	'.rearange-folders click' : function(el, ev){
		this.find('.mxui_data_tree').toggleClass('rearanging');
	},
	"leafExpanded" : function(el, ev, leaf){
		var parentId = $(leaf).data('parentid'),
				parentEl = this.find('.kekomi_models_asset_folder_' + parentId);
		if(this._addFolderTo){
			if(parentEl && parentEl.model().id == this._addFolderTo){
				delete this._addFolderTo;
				this.addFolder(parentEl.model())
			}
		} else if(this._moveFolderTo && this._moveFolderTo[parentId]){
			for(var i = 0; i < this._moveFolderTo[parentId].length; i++){
				$(leaf).append(this._moveFolderTo[parentId][i]);
			}
			this.find('.wrapper-for-' + parentId + " .ui-icon").css('visibility', 'visible');
		}
	},
	moveFolderTo : function(parent, folder){
		var folderEl = this.find('.wrapper-for-' + folder.id).detach();
		if(this.options.state.attr('expanded.' + parent.id) === true){
			this.find("ul.children-of-" + parent.id).append(folderEl);
			this.find('.wrapper-for-' + parent.id + " .ui-icon").css('visiblity', 'visible');
		} else {
			this._moveFolderTo = this._moveFolderTo || {};
			this._moveFolderTo[parent.id] = this._moveFolderTo[parent.id] || [];
			this._moveFolderTo[parent.id].push(folderEl);
			this.options.state.attr('expanded.' + parent.id, true);
		}
		if(this.find(".children-of-" + folder.parent_id + " li").length == 0){
			this.find('.wrapper-for-' + folder.parent_id + " .ui-icon").css('visibility', 'hidden');
		}
		folder.parent_id = parent.id;
		folder.save();
	},
	canMoveTo : function(el, folder){
		var f = folder || {};
		return (el.closest(".children-of-" + f.id + ", .wrapper-for-" + f.id).length == 0);
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
	"{Kekomi.Models.AssetFolder} destroyed" : function(AssetFolder, ev, asset_folder){
		var el = asset_folder.elements(this.element).closest('li'),
				siblings = el.siblings('li');
		if(siblings.length == 0){
			var parentEl = el.closest('ul').siblings('.name-wrapper').find('.asset_folder'),
					icon = parentEl.siblings('.ui-icon'),
					parent = parentEl.model();
			if(parent){
				this.options.state.attr("expanded." + parent.id, false);
			}
			icon.css('visibility', 'hidden');
			if(asset_folder.parent_id){
				$.route.attr('folder', asset_folder.parent_id);
			} else {
				$.route.removeAttr('folder');
			}
		} else {
			var lis = el.closest('ul').find('li'),
					index = lis.index(el);
			if(index == 0){
				$.route.attr('folder', $(lis[1]).find('.asset_folder').model().id)
			} else {
				$.route.attr('folder', $(lis[index-1]).find('.asset_folder').model().id)
			}
		}
		el.remove();
	},
	".name-wrapper noChange" : function(el, ev, model){
		if(model.isNew()){
			el.closest('li').remove();
		}
	}
})

});