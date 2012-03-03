steal(
	'jquery/controller',
	'jquery/view/ejs',
	'kekomi/vendor/jqueryui',
	'steal/less',
	'mxui/layout/positionable'
).then('./composed_widget.less', './views/widget.ejs', function($){

/**
 * @class Kekomi.Content.Form.ComposedWidget
 */
$.Controller('Kekomi.Content.Form.ComposedWidget',
/** @Static */
{
	defaults : {},
	listensTo : ['sortstart', 'sortstop']
},
/** @Prototype */
{
	init : function(){
		this.element.html("//kekomi/content/form/composed_widget/views/widgets.ejs", this.options.field)
		this.element.sortable({
			handle: '.label'
		});
		this.options.popover = this.find('.widgets-popover').mxui_layout_positionable({
			my : "top",
			at : "bottom"
		});
		this.update();
	},
	sortstart : function(el, ev, ui){
		ui.item.addClass('dragged');
	},
	sortstop : function(el, ev, ui){
		ui.item.removeClass('dragged');
	},
	'.remove-field click' : function(el, ev){
		el.closest('.content-row').remove();
	},
	'.move-up click' : function(el, ev){
		var block = el.closest('.content-row'),
				blocks = this.find('.content-row'),
				index = blocks.index(block);
		if(index > 0){
			//block.detach();
			$(blocks[index - 1]).before(block);
		}
	},
	'.move-down click' : function(el, ev){
		var block = el.closest('.content-row'),
				blocks = this.find('.content-row'),
				index = blocks.index(block);
		if(index < blocks.length - 1){
			/*var beforeEl = $(blocks[index + 1]);
			console.log(beforeEl)
			block.detach();*/
			$(blocks[index + 1]).after(block);
		}
	},
	'.open-widgets-popover click' : function(el, ev){
		ev.stopPropagation();
		this.options.popover.trigger('move', [el]).show();
		this._addAfter = el.closest('.content-row');
	},
	"{popover} .add-widget click" : function(el, ev){
		var widget = $.View("//kekomi/content/form/composed_widget/views/widget.ejs", {
			label : el.find('span').text(),
			type  : el.data('widget')
		});
		if(this._addAfter.length > 0){
			this._addAfter.closest('.content-row').after(widget);
		} else {
			this.element.append(widget);
		}
			
	},
	"{document} click" : function(){
		this.options.popover.hide();
	}
})

});