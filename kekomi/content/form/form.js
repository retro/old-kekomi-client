steal(
'jquery/controller',
'jquery/view/ejs',
'kekomi/content/widgets/image',
'kekomi/content/widgets/rte',
'kekomi/content/widgets/code',
'kekomi/content/widgets/file_attachments',
'kekomi/content/widgets/image_gallery',
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
			var editable = $(editables[index - 1]);
			editable.trigger('focusFromBottom');
			this.scrollTo(editable, 'bottom');
		}
	},
	moveDown : function(el, ev, currentEl){
		var editables = this.find('.kekomi_content_widgets_code, .kekomi_content_widgets_rte'),
				index = editables.index(currentEl);
		if(index < editables.length - 1){
			var editable = $(editables[index + 1]);
			editable.trigger('focusFromTop');
			this.scrollTo(editable);
		}
	},
	scrollTo : function(el, position){
		var scrollPos = el.offset().top,
				curScroll = $('.content-wrapper').scrollTop();
		if(position === 'bottom') scrollPos += el.outerHeight() - 200;
		$('.content-wrapper').scrollTop(curScroll + scrollPos);
	}
})

});