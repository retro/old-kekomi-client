steal(
'jquery/controller',
'jquery/view/ejs',
'steal/less',
'kekomi/models',
'kekomi/vendor/spin',
'kekomi/vendor/bytes_to_size.js',
'mxui/data/grid',
'kekomi/style',
'kekomi/file_browser/folder_tree',
'kekomi/file_browser/asset_grid',
'kekomi/file_browser/thumb_grid',
'jquery/dom/route',
'mxui/form/input_watermark',
'kekomi/vendor/scrollto',
'jquery/event/drag',
'jquery/event/drag/scroll',
'kekomi/file_browser/dragged',
'kekomi/file_browser/drag_drop_upload',
'kekomi/file_browser/preview'
).then( 
'./views/init.ejs', 
'./file_browser.less',
function($){

	var types = {
		all : "assets",
		document: "documents",
		image: "images",
		video: "videos"
	};
/**
 * @class Kekomi.FileBrowser
 */
$.Controller('Kekomi.FileBrowser',
/** @Static */
{
	defaults : {
		assetParams : new Mxui.Data({
			limit: 50
		}),
		activated : new Kekomi.Models.Asset.List
	},
	listensTo : ['activate', 'deactivate']
},
/** @Prototype */
{
	init : function(){
		var attrs = {
			order: ['name asc']
		};
		if(this.options.type){
			attrs.type = this.options.type
		}
		this.layout = 'list';
		this.element.html("//kekomi/file_browser/views/init.ejs", {
			type: this.options.type
		});
		this.setupGrid();
		this.find('.folders').kekomi_file_browser_folder_tree();
		this.find('.search input').mxui_form_input_watermark({
			defaultText: "Search",
			replaceOnFocus: true
		});
		this.find('.spinner').spin({
			lines: 10,
			length:6,
			width: 3, 
			radius: 7
		});
		this.options.assetParams.attrs(attrs);
		this.find('.dragged').kekomi_file_browser_dragged();
		this.find('.drag-drop-upload-area').kekomi_file_browser_drag_drop_upload({
			assetParams : this.options.assetParams
		});
		this.find('.preview').kekomi_file_browser_preview({
			activated: this.options.activated,
			assetParams: this.options.assetParams
		})
	},
	"{$.route} folder change" : function(route, ev, attr, how, newVal, oldVal){
		this.empty();
		if(how === "remove"){
			this.options.assetParams.removeAttr('folder_id');
		} else {
			this.options.assetParams.attrs({folder_id: newVal + "", offset: 0})
		}
	},
	".delete-selected.action click" : function(el, ev){
		if(confirm('Are you sure?')){
			if(this.options.activated.length > 0){
				for(var i = 0; i < this.options.activated.length; i++){
					this.options.activated[i].destroy();
				}
			}
		}
	},
	".asset .delete click" : function(el, ev){
		if(confirm('Are you sure?')){
			el.closest('.asset').model().destroy();
		}
	},
	".tag .remove click" : function(el, ev){
		if(confirm('Are you sure?')){
			el.closest('.asset').model().removeTag(el.closest('.tag').data('tag'));
		}
	},
	".type click" : function(el, ev){
		var type = el.data('type');
		if(type == this._type || (typeof this._type == "undefined" && type == "")) return;
		this.find('.types .selected').removeClass('selected');
		el.addClass('selected');
		if(type == "all"){
			this.options.assetParams.attrs({offset: 0, type: null});
		} else {
			this.options.assetParams.attrs({type: type, offset: 0});
		}
		this.find('.total .type').text(types[type]);
		this._type = type;
	},
	".search input change" : function(el, ev){
		this.search(el);
	},
	".search input keyup" : function(el, ev){
		var self = this;
		clearTimeout(this._searchTimeout);
		this._searchTimeout = setTimeout(function(){
			self.search(el)
		}, 200);
	},
	".search .clear-search click" : function(el, ev){
		this.find('.search input').val('').trigger('change').trigger('blur');
	},
	search: function(el){
		var val = el.val();
		if(val != ""){
			this.options.assetParams.attrs({key: val, offset: 0});
			this.find('.clear-search').show();
		} else {
			this.options.assetParams.attrs({offset: 0, key: null});
			this.find('.clear-search').hide();
		}
	},
	toggleSpinner: function(show){
		var loading = this.find('.spinner');
		if(show){
			loading.show().spin();
		} else {
			loading.hide().data('spinner').stop();
		}
	},
	empty : function(){
		this.find('.mxui_data_grid').mxui_data_grid('empty');
		this.find('.kekomi_file_browser_thumb_grid').kekomi_file_browser_thumb_grid('empty');
	},
	"{assetParams} updated.attr" : function(data, ev, attr, newVal, oldVal){
		if(attr == "order" || attr == "type" || attr == "key"){
			this.empty();
		}
		if(attr == "updating"){
			this.toggleSpinner(newVal);
			if(newVal){
				this.find('.no-data').hide();
			} else if(data.count == 0){
				this.find('.no-data').show();
			} else {
				this.markActive();
			}
		}
		if(attr == "count"){
			this.find('.no-data').toggle(newVal == 0);
			this.find('.total .count').text(newVal);
		}
	},
	"{Kekomi.Models.Asset} destroyed" : function(Asset, ev, asset){
		this.options.assetParams.attr('count', (this.options.assetParams.attr('count') - 1));
		this.options.activated.remove(asset.id);
	},
	"{Kekomi.Models.Asset} updated" : function(Asset, ev, asset){
		var folder_id = $.route.attr('folder');
		if(folder_id && asset.folder_id != folder_id){
			asset.elements(this.element).remove();
			this.options.assetParams.attr('count', (this.options.assetParams.attr('count') - 1));
			this.options.activated.remove(asset.id);
		}
	},
	'.layout click' : function(el, ev){
		if(el.hasClass('selected')) return;
		this.layout = el.data('layout');
		this.setupGrid();
		this.find('.layout-switch .selected').removeClass('selected');
		el.addClass('selected');
	},
	setupGrid : function(){
		var assetEls = this.find('.asset'),
				assets = assetEls.models(),
				scrollTo,
				scrollEl = this.layout == "list" ? '.thumb-grid' : '.scrollBody',
				scrollToEl = this.layout == "list" ? '.scrollBody' : '.thumb-grid',
				scrollTop = $(scrollEl).scrollTop();
		if(scrollTop > 0){
			for(var i = 0; i < assetEls.length; i++){ 
				var el = $(assetEls[i]);
				if(el.offset().top > 0){
					scrollTo = "." + el.model().identity();
					break;
				}
			}
		}
		if(this.layout == "list"){
			this.find('.display-area').html('<div class="grid-wrapper"></div>');
			this.find('.grid-wrapper').kekomi_file_browser_asset_grid({
				gridParams : this.options.assetParams
			});
			if(assets.length > 0){
				this.find('.mxui_data_grid').mxui_data_grid('list', true, assets);
			}
		} else if(this.layout == "grid"){
			this.find('.display-area').html('<div class="thumb-grid-wrapper"></div>');
			this.find('.thumb-grid-wrapper').kekomi_file_browser_thumb_grid({
				params: this.options.assetParams
			})
			if(assets.length > 0){
				this.find('.kekomi_file_browser_thumb_grid').kekomi_file_browser_thumb_grid('list', true, assets);
			}
		}
		this.markActive();
		if(scrollTo){
			$(scrollToEl).scrollTo(this.find(scrollTo));
		}
	},
	markActive : function(){
		if(this.options.activated.length > 0){
			setTimeout(this.proxy(function(){
				var elements    = this.options.activated.elements(this.element.find('.display-area')),
						models      = new Kekomi.Models.Asset.List(elements.models()),
						ids         = models.ids(),
						missingIds  = this.options.activated.missing(ids).ids();
				this.options.activated.remove.apply(this.options.activated, missingIds);
				elements.addClass('activated')
								.find('input[type=checkbox]').prop('checked', true);
			}), 1);
			
		}
	},
	".display-area activate" : function(el, ev, items){
		var target    = $(ev.target),
				activated = items || new Kekomi.Models.Asset.List([target.model()]);
		if(activated){
			this.options.activated.pushUnique(activated);
		}
	},
	".display-area deactivate" : function(el ,ev){
		var target = $(ev.target);
		if(target.is('.asset')){
			this.options.activated.remove(target.model().id);
		}
	},
	'.asset draginit' : function(el, ev, drag){
		if(!el.is('.activated')){
			this.find('.activated').trigger('deactivate');
			el.trigger('activate');
		}
		drag.representative(this.find('.dragged').kekomi_file_browser_dragged({
			assets: this.options.activated
		}), 10, 10);
		drag.scrolls(this.find('.folders'))
	},
	'.display-area dragenter' : function(el, ev){
		ev.preventDefault();
		ev.stopPropagation();
		ev.stopImmediatePropagation();
		this.find('.drag-drop-upload-area, .drag-drop-upload-notice').show();
		if(this.options.assetParams.count == 0){
			this.find('.no-data').hide();
		}
	},
	'.asset dblclick' : function(el, ev){
		this.element.trigger('selectFile', [[el.model()]]);
	},
	".select-file click" : function(el, ev){
		console.log(this.options.activated)
		this.element.trigger('selectFile', [this.options.activated]);
	},
})

});