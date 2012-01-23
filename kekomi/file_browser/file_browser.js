steal(
'jquery/controller',
'jquery/view/ejs',
'steal/less',
'kekomi/models/asset.js',
'kekomi/models/asset_folder.js',
'kekomi/fixtures',
'kekomi/vendor/spin',
'kekomi/vendor/bytes_to_size.js',
'mxui/data/grid',
'kekomi/style',
'kekomi/file_browser/folder_tree',
'kekomi/file_browser/asset_grid',
'kekomi/file_browser/thumb_grid',
'jquery/dom/route',
'mxui/form/input_watermark'
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
		display: "list",
		assetParams : new Mxui.Data({
			limit: 100
		})
	},
	listensTo : ['activate', 'deactivate']
},
/** @Prototype */
{
	init : function(){
		this.element.html("//kekomi/file_browser/views/init.ejs", {});
		this.find('.folders ul').kekomi_file_browser_folder_tree();
		this.find('.grid-wrapper').kekomi_file_browser_asset_grid({
			gridParams : this.options.assetParams
		});
		this.find('.thumb-grid-wrapper').kekomi_file_browser_thumb_grid({
			params: this.options.assetParams
		})
		this.find('.search input').mxui_form_input_watermark({
			defaultText: "Search",
			replaceOnFocus: true
		});
		this.bind(this.find('.scrollBody'), 'scroll',  'foreverScroll');
		this.bind(this.find('.thumb-grid'), 'scroll',  'foreverScroll');
		this.find('.spinner').spin({
			lines: 10,
			length:6,
			width: 3, 
			radius: 7
		});
		this.options.assetParams.attr('order', ['name asc']);
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
		var models = this.find('.activated').models();
		if(models.length > 0){
			for(var i = 0; i < models.length; i++){
				models[i].destroy();
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
			this.options.assetParams.attr('updating', true);
			this.options.assetParams.removeAttr('type');
			this.options.assetParams.attrs({offset: 0, updating: false});
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
		this.search(el)
	},
	".search .clear-search click" : function(el, ev){
		this.find('.search input').val('').trigger('change').trigger('blur');
	},
	search: function(el){
		var val = el.val();
		this.empty();
		if(val != ""){
			this.options.assetParams.attrs({key: val, offset: 0});
			this.find('.clear-search').show();
		} else {
			this.options.assetParams.attr('updating', true)
			this.options.assetParams.removeAttr('key');
			this.options.assetParams.attrs({offset: 0, updating: false});
			this.find('.clear-search').hide();
		}
	},
	foreverScroll : function(el, ev){
		console.log('scroll')
		if(el[0].scrollHeight - (el[0].clientHeight + el.scrollTop()) < 100){
			if(this.options.assetParams.canMoveNext() && !this.options.assetParams.attr('updating')){
				this.options.assetParams.next();
			}
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
		if(attr == "order" || attr == "type"){
			this.empty()
		}
		if(attr == "updating"){
			this.toggleSpinner(newVal);
			if(newVal){
				this.find('.no-data').hide();
			} else if(data.count == 0){
				this.find('.no-data').show();
			}
		}
		if(attr == "count"){
			this.find('.no-data').toggle(newVal == 0);
			this.find('.total .count').text(newVal);
		}
	},
	"{Kekomi.Models.Asset} destroyed" : function(Asset, ev, asset){
		var count = this.options.assetParams.attr('count') - 1;
		this.options.assetParams.attr('count', count);
	},
	'.layout click' : function(el, ev){
		if(el.hasClass('selected')) return;
		if(el.data('layout') == 'list'){
			this.find('.kekomi_file_browser_asset_grid').show().trigger('resize');
			this.find('.kekomi_file_browser_thumb_grid').hide();
		} else {
			this.find('.kekomi_file_browser_thumb_grid').show().trigger('resize');
			this.find('.kekomi_file_browser_asset_grid').hide();
		}
		this.find('.layout-switch .selected').removeClass('selected');
		el.addClass('selected');
	}
})

});