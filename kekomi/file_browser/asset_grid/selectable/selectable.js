steal( 'jquery/controller','jquery/view/ejs', 'mxui/nav/selectable' )
	.then( function($){

/**
 * @class Kekomi.FileBrowser.AssetGrid.Selectable
 */
$.Controller('Kekomi.FileBrowser.AssetGrid.Selectable',
/** @Static */
{
	defaults : {
		
	},
	listensTo : ['activate', 'deactivate']
},
/** @Prototype */
{
	init : function(){
		this.element.mxui_nav_selectable({
			outsideDeactivate : false
		})
	},
	'.is-selected input click' : function(el, ev){
		ev.stopImmediatePropagation();
		ev.stopPropagation();
	},
	'.is-selected input change' : function(el, ev){
		var trigger = el.is(':checked') ? 'activate' : 'deactivate'
		el.closest('.asset').trigger(trigger);
	},
	activate : function(el, ev, assets){
		if(assets){
			assets.elements(this.element).find('input').prop('checked', true);
		}
	},
	deactivate : function(el, ev, assets){
		$('tr:not(.activated) .is-selected input').prop('checked', false);
	}
})

});