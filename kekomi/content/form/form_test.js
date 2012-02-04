steal('funcunit').then(function(){

module("Kekomi.Content.Form", { 
	setup: function(){
		S.open("//kekomi/content/form/form.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.Content.Form Demo","demo text");
});


});