steal( 'jquery/controller','jquery/view/ejs', "steal/less" )
	.then("./autogrow.less", function($){

/**
 * @class Widgets.Autogrow
 */
$.Controller('Widgets.Autogrow',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.prepend('<div class="grower"></div>');
		this.updateDiv(this.find("textarea").val());
	},
	"textarea keyup" : function(el, ev){
		this.updateDiv(el.val());
	},
	"textarea keydown" : function(el, ev){
		var val = el.val();
		if(ev.which === 13) val += "\n";
		this.updateDiv(val);
	},
	"textarea change" : function(el, ev){
		this.updateDiv(el.val());
	},
	updateDiv : function(val){
		var text         = val.replace(/\n/g, '<br/>'),
		    grower       = this.find(".grower");
		grower.html(text + "&nbsp;");
		this.find('textarea').height(grower.height());
	}
})

});