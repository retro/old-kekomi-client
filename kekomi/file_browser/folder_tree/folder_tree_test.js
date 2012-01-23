steal('funcunit').then(function(){

module("Kekomi.FileBrowser.FolderTree", { 
	setup: function(){
		S.open("//kekomi/file_browser/folder_tree/folder_tree.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.FileBrowser.FolderTree Demo","demo text");
});


});