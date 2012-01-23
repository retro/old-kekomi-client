steal("funcunit/qunit", "kekomi/fixtures", "kekomi/models/asset_folder.js", function(){
	module("Model: Kekomi.Models.AssetFolder")
	
	test("findAll", function(){
		expect(4);
		stop();
		Kekomi.Models.AssetFolder.findAll({}, function(asset_folders){
			ok(asset_folders)
	        ok(asset_folders.length)
	        ok(asset_folders[0].name)
	        ok(asset_folders[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Kekomi.Models.AssetFolder({name: "dry cleaning", description: "take to street corner"}).save(function(asset_folder){
			ok(asset_folder);
	        ok(asset_folder.id);
	        equals(asset_folder.name,"dry cleaning")
	        asset_folder.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Kekomi.Models.AssetFolder({name: "cook dinner", description: "chicken"}).
	            save(function(asset_folder){
	            	equals(asset_folder.description,"chicken");
	        		asset_folder.update({description: "steak"},function(asset_folder){
	        			equals(asset_folder.description,"steak");
	        			asset_folder.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Kekomi.Models.AssetFolder({name: "mow grass", description: "use riding mower"}).
	            destroy(function(asset_folder){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})