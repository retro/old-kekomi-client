steal('funcunit').then(function(){

module("Kekomi.FileBrowser", { 
	setup: function(){
		S.open("//kekomi/file_browser/file_browser.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.FileBrowser Demo","demo text");
});


});