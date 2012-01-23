steal('funcunit').then(function(){

module("Kekomi.FileBrowser.ThumbGrid", { 
	setup: function(){
		S.open("//kekomi/file_browser/thumb_grid/thumb_grid.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.FileBrowser.ThumbGrid Demo","demo text");
});


});