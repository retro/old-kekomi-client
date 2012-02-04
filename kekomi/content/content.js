steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Kekomi.Content
 */
$.Controller('Kekomi.Content',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//kekomi/content/views/init.ejs",{
			message: "Hello World"
		});
	}
})

});