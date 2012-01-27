steal('funcunit').then(function(){

module("Widgets.Autogrow", { 
	setup: function(){
		S.open("//widgets/autogrow/autogrow.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Widgets.Autogrow Demo","demo text");
});


});