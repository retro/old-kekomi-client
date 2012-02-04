steal( 'jquery/controller','jquery/view/ejs', 'jquery/event/key', 'widgets/autogrow' )
	.then(function($){

/**
 * @class Widgets.InlineEdit
 */
$.Controller('Widgets.InlineEdit',
/** @Static */
{
	defaults : {
		activate  : "click",
		emptyText : "Click to edit",
		autoSave  : true
	},
	pluginName : 'inline_edit'
},
/** @Prototype */
{
	init : function(){
		this._wasEdited = false;
		this._isSaving  = false;
		this.render();
	},
	// don't render editor if user clicks on the link
	"a click" : function(el, ev){
		ev.stopImmediatePropagation();
		ev.stopPropagation();
	},
	"input[type=text] keyup" : function(el, ev){
		if(ev.keyName() == 'escape' || ev.which == 13){
			el.blur();
		}
	},
	"input[type=text] click" : function(el, ev){
		ev.stopPropagation();
		ev.stopImmediatePropagation();
	},
	"input[type=text] blur" : function(el, ev){
		this.updateValue();
	},
	"input[type=text] change" : function(el){
		this._wasEdited = true;
		this.options.model.attr(this.options.attr, el.val());
	},
	"textarea click" : function(el, ev){
		ev.stopPropagation();
		ev.stopImmediatePropagation();
	},
	"textarea blur" : function(el, ev){
		this.updateValue(el.val());
	},
	"textarea change" : function(el){
		this._wasEdited = true;
		this.options.model.attr(this.options.attr, el.val());
	},
	"{activate}" : function(el, ev){
		ev.stopPropagation();
		ev.stopImmediatePropagation();
		if(this.element.find('input, textarea').length == 0) {
			this.element.html(this.inputTemplate(), {
				model: this.options.model, 
				value: this.options.model.attr(this.options.attr), 
				attr: this.options.attr,
				options: this.options
			}).addClass('editing');
			this.find('input, textarea').focus();
		}
	},
	updateValue : function(){
		if(this._wasEdited && !this._isSaving){
			var val  = this.find('input, textarea').val(),
			    self = this;
			this._isSaving = true;
			if(this.options.autoSave === true){
				this.options.model.save(function(){
					self._wasEdited = false;
					self._isSaving = false;
				});
			} else {
				this._wasEdited = false;
				this._isSaving = false;
			}
			
		} 
		if(!this._wasEdited) this.element.trigger('noChange', this.options.model);
		
		this.render();
	},
	render : function(){
		var value   = this.options.model.attr(this.options.attr),
		    isEmpty = (!!!value || value == "null");
		if(this.element){
			if(isEmpty){
				this.element.html(this.emptyTemplate(), {
					model: this.options.model,
					empty: this.options.emptyText
				}).removeClass('editing');
			} else {
				this.element.html(this.rendererTemplate(), {
					model: this.options.model,
					value: value,
					attr: this.options.attr
				}).removeClass('editing');
			}
		}
	},
	emptyTemplate : function(){
		if(this.options.empty) return this.options.empty;
		return "//widgets/inline_edit/views/empty/string.ejs";
	},
	rendererTemplate : function(){
		if(this.options.renderer) return this.options.renderer;
		return "//widgets/inline_edit/views/renderers/string.ejs";
	},
	inputTemplate : function(){
		if(this.options.input) return this.options.input;
		if(this.options.model.Class.attributes[this.options.attr] == 'text'){
			return "//widgets/inline_edit/views/inputs/textarea.ejs";
		}
		return "//widgets/inline_edit/views/inputs/string.ejs";
	},
	wasEdited : function(){
		return this._wasEdited;
	}
})

});