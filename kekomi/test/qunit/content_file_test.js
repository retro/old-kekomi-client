steal("funcunit/qunit", "kekomi/fixtures", "kekomi/models/content_file.js", function(){
	module("Model: Kekomi.Models.Content_File")
	
	test("findAll", function(){
		expect(4);
		stop();
		Kekomi.Models.Content_File.findAll({}, function(content_files){
			ok(content_files)
	        ok(content_files.length)
	        ok(content_files[0].name)
	        ok(content_files[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Kekomi.Models.Content_File({name: "dry cleaning", description: "take to street corner"}).save(function(content_file){
			ok(content_file);
	        ok(content_file.id);
	        equals(content_file.name,"dry cleaning")
	        content_file.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Kekomi.Models.Content_File({name: "cook dinner", description: "chicken"}).
	            save(function(content_file){
	            	equals(content_file.description,"chicken");
	        		content_file.update({description: "steak"},function(content_file){
	        			equals(content_file.description,"steak");
	        			content_file.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Kekomi.Models.Content_File({name: "mow grass", description: "use riding mower"}).
	            destroy(function(content_file){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})