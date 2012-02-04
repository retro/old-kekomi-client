steal(
'jquery/controller',
'jquery/view/ejs',
'kekomi/content/widgets/image',
'kekomi/content/widgets/rte',
'kekomi/content/widgets/code',
'kekomi/style',
'steal/less')
	.then( './views/init.ejs', './form.less', function($){

/**
 * @class Kekomi.Content.Form
 */
$.Controller('Kekomi.Content.Form',
/** @Static */
{
	defaults : {},
	listensTo : ['moveUp', 'moveDown']
},
/** @Prototype */
{
	init : function(){
		this.element.html("//kekomi/content/form/views/init.ejs",{});
		this.find('.editable:nth-child(2)').hallo('activate')
	},
	moveUp : function(el, ev, currentEl){
		var editables = this.find('.kekomi_content_widgets_code, .kekomi_content_widgets_rte'),
				index = editables.index(currentEl);
		if(index >= 0){
			$(editables[index - 1]).trigger('focusFromBottom');
		}
	},
	moveDown : function(el, ev, currentEl){
		var editables = this.find('.kekomi_content_widgets_code, .kekomi_content_widgets_rte'),
				index = editables.index(currentEl);
		if(index < editables.length - 1){
			$(editables[index + 1]).trigger('focusFromTop');
		}
	}
})

});