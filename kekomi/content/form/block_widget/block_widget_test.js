steal('funcunit').then(function(){

module("Kekomi.Content.Form.BlockWidget", { 
	setup: function(){
		S.open("//kekomi/content/form/block_widget/block_widget.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.Content.Form.BlockWidget Demo","demo text");
});


});