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
			outsideDeactivate : false
		});
		$('.slider').mxui_nav_slider({
			min: 60,
			max: 250,
			interval: 1,
			contained: true,
			val: 123
		});
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
		this.options.params.attr('count',items.count)
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
	/**
   * Listen for updates and replace the text of the list
   * @param {Object} called
   * @param {Object} item
   */
  "{model} updated" : function(model, ev, item){
      var el = item.elements(this.element).html(this.options.row, item);
      if(this.options.updated){
          this.options.updated(this.element, el, item)
      }
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
  ".sort-field change" : function(){
  	this.order();
  },
  ".sort-direction change" : function(){
  	this.order();
  },
  ".slider changing" : function(el, ev, val){
  	this.find('.thumb-grid').css('font-size', (val / 10) + "px");
  },
  ".slider-wrapper click" : function(el, ev){
  	if($(ev.srcElement).is('.slider-wrapper') || $(ev.srcElement).is('.slider-bar')){
  		var val = this.find('.slider')
  			.css('left', (ev.offsetX - 4) + 'px')
  			.mxui_nav_slider('determineValue')
  			.controllers()[0].value;
  		this.find('.thumb-grid').css('font-size', (val / 10) + "px");
  	}
  	
  }
})

});