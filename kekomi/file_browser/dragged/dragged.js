steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Kekomi.FileBrowser.Dragged
 */
$.Controller('Kekomi.FileBrowser.Dragged',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	update : function(){
		this._super.apply(this, arguments);
		this.element.data('assets', this.options.assets);
		var filename = (this.options.assets.length === 1)
									 ? this.options.assets[0].name.split('.')[0]
									 : this.options.assets.length,
				image = $('<img/>');

		filename = (filename.length > 9) ? filename.substr(0,9) : filename;
		if(this.options.assets.length === 1){
			switch(this.options.assets[0].type){
			case "image":
				image.attr('src', this.options.assets[0].filename);
				break;
			case "video":
				image
					.attr('src', steal.root.join("kekomi/style/images/cc/black/png/movie_icon&32.png"))
					.addClass('icon');
				break;
			case "document":
				image
					.attr('src', steal.root.join("kekomi/style/images/cc/black/png/doc_lines_icon&32.png"))
					.addClass('icon');
				break;
			}
		} else {
			image
				.attr('src', steal.root.join("kekomi/style/images/cc/black/png/clipboard_copy_icon&32.png"))
				.addClass('icon');
		}
		this.element.html("//kekomi/file_browser/dragged/views/init.ejs",{
			filename: filename
		});
		this.find('.img').html(image);
	}
})

});