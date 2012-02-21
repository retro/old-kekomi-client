steal(
'jquery/controller',
'jquery/view/ejs',
'steal/less',
'kekomi/models/asset.js',
'kekomi/file_browser/dragged',
'widgets/inline_edit',
'kekomi/vendor/bytes_to_size.js'
)
	.then( './views/asset.ejs', './preview.less', function($){

var types = {
	document: "Document",
	image: "Image",
	video: "Video"
};

/**
 * @class Kekomi.FileBrowser.Preview
 */
$.Controller('Kekomi.FileBrowser.Preview',
/** @Static */
{
	defaults : {
		activated: []
	}
},
/** @Prototype */
{
	init : function(){
		this.renderPreview();
	},
	"{activated} add" : function(activated, ev, newItems){
		this.renderPreview();
	},
	"{activated} remove" : function(activated, ev, removedItems){
		var list = new Kekomi.Models.Asset.List(removedItems)
		list.elements(this.element).remove();
		this.renderPreview();
	},
	"{activated} update" : function(activated, ev, updatedItems){
		for(var i = 0; i < updatedItems.length; i++){
			updatedItems
				.elements(this.element)
				.replaceWith("//kekomi/file_browser/preview/views/asset.ejs", {
					asset: updatedItems[i],
					types: types
				});
		}
	},
	'.asset draginit' : function(el, ev, drag){
		drag.representative(this.element.siblings('.dragged').kekomi_file_browser_dragged({
			assets: new Kekomi.Models.Asset.List([el.model()])
		}), 10, 10);
	},
	"{assetParams} updated.attr" : function(data, ev, attr, newVal, oldVal){
		if(attr == "updating"){
			if(newVal === true){
				if(this.find('.no-selection').length == 0){
					this.element.html('//kekomi/file_browser/preview/views/empty.ejs', {});
				}
			} else {
				setTimeout(this.proxy(function(){
					this.renderPreview();
				}), 5)
			}
		}
	},
	renderPreview : function(){
		if(this.options.activated.length == 1){
			this.element.html("//kekomi/file_browser/preview/views/asset.ejs", {
				asset: this.options.activated[0],
				types: types
			});
		} else if(this.options.activated.length > 1){
			this.element.html('//kekomi/file_browser/preview/views/multiple.ejs', {});
		} else {
			this.element.html('//kekomi/file_browser/preview/views/no_selection.ejs', {});
		}
	}
})

});