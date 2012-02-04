steal(
'jquery/controller',
'jquery/view/ejs',
'mxui/layout/modal',
'steal/less'
).then( './views/init.ejs', './modal.less', function($){

/**
 * @class Widgets.Modal
 */
$.Controller('Widgets.Modal',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	setup : function(el, options){
		var modal = $($.View('//widgets/modal/views/init.ejs', options || {}));
		modal.find('.modal-content').html(el);
		this._super(modal, options);
	},
	init : function(){
		this.element.mxui_layout_modal({
			overlay: true,
			overlayClass : "widgets_modal-overlay"
		})
	},
	'.close click' : function(el, ev){
		this.element.trigger('hide');
	}
})

});