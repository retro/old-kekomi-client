steal( 'jquery/controller','jquery/view/ejs', 'steal/less' )
	.then( './views/item.ejs', './preview.less', function($){

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
	"{activated} add" : function(activated, ev, newItems){
		for(var i = 0; i < newItems.length; i++){
			this.element.append("//kekomi/file_browser/preview/views/item.ejs", newItems[i]);
		}
	},
	"{activated} remove" : function(activated, ev, removedItems){
		for(var i = 0; i < removedItems.length; i++){
			removedItems[i].elements(this.element).remove();
		}
	},
	"{activated} update" : function(activated, ev, updatedItems){
		for(var i = 0; i < updatedItems.length; i++){
			updatedItems
				.elements(this.element)
				.replaceWith("//kekomi/file_browser/preview/views/item.ejs", updatedItems[i]);
		}
	}
})

});