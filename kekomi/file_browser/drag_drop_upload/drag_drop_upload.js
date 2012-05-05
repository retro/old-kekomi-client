steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Kekomi.FileBrowser.DragDropUpload
 */
$.Controller('Kekomi.FileBrowser.DragDropUpload',
/** @Static */
{
	defaults : {},
	listensTo: ['dragenter', 'dragleave', 'drop', 'dragover']
},
/** @Prototype */
{
	"dragleave" : function(el, ev){
		ev.stopPropagation();
		ev.preventDefault();
		this.element.hide();
		this.element.siblings('.drag-drop-upload-notice').hide();
	},
	"drop" : function(el, ev){
		var files, self = this;
		ev.stopPropagation();
		ev.preventDefault();
		this.element.hide();
		this.element.siblings('.drag-drop-upload-notice').hide();
		if(this.options.assetParams.count == 0){
			this.element.siblings('.no-data').show();
		}
		if(ev.originalEvent.dataTransfer){
			files = ev.originalEvent.dataTransfer.files
		} else if(ev.originalEvent.target){
			files = ev.originalEvent.target.files
		}
		for(var i = 0; i < files.length; i++){
			var reader = new FileReader();
			reader.onload = (function(file){
				return function(e){
					self.upload(file.name, e.target.result)
				}
			})(files[i]);
			reader.readAsDataURL(files[i]);
		}
	},
	upload : function(filename, contents){
		var upload = new Kekomi.Models.Asset({
			filename: filename,
			upload  : contents
		})
		upload.save();
	}
})

});