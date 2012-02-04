steal('funcunit').then(function(){

module("Kekomi.Content.Widgets.Code", { 
	setup: function(){
		S.open("//kekomi/content/widgets/code/code.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.Content.Widgets.Code Demo","demo text");
});


});