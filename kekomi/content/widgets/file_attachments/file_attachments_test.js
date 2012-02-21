steal('funcunit').then(function(){

module("Kekomi.Content.Widgets.FileAttachments", { 
	setup: function(){
		S.open("//kekomi/content/widgets/file_attachments/file_attachments.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Kekomi.Content.Widgets.FileAttachments Demo","demo text");
});


});