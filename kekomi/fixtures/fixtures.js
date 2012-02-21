// map fixtures for this application

steal("jquery/dom/fixture", './asset.js', function(){
	
	$.fixture.make("item", 5, function(i, item){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "item "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
	
	$.fixture.make("tags", 5, function(i, tags){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "tags "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
	$.fixture.make("content_image", 5, function(i, content_image){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "content_image "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
	$.fixture.make("content_text", 5, function(i, content_text){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "content_text "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
	$.fixture.make("content_file", 5, function(i, content_file){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "content_file "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
})