steal(
'jquery/controller',
'jquery/view/ejs',
'kekomi/vendor/hallo',
'jquery/dom/range',
'steal/less'
).then( './views/init.ejs', './rte.less', function($){

/**
 * @class Kekomi.Content.Widgets.Rte
 */
$.Controller('Kekomi.Content.Widgets.Rte',
/** @Static */
{
	defaults : {},
	listensTo : ['focusFromTop', 'focusFromBottom']
},
/** @Prototype */
{
	init : function(){
		this.element.html("//kekomi/content/widgets/rte/views/init.ejs",{
			message: "Hello World"
		});
		this.find('.editable').hallo({
			showAlways : true,
			floating: false,
			appendToolbarTo : this.find('.toolbar'),
			plugins: {
				'halloformat': {},
				'halloheadings': {},
				'hallolists': {}
			}
		})
		this.find('.hallotoolbar').css({
			position: 'static',
			width: 'auto'
		})
		this.bind(this.element.closest('.content-wrapper'), 'scroll', this.proxy('moveToolbar'));
		this.offset = this.element.offset().top;
	},
	moveToolbar : function(ev){
		if(this.find('.inEditMode').length > 0){
			clearTimeout(this._toolbarTimeout);
			var toolbar = this.find('.toolbar'),
					scroll  = this.element.closest('.content-wrapper').scrollTop(),
					offset  = scroll - this.offset,
					timeout = ev === true ? 1 : 250;

			offset = (offset < 0) ? 0 : offset;
			if(offset > 0){
				toolbar.hide();
			}
			if(offset < this.offset + this.element.height() - 140){
				this._toolbarTimeout = setTimeout(this.proxy(function(){
					var shouldAnimate = false;
					if(offset > 40){
						offset -= 40;
						shouldAnimate = true;
					}
					toolbar.css({
						display: 'block',
						position: 'absolute',
						top: (offset) + "px"
					});
					if(shouldAnimate){
						toolbar.animate({
							top: "+=40"
						}, 100)
					}
					offset = shouldAnimate ? offset + 40 : offset;
					toolbar.toggleClass('floating-toolbar', offset > 0);
				}), timeout)
			}
		}
	},
	".editable blur" : function(el, ev){
		this.find('.toolbar').hide();
		el.removeClass('inEditMode')
		delete this._selection;
	},
	".editable click" : function(){
		this._range = $.Range.current();
	},
	".editable keyup" : function(el, ev){
		if(this._range){
			var direction = { 38: 'up', 37: 'up', 39: 'down', 40: 'down' }[ev.which];
			if(direction === 'down'){
				if($.Range.current().compare('START_TO_END', this._range) === 0){
					this.element.trigger('moveDown', this.element);
				}
			} else if(direction === 'up'){
				if($.Range.current().compare('START_TO_END', this._range) === 0){
					this.element.trigger('moveUp', this.element);
					this.find('.editable').trigger('blur');
				}
			}
		}
		this._range = $.Range.current();
	},
	focusFromTop: function(){
		this.find('.editable').trigger('focus')
	},
	focusFromBottom : function(){
		this.find('.editable').trigger('focus', ['fromBottom'])
	},
	'.editable focus' : function(el, ev, direction){
		if(direction === 'fromBottom'){
			var range = el.range().collapse(false);
			console.log('RANGE:' , range)
			el.data('hallo').restoreSelection(range.range);
			ev.preventDefault();
		}
	},
	".editable halloactivated" : function(el, ev){
		setTimeout(this.proxy(function(){ this._range = $.Range.current(); }), 1);
		this.moveToolbar(true);
	}
})

});