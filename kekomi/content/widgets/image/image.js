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
		modal : modal
	}
},
/** @Prototype */
{
	init : function(){
		var d = new Date();
		this._id = "image-widget-" + d.getTime();
		this.content_image = new Kekomi.Models.ContentImage;
		this.element.html("//kekomi/content/widgets/image/views/init.ejs",{});
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
	'.remove-image click' : function(el, ev){
		this.content_image.removeAttr('filename');
		this.content_image.removeAttr('asset_id');
		this.content_image.removeAttr('caption');
		this.find('.image-wrapper').html('//kekomi/content/widgets/image/views/no_image.ejs', {});
	},
	"{modal} selectImage" : function(el, ev, image){
		if(this.Class.currentId === this._id){
			this.setImage(image);
			this.options.modal.trigger('hide');
		}
	},
	setImage : function(image){
		this.content_image.attrs({
			filename: image.filename,
			asset_id: image.id
		});
		this.content_image.updated();
	},
	"{Kekomi.Models.ContentImage} updated" : function(ContentImage, ev, content_image){
		if(content_image === this.content_image){
			this.find('.image-wrapper').html('//kekomi/content/widgets/image/views/image.ejs', content_image);
		}
	}
})

});