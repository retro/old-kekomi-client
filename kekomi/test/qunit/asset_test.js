steal("funcunit/qunit", "kekomi/fixtures", "kekomi/models/asset.js", function(){
	module("Model: Kekomi.Models.Asset")
	
	test("findAll", function(){
		expect(4);
		stop();
		Kekomi.Models.Asset.findAll({}, function(assets){
			ok(assets)
	        ok(assets.length)
	        ok(assets[0].name)
	        ok(assets[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Kekomi.Models.Asset({name: "dry cleaning", description: "take to street corner"}).save(function(asset){
			ok(asset);
	        ok(asset.id);
	        equals(asset.name,"dry cleaning")
	        asset.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Kekomi.Models.Asset({name: "cook dinner", description: "chicken"}).
	            save(function(asset){
	            	equals(asset.description,"chicken");
	        		asset.update({description: "steak"},function(asset){
	        			equals(asset.description,"steak");
	        			asset.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Kekomi.Models.Asset({name: "mow grass", description: "use riding mower"}).
	            destroy(function(asset){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})