steal(
'jquery/controller',
'jquery/view/ejs',
'kekomi/vendor/hallo',
'jquery/dom/range',
'steal/less',
'kekomi/vendor/guid.js',
'kekomi/vendor/sanitize.js'
).then( './views/init.ejs', './rte.less', function($){

	var sanitizeConfig = {
		elements: [
			'a', 'b', 'blockquote', 'br', 'caption', 'cite', 'code', 'col',
			'colgroup', 'dd', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
			'i', 'li', 'ol', 'p', 'pre', 'q', 'small', 'strike', 'strong',
			'sub', 'sup', 'u', 'span', 'ul'],

		attributes: {
			'a' : ['href', 'title'],
			'blockquote': ['cite'],
			'col' : ['span', 'width'],
			'colgroup' : ['span', 'width'],
			'img' : ['align', 'alt', 'height', 'src', 'title', 'width'],
			'ol' : ['start', 'type'],
			'q' : ['cite'],
			'table' : ['summary', 'width'],
			'td' : ['abbr', 'axis', 'colspan', 'rowspan', 'width'],
			'th' : ['abbr', 'axis', 'colspan', 'rowspan', 'scope',
											 'width'],
			'ul' : ['type']
		},

		protocols: {
			'a' : {'href': ['ftp', 'http', 'https', 'mailto',
																	Sanitize.RELATIVE]},
			'blockquote': {'cite': ['http', 'https', Sanitize.RELATIVE]},
			'img' : {'src' : ['http', 'https', Sanitize.RELATIVE]},
			'q' : {'cite': ['http', 'https', Sanitize.RELATIVE]}
		}
	};

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
		this._id =  'rte-' + guid();
		this.element.attr('id', this._id);
		this.element.html("//kekomi/content/widgets/rte/views/init.ejs",{
			message: "Hello World"
		});
		this.find('.editable').hallo({
			showAlways : true,
			floating: false,
			appendToolbarTo : this.find('.hallo-toolbar'),
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
	},
	moveToolbar : function(ev){
		if(this.find('.inEditMode').length > 0){
			if(this.element.offset().top + this.element.outerHeight() < 80){
				this.find('.hallo-toolbar').hide()
			} else {
				if(this.element.offset().top > 0){
					this.find('.hallo-toolbar').show().css({
						position: 'absolute',
						left : 0
					});
				} else {
					this.find('.hallo-toolbar').show().css({
						position: 'fixed',
						left : this.element.offset().left + 'px'
					})
				}
			}
		}
	},
	'.hallo-toolbar mousedown' : function(el, ev){
		this._clickedToolbar = true;
	},
	'.hallo-toolbar mouseup' : function(el, ev){
		var self = this;
		setTimeout(function(){ 
			console.log('cb')
			self._clickedToolbar = false;
			self.find('.editable').trigger('focus');
		}, 1);
	},
	".editable blur" : function(el, ev){
		if(!this._clickedToolbar){
			this.find('.hallo-toolbar').hide();
			el.removeClass('inEditMode')
			delete this._selection;
			this.find('.editable').animate({
				'padding-top' : '15px'
			}, 200);
		}
		clearTimeout(this._sanitize);
		this._sanitize = setTimeout(this.proxy('sanitize'), 1);
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
	".editable paste" : function(){
		clearTimeout(this._sanitize);
		this._sanitize = setTimeout(this.proxy('sanitize'), 1);
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
			el.data('hallo').restoreSelection(range.range);
			//ev.preventDefault();
		}
	},
	".editable halloactivated" : function(el, ev){
		setTimeout(this.proxy(function(){ this._range = $.Range.current(); }), 1);
		setTimeout(this.proxy(function(){ this.moveToolbar() }), 1);
		this.find('.editable').animate({
			'padding-top' : '35px'
		}, 200)
	},
	/* This code cleans up the HTML on paste and change. 
	 * It also makes sure that there are no root level text nodes or inline elements.
	 * It loops through all root nodes and puts them in the <p> element if 
	 * they are inline or text */
	sanitize : function(){
		var s           = new Sanitize(sanitizeConfig),
				html        = this.find('.editable')[0],
				sanitized   = s.clean_node(html),
				children    = sanitized.childNodes,
				docFragment = document.createDocumentFragment(),
				blockEls    = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'pre'],
				container;

		for(var i = 0; i < children.length; i++){
			if(false || children[i].nodeType === 3 || $.inArray(children[i].nodeName.toLowerCase(), blockEls) == -1){
				if(!container){
					container = document.createElement('p');
				}
				container.appendChild(children[i].cloneNode(true))
			} else {
				if(container){
					docFragment.appendChild(container)
					container = null;
				}
				docFragment.appendChild(children[i].cloneNode(true))
			}
		}
		if(container){
			docFragment.appendChild(container)
		}
		this.find('.editable').html(docFragment);
	}
})

});