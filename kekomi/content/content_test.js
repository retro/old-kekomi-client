steal('funcunit').then(function(){

module("Kekomi.Content", { 
	setup: function(){
		S.open("//kekomi/content/content.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.Content Demo","demo text");
});


});