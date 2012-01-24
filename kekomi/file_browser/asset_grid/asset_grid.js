steal(
'jquery/controller',
'jquery/view/ejs',
'steal/less',
'mxui/data/grid',
'kekomi/file_browser/asset_grid/selectable'
)
	.then( './views/row.ejs', './asset_grid.less', function($){

/**
 * @class Kekomi.FileBrowser.AssetGrid
 */
$.Controller('Kekomi.FileBrowser.AssetGrid',
/** @Static */
{
	defaults : {
		
	}
},
/** @Prototype */
{
	init : function(){
		this.element.mxui_data_grid({
			model: Kekomi.Models.Asset,
			row: "//kekomi/file_browser/asset_grid/views/row.ejs",
			columns: {
				selected   : "",
				type       : "Type",
				name       : "Name",
				size       : "Size",
				created_at : "Created at",
				actions    : ""
			},
			offsetEmpties : false,
			params : this.options.gridParams,
			canUnsort: false,
			multiSort: false,
			loadImmediate: false,
			selectable: false
		})
		this.find('.scrollBody tbody').kekomi_file_browser_asset_grid_selectable();
		this.bind(this.find('.scrollBody'), 'scroll', 'foreverScroll');
	},
	foreverScroll : function(el, ev){
		if(el[0].scrollHeight - (el[0].clientHeight + el.scrollTop()) < 100){
			if(this.options.gridParams.canMoveNext() && !this.options.gridParams.attr('updating')){
				this.options.gridParams.next();
			}
		}
	},
})

});