steal(
'jquery/controller',
'jquery/view/ejs',
'kekomi/vendor/guid.js',
'kekomi/models/content_file.js',
'widgets/inline_edit',
'kekomi/vendor/bytes_to_size.js',
'steal/less',
'widgets/modal',
'kekomi/vendor/jqueryui'
).then('./views/init.ejs', './file_attachments.less', function($){

var modal = $('<div class="file-browser-modal"></div>');

/**
 * @class Kekomi.Content.Widgets.FileAttachments
 */
$.Controller('Kekomi.Content.Widgets.FileAttachments',
/** @Static */
{
	defaults : {
		modal: modal
	}
},
/** @Prototype */
{
	init : function(){
		this._id = "file-attachments-" + guid();
		this.element.html("//kekomi/content/widgets/file_attachments/views/init.ejs",{});
		for(var i = 0; i < 5; i++){
			this.addFile({
				content_type: "video/x-flv",
				filename: "http://localhost/kekomi/kekomi/placeholders/video.flv",
				folder_id: 15,
				id: 100,
				name: "asset_"+i+".avi",
				size: 54693,
				type: "video"
			})
		}
		this.find('.files').sortable({
			tolerance: 'pointer'
		});
	},
	".add-file click" : function(el, ev){
		this.Class.currentId = this._id;
		this.options.modal.widgets_modal({
			title: 'File browser'
		}).show();
		this.options.modal.kekomi_file_browser().trigger('resize');
	},
	'.files sortstart' : function(el, ev, ui){
		ui.item.addClass('dragged')
	},
	'.files sortstop' : function(el, ev, ui){
		ui.item.removeClass('dragged')
	},
	'.remove click' : function(el, ev){
		el.closest('.file').remove();
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
		var contentFile = Kekomi.Models.ContentFile.newFromFile(file);
		this.find('.files').append("//kekomi/content/widgets/file_attachments/views/file.ejs", contentFile);
	}
})

});