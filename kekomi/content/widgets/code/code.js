steal(
'jquery/controller',
'jquery/view/ejs',
'kekomi/vendor/ace/src/ace.js',
function(){},
'kekomi/vendor/ace/src/theme-clouds.js',
'kekomi/vendor/guid.js'
).then( './views/init.ejs', function($){

/**
 * @class Kekomi.Content.Widgets.Code
 */
$.Controller('Kekomi.Content.Widgets.Code',
/** @Static */
{
	defaults : {},
	listensTo : ['focusFromTop', 'focusFromBottom']
},
/** @Prototype */
{
	init : function(){
		var id = "editor-" + guid();
		this.element.attr('id', id);
		this.editor = ace.edit(id);
		this.session = this.editor.getSession();
		this.session.setUseWrapMode(true);
		this.session.setWrapLimitRange(80, 80); // ammount of characters that fit in the box
		this.editor.setTheme("ace/theme/clouds");
		this.editor.renderer.setShowGutter(false);
		this.editor.renderer.setHScrollBarAlwaysVisible(false);
		this.editor.renderer.setShowPrintMargin(false)
		this.editor.setHighlightActiveLine(false);
		this.session.on('change', this.proxy('aceChange'));
		this.editor.on('focus', this.proxy('focus'));
	},
	aceChange : function(ev){
		var lines = this.session.getValue().split("\n"),
				length = lines.length;
		for(var i = 0; i < lines.length; i++){
			if(lines[i].length > 77){
				length += parseInt(Math.ceil(lines[i].length / 77) - 1);
			}
		}
		var height = length * 12 + 12,
		height = height < 48 ? 48 : height;
		this.element.css('height', height + "px");
		this.editor.resize();
	},
	keyup : function(el, ev){
		var direction = { 38: 'up', 37: 'up', 39: 'down', 40: 'down' }[ev.which],
				cursor    = this.session.selection.getCursor();
		if(direction === 'up' && cursor.column == this._lastCursor.column && cursor.row == this._lastCursor.row && cursor.column === 0 && cursor.row === 0){
			this.element.trigger('moveUp', this.element);
		} else if(direction === 'down' && cursor.column == this._lastCursor.column && cursor.row == this._lastCursor.row){
			var lines    = this.session.getValue().split("\n"),
					cursor   = this.session.selection.getCursor(),
					lastLine = lines[lines.length - 1];
			if(cursor.column === lastLine.length && cursor.row === lines.length - 1){
				this.element.trigger('moveDown', this.element);
			}
		}
		this._lastCursor = cursor;
	},
	focus : function(el, ev){
		this._lastCursor = this.session.selection.getCursor();
	},
	focusFromTop : function(){
		this.editor.textInput.focus();
		this.session.selection.moveCursorFileStart();
	},
	focusFromBottom : function(){
		this.editor.textInput.focus();
		this.session.selection.moveCursorFileEnd();
	}
})

});