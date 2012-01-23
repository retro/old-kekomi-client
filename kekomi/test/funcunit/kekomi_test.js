steal("funcunit", function(){
	module("kekomi test", { 
		setup: function(){
			S.open("//kekomi/kekomi.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})