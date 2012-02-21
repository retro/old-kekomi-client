steal('funcunit').then(function(){

module("Kekomi.Content.Widgets.ImageGallery", { 
	setup: function(){
		S.open("//kekomi/content/widgets/image_gallery/image_gallery.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.Content.Widgets.ImageGallery Demo","demo text");
});


});