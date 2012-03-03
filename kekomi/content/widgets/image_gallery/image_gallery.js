steal(
'jquery/controller',
'jquery/view/ejs',
'kekomi/vendor/guid.js',
'steal/less',
'widgets/modal',
'mxui/layout/sortable',
'kekomi/models/content_image.js',
'kekomi/content/widgets/image',
'kekomi/vendor/jqueryui'
).then( './views/init.ejs', './image_gallery.less', function($){


var modal = $('<div class="file-browser-modal"></div>'),
		removeImage = function(){
			this.element.remove();
		}

var file = {content_type: "image/jpeg",
filename: "http://localhost/kekomi/kekomi/placeholders/image2.jpg",
id: 137,
name: "asset_137.jpg",
size: 90816,
type: "image"};

/**
 * @class Kekomi.Content.Widgets.ImageGallery
 */
$.Controller('Kekomi.Content.Widgets.ImageGallery',
/** @Static */
{
	defaults : {
		modal: modal
	}
},
/** @Prototype */
{
	init : function(){
		this._id = "image-gallery-" + guid();
		this.element.html("//kekomi/content/widgets/image_gallery/views/init.ejs",{}).addClass('collapsed');
		this.find('.files').sortable({
			tolerance: 'pointer'
		})
		for(var i = 0; i < 5; i++){
			this.addFile(file);
		}
	},
	".add-file click" : function(el, ev){
		this.Class.currentId = this._id;
		this.options.modal.widgets_modal({
			title: 'File browser'
		}).show();
		this.options.modal.kekomi_file_browser({
			type: 'image'
		}).trigger('resize');
	},
	".collapse click" : function(el, ev){
		this.element.addClass('collapsed');
	},
	".expand click" : function(el, ev){
		this.element.removeClass('collapsed');
	},
	'.remove click' : function(el, ev){
		if(this.find('.kekomi_content_widgets_image').length == 0){
			this.find('.files').hide();
		}
		
	},
	'.files sortstart' : function(el, ev, ui){
		ui.item.addClass('dragged')
	},
	'.files sortstop' : function(el, ev, ui){
		ui.item.removeClass('dragged')
	},
	"{modal} selectFile" : function(el, ev, files){
		if(this.Class.currentId === this._id){
			$.each(files, this.proxy(function(i, file){
				this.addFile(file);
			}));
			this.options.modal.trigger('hide');
		}
	},
	addFile : function(file){
		var contentImage = Kekomi.Models.ContentImage.newFromFile(file);
		this.find('.files').append("//kekomi/content/widgets/image_gallery/views/image.ejs", {
			image: contentImage,
			remove: removeImage
		}).show();
	}
})

});