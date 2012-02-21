steal(
'jquery/controller',
'jquery/view/ejs',
'widgets/modal',
'kekomi/file_browser',
'kekomi/models/content_image.js',
'steal/less',
'widgets/inline_edit'
)
	.then( './views/init.ejs', './image.less', function($){

var modal = $('<div class="file-browser-modal"></div>');

/**
 * @class Kekomi.Content.Widgets.Image
 */
$.Controller('Kekomi.Content.Widgets.Image',
/** @Static */
{
	defaults : {
		modal : modal,
		image : null,
		remove: null
	}
},
/** @Prototype */
{
	init : function(){
		var d = new Date();
		this._id = "image-widget-" + d.getTime();
		this.content_image = new Kekomi.Models.ContentImage;
		this.element.html("//kekomi/content/widgets/image/views/init.ejs",{
			image : this.options.image
		});
	},
	".change-image click" : function(el, ev){
		this.Class.currentId = this._id;
		this.options.modal.widgets_modal({
			title: 'File browser'
		}).show();
		this.options.modal.kekomi_file_browser({
			type: 'image'
		}).trigger('resize');
	},
	'.remove click' : function(el, ev){
		if($.isFunction(this.options.remove)){
			this.options.remove.apply(this);
		} else {
			this.element.html('//kekomi/content/widgets/image/views/no_image.ejs', {});
		}
	},
	"{modal} selectFile" : function(el, ev, images){
		if(this.Class.currentId === this._id){
			console.log(images, images[0])
			this.setImage(images[0]);
			this.options.modal.trigger('hide');
		}
	},
	setImage : function(image){
		this.content_image.updateFromFile(image);
		this.content_image.updated();
	},
	"{Kekomi.Models.ContentImage} updated" : function(ContentImage, ev, content_image){
		if(content_image === this.content_image){
			this.element.html('//kekomi/content/widgets/image/views/image.ejs', content_image);
		}
	}
})

});