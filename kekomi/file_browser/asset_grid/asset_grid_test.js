steal('funcunit').then(function(){

module("Kekomi.FileBrowser.AssetGrid", { 
	setup: function(){
		S.open("//kekomi/file_browser/asset_grid/asset_grid.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.FileBrowser.AssetGrid Demo","demo text");
});


});