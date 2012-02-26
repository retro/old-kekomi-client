steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Kekomi.Content.Form.ComposedWidget
 */
$.Controller('Kekomi.Content.Form.ComposedWidget',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//kekomi/content/form/composed_widget/views/init.ejs",{
			message: "Hello World"
		});
	}
})

});