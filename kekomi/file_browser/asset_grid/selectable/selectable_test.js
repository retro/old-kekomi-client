steal('funcunit').then(function(){

module("Kekomi.FileBrowser.AssetGrid.Selectable", { 
	setup: function(){
		S.open("//kekomi/file_browser/asset_grid/selectable/selectable.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.FileBrowser.AssetGrid.Selectable Demo","demo text");
});


});