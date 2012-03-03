steal("funcunit/qunit", "kekomi/fixtures", "kekomi/models/content_template.js", function(){
	module("Model: Kekomi.Models.ContentTemplate")
	
	test("findAll", function(){
		expect(4);
		stop();
		Kekomi.Models.ContentTemplate.findAll({}, function(content_templates){
			ok(content_templates)
	        ok(content_templates.length)
	        ok(content_templates[0].name)
	        ok(content_templates[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Kekomi.Models.ContentTemplate({name: "dry cleaning", description: "take to street corner"}).save(function(content_template){
			ok(content_template);
	        ok(content_template.id);
	        equals(content_template.name,"dry cleaning")
	        content_template.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Kekomi.Models.ContentTemplate({name: "cook dinner", description: "chicken"}).
	            save(function(content_template){
	            	equals(content_template.description,"chicken");
	        		content_template.update({description: "steak"},function(content_template){
	        			equals(content_template.description,"steak");
	        			content_template.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Kekomi.Models.ContentTemplate({name: "mow grass", description: "use riding mower"}).
	            destroy(function(content_template){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})