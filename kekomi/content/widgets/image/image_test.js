steal('funcunit').then(function(){

module("Kekomi.Content.Widgets.Image", { 
	setup: function(){
		S.open("//kekomi/content/widgets/image/image.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.Content.Widgets.Image Demo","demo text");
});


});