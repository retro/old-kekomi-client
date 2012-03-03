steal(
	'jquery/controller',
	'jquery/view/ejs',
	'kekomi/models/block.js'
).then( './views/init.ejs', function($){

/**
 * @class Kekomi.Content.Form.BlockWidget
 */
$.Controller('Kekomi.Content.Form.BlockWidget',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		Kekomi.Models.Block.findAll({type: this.options.widget}, this.proxy('render'));
	},
	render : function(widgets){
		var widget = widgets[0];
		this.element.html("//kekomi/content/form/block_widget/views/init.ejs",{
			widget : widget
		});
	}
})

});