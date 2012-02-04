steal("funcunit/qunit", "kekomi/fixtures", "kekomi/models/content_image.js", function(){
	module("Model: Kekomi.Models.Content_Image")
	
	test("findAll", function(){
		expect(4);
		stop();
		Kekomi.Models.Content_Image.findAll({}, function(content_images){
			ok(content_images)
	        ok(content_images.length)
	        ok(content_images[0].name)
	        ok(content_images[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Kekomi.Models.Content_Image({name: "dry cleaning", description: "take to street corner"}).save(function(content_image){
			ok(content_image);
	        ok(content_image.id);
	        equals(content_image.name,"dry cleaning")
	        content_image.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Kekomi.Models.Content_Image({name: "cook dinner", description: "chicken"}).
	            save(function(content_image){
	            	equals(content_image.description,"chicken");
	        		content_image.update({description: "steak"},function(content_image){
	        			equals(content_image.description,"steak");
	        			content_image.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Kekomi.Models.Content_Image({name: "mow grass", description: "use riding mower"}).
	            destroy(function(content_image){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})