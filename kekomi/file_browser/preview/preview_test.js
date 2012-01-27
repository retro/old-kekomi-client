steal('funcunit').then(function(){

module("Kekomi.FileBrowser.Preview", { 
	setup: function(){
		S.open("//kekomi/file_browser/preview/preview.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.FileBrowser.Preview Demo","demo text");
});


});