steal('funcunit').then(function(){

module("Kekomi.Content.Form.ComposedWidget", { 
	setup: function(){
		S.open("//kekomi/content/form/composed_widget/composed_widget.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.Content.Form.ComposedWidget Demo","demo text");
});


});