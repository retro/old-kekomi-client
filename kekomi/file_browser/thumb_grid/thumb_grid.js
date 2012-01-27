steal(
'jquery/controller',
'jquery/view/ejs',
'steal/less',
'kekomi/models/asset.js',
'mxui/nav/selectable',
'mxui/nav/slider'
).then( './thumb_grid.less', './views/init.ejs', function($){

/**
 * @class Kekomi.FileBrowser.ThumbGrid
 */
$.Controller('Kekomi.FileBrowser.ThumbGrid',
/** @Static */
{
	defaults : {
		model: Kekomi.Models.Asset
	}
},
/** @Prototype */
{
	init : function(){
		
		this.element.html("//kekomi/file_browser/thumb_grid/views/init.ejs", {});
		this.find('.thumb-grid').mxui_nav_selectable({
			outsideDeactivate : false,
		});
		if(this.options.params.order && this.options.params.order.length > 1){
			var sort = this.options.params.order[0].split(' ');
			this.find('.sort-field').val(sort[0]);
			this.find('.sort-direction').val(sort[1]);
		}
		
		$('.slider').mxui_nav_slider({
			min: 60,
			max: 250,
			interval: 1,
			contained: true,
			val: 120
		});
		var c = $('.slider').controllers()[0];
			this._sliderParams = {
			widthOfSpot : c.widthOfSpot,
			min : c.options.min
		};
		this.setSliderProgress(120);
		this.bind(this.find('.thumb-grid'), 'scroll',  'foreverScroll');
	},
	foreverScroll : function(el, ev){
		if(el[0].scrollHeight - (el[0].clientHeight + el.scrollTop()) < 100){
			if(this.options.params.canMoveNext() && !this.options.params.attr('updating')){
				this.options.params.next();
			}
		}
	},
	'{params} updated.attr' : function(params, ev, attr, val, oldVal){
		if(attr !== 'count' && attr !== 'updating'){
			//want to throttle for rapid updates
			params.attr('updating', true)
			clearTimeout(this.newRequestTimer,100)
			this.newRequestTimer = setTimeout(this.callback('newRequest', attr, val))
		}
	},
	list : function(clear, items){

		this.options.params.attr('updating', false);
		
		var thumbs = $.View('//kekomi/file_browser/thumb_grid/views/list.ejs',{
			items: items
		});

		if(clear){
			this.empty();
		}
		this.find('.thumb-grid').append(thumbs);
		// update the items
		this.options.params.attr('count',items.count);
		if(this.options.params.canMoveNext() && !this.isGridFilled()){
			this.options.params.next();
		}
	},
	newRequest : function(attr, val){
		var clear = true; 
		if(attr == "offset"){ // if offset changes and we have offsetEmpties false
			clear = false;
		}
		this.options.model.findAll(this.options.params.attrs(), this.callback('list', clear));
	},
	empty : function(){
		this.find('.thumb-grid').html("");
	},
	"{model} updated" : function(model, ev, item){

		var el = item.elements(this.element).html("//kekomi/file_browser/thumb_grid/views/item.ejs", item);
		this.element.resize()
	},
	"{model} created" : function(model, ev, item){
			var newEl = $($.View("//mxui/data/grid/views/list",{
					items : [item],
					row: this.options.row
			}))
			if(this.options.append){
					this.options.append(this.element, newEl, item)
			}else{
					this.append(newEl)
		//newEl.appendTo(this.element).slideDown();
			}
	},
	"{model} destroyed" : function(model, ev, item){
		var el = item.elements(this.element);
		el.remove();
	},
	order : function(){
		this.options.params.attr('order', [$('.sort-field').val() + " " + $('.sort-direction').val()]);
	},
	isGridFilled : function(){
		var el = this.find('.thumb-grid')[0];
		return el.scrollHeight > el.offsetHeight;
	},
	".sort-field change" : function(){
		this.order();
	},
	".sort-direction change" : function(){
		this.order();
	},
	".slider changing" : function(el, ev, val){
		this.find('.thumb-grid').css('font-size', (val / 10) + "px");
		this.setSliderProgress(val);
	},
	".slider change" : function(el, ev, val){
		this.find('.thumb-grid').css('font-size', (val / 10) + "px");
		this.setSliderProgress(val);
	},
	".slider-wrapper click" : function(el, ev){

		var target = $(ev.target);
		if(target.is('.slider-wrapper') || target.is('.slider-bar') || target.is('.slider-progress')){
			var val = this.find('.slider').css('left', (ev.pageX - el.offset().left - 4) + 'px')
										.mxui_nav_slider('determineValue')
										.controllers()[0].value;
			this.find('.thumb-grid').css('font-size', (val / 10) + "px");
			this.setSliderProgress(val);
		}
	},
	setSliderProgress : function(val){
		var width = this._sliderParams.widthOfSpot * val - this._sliderParams.min;
		this.find('.slider-progress').css('width', parseInt(width + 5));
	}
})

});