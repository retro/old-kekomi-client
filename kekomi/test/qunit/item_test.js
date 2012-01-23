steal("funcunit/qunit", "kekomi/fixtures", "kekomi/models/item.js", function(){
	module("Model: Kekomi.Models.Item")
	
	test("findAll", function(){
		expect(4);
		stop();
		Kekomi.Models.Item.findAll({}, function(items){
			ok(items)
	        ok(items.length)
	        ok(items[0].name)
	        ok(items[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Kekomi.Models.Item({name: "dry cleaning", description: "take to street corner"}).save(function(item){
			ok(item);
	        ok(item.id);
	        equals(item.name,"dry cleaning")
	        item.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Kekomi.Models.Item({name: "cook dinner", description: "chicken"}).
	            save(function(item){
	            	equals(item.description,"chicken");
	        		item.update({description: "steak"},function(item){
	        			equals(item.description,"steak");
	        			item.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Kekomi.Models.Item({name: "mow grass", description: "use riding mower"}).
	            destroy(function(item){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})