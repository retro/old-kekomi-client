steal("funcunit/qunit", "kekomi/fixtures", "kekomi/models/block.js", function(){
	module("Model: Kekomi.Models.Block")
	
	test("findAll", function(){
		expect(4);
		stop();
		Kekomi.Models.Block.findAll({}, function(blocks){
			ok(blocks)
	        ok(blocks.length)
	        ok(blocks[0].name)
	        ok(blocks[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Kekomi.Models.Block({name: "dry cleaning", description: "take to street corner"}).save(function(block){
			ok(block);
	        ok(block.id);
	        equals(block.name,"dry cleaning")
	        block.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Kekomi.Models.Block({name: "cook dinner", description: "chicken"}).
	            save(function(block){
	            	equals(block.description,"chicken");
	        		block.update({description: "steak"},function(block){
	        			equals(block.description,"steak");
	        			block.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Kekomi.Models.Block({name: "mow grass", description: "use riding mower"}).
	            destroy(function(block){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})