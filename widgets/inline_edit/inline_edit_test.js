steal('funcunit').then(function(){

module("Widgets.InlineEdit", { 
	setup: function(){
		S.open("//widgets/inline_edit/inline_edit.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Widgets.InlineEdit Demo","demo text");
});


});