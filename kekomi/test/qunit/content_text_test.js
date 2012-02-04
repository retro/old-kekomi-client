steal("funcunit/qunit", "kekomi/fixtures", "kekomi/models/content_text.js", function(){
	module("Model: Kekomi.Models.Content_Text")
	
	test("findAll", function(){
		expect(4);
		stop();
		Kekomi.Models.Content_Text.findAll({}, function(content_texts){
			ok(content_texts)
	        ok(content_texts.length)
	        ok(content_texts[0].name)
	        ok(content_texts[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Kekomi.Models.Content_Text({name: "dry cleaning", description: "take to street corner"}).save(function(content_text){
			ok(content_text);
	        ok(content_text.id);
	        equals(content_text.name,"dry cleaning")
	        content_text.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Kekomi.Models.Content_Text({name: "cook dinner", description: "chicken"}).
	            save(function(content_text){
	            	equals(content_text.description,"chicken");
	        		content_text.update({description: "steak"},function(content_text){
	        			equals(content_text.description,"steak");
	        			content_text.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Kekomi.Models.Content_Text({name: "mow grass", description: "use riding mower"}).
	            destroy(function(content_text){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})