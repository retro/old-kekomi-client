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
		ev.stopPropagation();
		ev.preventDefault();
		this.element.hide();
		this.element.siblings('.drag-drop-upload-notice').hide();
		if(this.options.assetParams.count == 0){
			this.element.siblings('.no-data').show();
		}
		var files = ev.target.files || ev.dataTransfer.files;
	}
})

});