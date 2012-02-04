steal('funcunit').then(function(){

module("Kekomi.Content.Widgets.Rte", { 
	setup: function(){
		S.open("//kekomi/content/widgets/rte/rte.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.Content.Widgets.Rte Demo","demo text");
});


});