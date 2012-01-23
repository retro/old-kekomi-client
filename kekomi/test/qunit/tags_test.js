steal("funcunit/qunit", "kekomi/fixtures", "kekomi/models/tags.js", function(){
	module("Model: Kekomi.Models.Tags")
	
	test("findAll", function(){
		expect(4);
		stop();
		Kekomi.Models.Tags.findAll({}, function(tags){
			ok(tags)
	        ok(tags.length)
	        ok(tags[0].name)
	        ok(tags[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Kekomi.Models.Tags({name: "dry cleaning", description: "take to street corner"}).save(function(tags){
			ok(tags);
	        ok(tags.id);
	        equals(tags.name,"dry cleaning")
	        tags.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Kekomi.Models.Tags({name: "cook dinner", description: "chicken"}).
	            save(function(tags){
	            	equals(tags.description,"chicken");
	        		tags.update({description: "steak"},function(tags){
	        			equals(tags.description,"steak");
	        			tags.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Kekomi.Models.Tags({name: "mow grass", description: "use riding mower"}).
	            destroy(function(tags){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})