steal('funcunit').then(function(){

module("Kekomi.FileBrowser.DragDropUpload", { 
	setup: function(){
		S.open("//kekomi/file_browser/drag_drop_upload/drag_drop_upload.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.FileBrowser.DragDropUpload Demo","demo text");
});


});