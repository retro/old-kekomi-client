steal('funcunit').then(function(){

module("Kekomi.FileBrowser.Dragged", { 
	setup: function(){
		S.open("//kekomi/file_browser/dragged/dragged.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.FileBrowser.Dragged Demo","demo text");
});


});